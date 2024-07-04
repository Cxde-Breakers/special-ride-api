import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import { Status } from 'src/shared/enums/status.enum';

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
       await this.settingRepository.save(Object.assign(setting, createSettingDto));
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
      throw new BadRequestException(error.message)
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

  async findOne(id: string) {
    try {
      const setting = await this.settingRepository.findOneBy({ id });

      if (!setting) {
        throw new NotFoundException(`Setting not found`);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Setting retrieved successfully',
        data: setting,
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateSettingDto: UpdateSettingDto) {
    try {
      const setting = await this.settingRepository.findOneBy({ id });

      if (!setting) {
        throw new NotFoundException('Setting not found');
      }

      await this.settingRepository.update(id, updateSettingDto);

      return {
        statusCode: HttpStatus.OK,
        message: 'Setting updated successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message)
    }
  }

  async remove(id: string) {
    try {
      const setting = await this.settingRepository.findOneBy({ id });

      if (!setting) {
        throw new NotFoundException('Setting not found');
      }

      await this.settingRepository.update(setting.id, {
        status: Status.Inactive
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Setting deleted successfully',
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
