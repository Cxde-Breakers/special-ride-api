import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SubCategoryQueryDto } from './dto/subcategory-query.dto';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { Role } from 'src/users/enums/role.enum';

@ApiBearerAuth()
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) { }

  @Roles(Role.SuperAdmin)
  @Post()
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.create(createSubcategoryDto);
  }

  @Get()
  findAll(@Query() subcategoryQueryDto: SubCategoryQueryDto, @Query() paginationQueryDto: PaginationQueryDto) {
    return this.subcategoriesService.findAll(subcategoryQueryDto, paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(id);
  }

  @Roles(Role.SuperAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoriesService.update(id, updateSubcategoryDto);
  }

  @Roles(Role.SuperAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(id);
  }
}
