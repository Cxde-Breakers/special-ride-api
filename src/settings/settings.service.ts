import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';

@Roles(Role.SuperAdmin)
@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting) private readonly settingRepository: Repository<Setting>
  ) { }

  async create(createSettingDto: CreateSettingDto) {
    try {

      let setting = await this.settingRepository.findOne({
        where: {}
      })

     if (setting) {
       await this.settingRepository.save(Object.assign(setting, {
         ...createSettingDto,
         siteLogo: createSettingDto.siteLogo ? createSettingDto.siteLogo : setting.siteLogo,
         adminLogo: createSettingDto.adminLogo ? createSettingDto.adminLogo : setting.adminLogo,
         seoImage: createSettingDto.seoImage ? createSettingDto.seoImage : setting.seoImage,
         favicon: createSettingDto.favicon ? createSettingDto.favicon : setting.favicon,
       }));
     } else {
       setting = this.settingRepository.create({
         ...createSettingDto,
       });

       await this.settingRepository.save(setting);
     }

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Setting  created successfully',
        data: setting
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const settings = await this.settingRepository.find();

      return {
        statusCode: HttpStatus.OK,
        message: 'Settings retrived successfully',
        data: settings,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
