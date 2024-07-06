import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Roles(Role.SuperAdmin)
@ApiBearerAuth()
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'siteLogo', maxCount: 1 },
    { name: 'seoImage', maxCount: 1 },
    { name: 'favicon', maxCount: 1 },
    { name: 'adminLogo', maxCount: 1 },
  ]))
  create(@Body() createSettingDto: CreateSettingDto, @UploadedFiles() files: { siteLogo?: Express.Multer.File[], seoImage?: Express.Multer.File[], favicon?: Express.Multer.File[], adminLogo?: Express.Multer.File[] }) {
    createSettingDto.siteLogo = files.siteLogo ? files.siteLogo[0].buffer.toString('base64') : null;
    createSettingDto.seoImage = files.seoImage ? files.seoImage[0].buffer.toString('base64') : null;
    createSettingDto.favicon = files.favicon ? files.favicon[0].buffer.toString('base64') : null;
    createSettingDto.adminLogo = files.adminLogo ? files.adminLogo[0].buffer.toString('base64') : null;

    return this.settingsService.create(createSettingDto);
  }

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }
}
