import { Get, Post, Put, Delete, Param, Body, Controller } from '@nestjs/common';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }

    @Get('all/:limit/:pageNum')
    async getAll(
        @Param('limit') limit: number,
        @Param('pageNum') pageNum: number,
    ): Promise<CategoriesEntity[]> {
        return await this.categoryService.getCategories(limit, pageNum);
    }

    @Get('detail/:categoryId')
    async getCategoryInfor(
        @Param('categoryId') categoryId: number
    ): Promise<CategoriesEntity> {
        return await this.categoryService.getCategoryInfo(categoryId);
    }

    @Post('create')
    async createCategory(@Body() categoryData: CategoriesEntity): Promise<boolean> {
        return await this.categoryService.createCategory(categoryData);
    }

    @Put('update/:categoryId')
    async updateCategory(
        @Param('categoryId') categoryId: number,
        @Body() categoryInfor: CategoriesEntity,
    ): Promise<boolean> {
        return await this.categoryService.updateCategory(categoryId, categoryInfor);
    }

    @Delete('delete/: categoryId')
    async deleteCategory(@Param('categoryId') categoryId: number): Promise<boolean> {
        return await this.categoryService.deleteCategory(categoryId);
    }
}
