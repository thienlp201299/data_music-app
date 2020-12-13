import { Get, Post, Put, Delete, Param, Body, Controller } from '@nestjs/common';
import { AuthorEntity } from '../entities/author.entity';
import { AuthorService } from './author.service';


@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }

    @Get('all/:limit/:pageNum')
    async getAll(
        @Param('limit') limit: number,
        @Param('pageNum') pageNum: number,
    ): Promise<AuthorEntity[]> {
        return await this.authorService.getAuthors(limit, pageNum);
    }

    @Get('detail/:authorId')
    async getAuthorId(
        @Param('authorId') authorId: number
    ): Promise<AuthorEntity> {
        return await this.authorService.getAuthorInfo(authorId);
    }

    @Post('create')
    async createAuthor(@Body() authorData: AuthorEntity): Promise<boolean> {
        return await this.authorService.createAuthor(authorData);
    }

    @Put('update/:authorId')
    async updateAuthor(
        @Param('authorId') authorId: number,
        @Body() authorInfo: AuthorEntity,
    ): Promise<boolean> {
        return await this.authorService.updateAuthor(authorId, authorInfo);
    }

    @Delete('delete/:authorId')
    async deleteAuthor(@Param('authorId') authorId: number): Promise<boolean> {
        return await this.authorService.deleteAuthor(authorId);
    }
}
