import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';

@Injectable()
export class AuthorService {

    async getAuthors(limit: number, pageNum: number): Promise<AuthorEntity[]> {
        return getRepository(AuthorEntity)
            .createQueryBuilder('au')
            .limit(limit)
            .offset((pageNum - 1) * limit)
            .getMany();
    }

    async getAuthorInfo(authorId: number): Promise<AuthorEntity> {
        return await getRepository(AuthorEntity)
            .createQueryBuilder('au')
            .where('au.id = :authorId', { authorId })
            .getOne();
    }

    async createAuthor(author: AuthorEntity): Promise<boolean> {
        let response = false;
        const result = await getRepository(AuthorEntity).insert(author);
        if (result) {
            response = true
        }
        return response;
    }

    async updateAuthor(AuthorId: number, authorInfo: AuthorEntity): Promise<boolean> {
        let response = false;
        let author = await this.getAuthorInfo(AuthorId);
        if (!author) {
            return false;
        }
        Object.assign(author, authorInfo);
        const updated = await getRepository(AuthorEntity).update({ id: AuthorId }, author);
        if (updated) {
            response = true;
        }
        return response
    }

    async deleteAuthor(authorId: number): Promise<boolean> {
        let response = false;
        const deleted = await getRepository(AuthorEntity).delete({ id: authorId });
        if (deleted) {
            response = true;
        }
        return response;
    }
}
