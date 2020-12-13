import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { CategoriesEntity } from '../entities/categories.entity';

@Injectable()
export class CategoriesService {

    async getCategories(limit: number, pageNum: number): Promise<CategoriesEntity[]> {
        return getRepository(CategoriesEntity)
            .createQueryBuilder('ca')
            .limit(limit)
            .offset((pageNum - 1) * limit)
            .getMany();

    }

    async getCategoryInfo(categoryId: number): Promise<CategoriesEntity> {
        return await getRepository(CategoriesEntity)
            .createQueryBuilder('ca')
            .where('ca.id = :categoryId', { categoryId })
            .getOne();
    }

    async createCategory(category: CategoriesEntity): Promise<boolean> {
        let response = false;
        const result = await getRepository(CategoriesEntity).insert(category);
        if (result) {
            response = true;
        }
        return response;
    }

    async updateCategory(categoryId: number, categoryInfo: CategoriesEntity): Promise<boolean> {
        let response = false;
        let category = await this.getCategoryInfo(categoryId);
        if (!category) {
            return false;
        }
        Object.assign(category, categoryInfo);
        const updated = await getRepository(CategoriesEntity).update({ id: categoryId }, category);
        if (updated) {
            response = true;
        }
        return response;
    }

    async deleteCategory(categoryId: number): Promise<boolean> {
        let response = false;
        const deleted = await getRepository(CategoriesEntity).delete({ id: categoryId });
        if (deleted) {
            response = true;
        }
        return response;
    }
}


