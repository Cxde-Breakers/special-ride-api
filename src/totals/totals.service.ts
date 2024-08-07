import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Country } from 'src/countries/entities/country.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/enums/role.enum';
import { Not, Repository } from 'typeorm';

@Injectable()
export class TotalsService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Country) private readonly countryRepository: Repository<Country>,
    ) { }

    async totals() {
        try {
            const users = await this.userRepository.count({
                where: {
                    role: Not(Role.SuperAdmin),
                }
            });

            const bookings = await this.bookingRepository.count();

            const earnings = await this.transactionRepository.sum('amountPaid');

            const countries = await this.countryRepository.count();

            return {
                statusCode: HttpStatus.OK,
                message: 'Totals retrieved successfully',
                data: {
                    users,
                    bookings,
                    earnings,
                    countries,
                }
            }
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
