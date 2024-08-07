import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';

@ApiBearerAuth()
@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) { }

  @Roles(Role.SuperAdmin)
  @Post()
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqsService.create(createFaqDto);
  }

  @Get()
  findAll() {
    return this.faqsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqsService.findOne(id);
  }

  @Roles(Role.SuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqsService.update(id, updateFaqDto);
  }

  @Roles(Role.SuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqsService.remove(id);
  }
}
