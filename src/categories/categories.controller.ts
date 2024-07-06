import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { CategoryQueryDto } from './dto/category-query.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles(Role.SuperAdmin)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() file: Express.Multer.File) {
    createCategoryDto.image = file && file.buffer.toString('base64');
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() categoryQueryDto: CategoryQueryDto, @Query() paginationQueryDto: PaginationQueryDto) {
    return this.categoriesService.findAll(categoryQueryDto, paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Roles(Role.SuperAdmin)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @UploadedFile() file: Express.Multer.File) {
    updateCategoryDto.image = file && file.buffer.toString('base64');
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Roles(Role.SuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
