import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) { }

  @Get()
  findAll() {
    return this.passengersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passengersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePassengerDto: UpdatePassengerDto,
    @UploadedFiles() files: {
      profilePicture?: Express.Multer.File[],
      idFront?: Express.Multer.File[],
      idBack?: Express.Multer.File[],
    }
  ) {
    if (files) {
      updatePassengerDto.profilePicture = files.profilePicture ? files.profilePicture[0].buffer.toString('base64') : null;
      updatePassengerDto.idFront = files.idFront ? files.idFront[0].buffer.toString('base64') : null;
      updatePassengerDto.idBack = files.idBack ? files.idBack[0].buffer.toString('base64') : null;
    }
    return this.passengersService.update(id, updatePassengerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passengersService.remove(id);
  }
}
