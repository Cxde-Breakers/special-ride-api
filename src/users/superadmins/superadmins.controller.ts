import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SuperadminsService } from './superadmins.service';
import { UpdateSuperadminDto } from './dto/update-superadmin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@ApiTags('superadmins')
@Roles(Role.SuperAdmin)
@Controller('superadmins')
export class SuperadminsController {
  constructor(private readonly superadminsService: SuperadminsService) {}

  @Get()
  findAll() {
    return this.superadminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superadminsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  update(@Param('id') id: string, @Body() updateSuperadminDto: UpdateSuperadminDto, @UploadedFile() file: Express.Multer.File) {
    updateSuperadminDto.profilePicture = file ? file.buffer.toString('base64') : '';
    return this.superadminsService.update(id, updateSuperadminDto);
  }
}
