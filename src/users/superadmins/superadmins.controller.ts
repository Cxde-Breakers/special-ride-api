import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuperadminsService } from './superadmins.service';
import { CreateSuperadminDto } from './dto/create-superadmin.dto';
import { UpdateSuperadminDto } from './dto/update-superadmin.dto';

@Controller('superadmins')
export class SuperadminsController {
  constructor(private readonly superadminsService: SuperadminsService) {}

  @Post()
  create(@Body() createSuperadminDto: CreateSuperadminDto) {
    return this.superadminsService.create(createSuperadminDto);
  }

  @Get()
  findAll() {
    return this.superadminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superadminsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuperadminDto: UpdateSuperadminDto) {
    return this.superadminsService.update(+id, updateSuperadminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superadminsService.remove(+id);
  }
}
