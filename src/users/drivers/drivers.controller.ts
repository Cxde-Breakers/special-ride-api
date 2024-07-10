import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) { }

  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'idFront', maxCount: 1 },
    { name: 'idBack', maxCount: 1 },
    { name: 'vehiclePhoto', maxCount: 1 },
    { name: 'vehicleRegistrationPhotoFront', maxCount: 1 },
    { name: 'vehicleRegistrationPhotoBack', maxCount: 1 },
    { name: 'driversLicensePhotoFront', maxCount: 1 },
    { name: 'driversLicensePhotoBack', maxCount: 1 },
  ]))
  update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
    @UploadedFiles() files: {
      profilePicture?: Express.Multer.File[],
      idFront?: Express.Multer.File[],
      idBack?: Express.Multer.File[],
      vehiclePhoto?: Express.Multer.File[],
      vehicleRegistrationPhotoFront?: Express.Multer.File[],
      vehicleRegistrationPhotoBack?: Express.Multer.File[],
      driversLicensePhotoFront?: Express.Multer.File[],
      driversLicensePhotoBack?: Express.Multer.File[]
    }
  ) {
    if (files) {
      updateDriverDto.profilePicture = files.profilePicture ? files.profilePicture[0].buffer.toString('base64') : null;
      updateDriverDto.idFront = files.idFront ? files.idFront[0].buffer.toString('base64') : null;
      updateDriverDto.idBack = files.idBack ? files.idBack[0].buffer.toString('base64') : null;
      updateDriverDto.vehiclePhoto = files.vehiclePhoto ? files.vehiclePhoto[0].buffer.toString('base64') : null;
      updateDriverDto.vehicleRegistrationPhotoFront = files.vehicleRegistrationPhotoFront ? files.vehicleRegistrationPhotoFront[0].buffer.toString('base64') : null;
      updateDriverDto.vehicleRegistrationPhotoBack = files.vehicleRegistrationPhotoBack ? files.driversLicensePhotoBack[0].buffer.toString('base64') : null;
      updateDriverDto.driversLicensePhotoFront = files.driversLicensePhotoFront ? files.driversLicensePhotoFront[0].buffer.toString('base64') : null;
      updateDriverDto.driversLicensePhotoBack = files.driversLicensePhotoBack ? files.driversLicensePhotoBack[0].buffer.toString('base64') : null;
    }

    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }
}
