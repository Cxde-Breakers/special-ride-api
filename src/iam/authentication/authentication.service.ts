import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { randomUUID } from 'crypto';
import { InvalidatedRefreshTokenError } from './errors/invalidated-refresh-token-error';
import { Passenger } from 'src/users/passengers/entities/passenger.entity';
import { Driver } from 'src/users/drivers/entities/driver.entity';
import { CreatePassengerDto } from 'src/users/passengers/dto/create-passenger.dto';
import { CreateDriverDto } from 'src/users/drivers/dto/create-driver.dto';
import { Role } from 'src/users/enums/role.enum';
import { SignInDto } from './dto/sign-in.dto';
import { Superadmin } from 'src/users/superadmins/entities/superadmin.entity';
import { CreateAdminDto } from 'src/users/admins/dto/create-admin.dto';
import { Admin } from 'src/users/admins/entities/admin.entity';
import { CreateSuperadminDto } from 'src/users/superadmins/dto/create-superadmin.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Passenger) private readonly passengerRepository: Repository<Passenger>,
        @InjectRepository(Driver) private readonly driverRepository: Repository<Driver>,
        @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
        @InjectRepository(Superadmin) private readonly superAdminRepository: Repository<Superadmin>,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    ) { }

    async signUp(signUpDto: SignUpDto, createUserTypeDto: CreatePassengerDto | CreateDriverDto | CreateAdminDto | CreateSuperadminDto) {
        try {
            const user = this.userRepository.create({
                ...signUpDto,
                password: await this.hashingService.hash(signUpDto.password),
            });

            await this.userRepository.save(user);

            if (signUpDto.role === Role.Passenger) {
                await this.passengerRepository.save({
                    ...createUserTypeDto as CreatePassengerDto,
                    user: {
                        ...user,
                        profilePicture: createUserTypeDto.profilePicture
                    },
                    country: {
                        id: createUserTypeDto.country,
                    },
                });
            } else if (signUpDto.role === Role.Driver) {
                await this.driverRepository.save({
                    ...createUserTypeDto as CreateDriverDto,
                    user: {
                        ...user,
                        profilePicture: createUserTypeDto.profilePicture
                    },
                    country: {
                        id: createUserTypeDto.country,
                    },
                });
            } else if (signUpDto.role === Role.Admin) {
                await this.adminRepository.save({
                    ...createUserTypeDto as CreateAdminDto,
                    user: {
                        ...user,
                        profilePicture: createUserTypeDto.profilePicture,
                    },
                    country: {
                        id: createUserTypeDto.country,
                    }
                });
            } else if (signUpDto.role === Role.SuperAdmin) {
                await this.superAdminRepository.save({
                    ...createUserTypeDto as CreateSuperadminDto,
                    user: {
                        ...user,
                        profilePicture: createUserTypeDto.profilePicture,
                    },
                    country: {
                        id: createUserTypeDto.country,
                    }
                })
            }

            return this.generateTokens(user);
        } catch (error) {
            const pgUniqueViolationErrorCode = '23505';
            if (error.code === pgUniqueViolationErrorCode) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }

    async signIn(signInDto: SignInDto) {
        const user = await this.userRepository.findOneBy({
            email: signInDto.email,
        });

        if (!user) {
            throw new UnauthorizedException('User does not exist');
        }

        const passwordMatches = await this.hashingService.compare(
            signInDto.password,
            user.password,
        );

        if (!passwordMatches) {
            throw new UnauthorizedException('Password does not match');
        }

        return await this.generateTokens(user);
    }

    async generateTokens(user: User) {
        const refreshTokenId = randomUUID();
        const [accessToken, refreshToken] = await Promise.all([this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTtl, { email: user.email, role: user.role }
        ),
        this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, { refreshTokenId }),
        ]);

        await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
            const { sub, refreshTokenId } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
            >(refreshTokenDto.refreshToken, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer
            });

            const user = await this.userRepository.findOneByOrFail({
                id: sub,
            });

            const isValid = await this.refreshTokenIdsStorage.validate(
                user.id,
                refreshTokenId,
            );

            if (isValid) {
                await this.refreshTokenIdsStorage.invalidate(user.id);
            } else {
                throw new UnauthorizedException('Refresh token is invalid')
            }

            return this.generateTokens(user);
        } catch (error) {
            if (error instanceof InvalidatedRefreshTokenError) {
                throw new UnauthorizedException('Access denied');
            }
            throw new UnauthorizedException(error.message);
        }
    }

    private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn,
            }
        );
    }
}
