import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @UploadedFile() file: Express.Multer.File) {
    updateAdminDto.profilePicture = file && file.buffer.toString('base64');
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}
