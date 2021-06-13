import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { SongEntity } from '../entities/song.entity';
import { INewSongResponse, ISongDetailResponse, ISongResponse, ISongAuthorResponse, ISongSingerResponse, ITopViewResponse, ISearchsongNameResponse } from './song.response';
import { CategoriesEntity } from '../entities/categories.entity';
import { SingerEntity } from 'src/entities/singer.entity';
import { AuthorEntity } from 'src/entities/author.entity';

@Injectable()
export class SongService {

    async getSongs(limit: number, pageNum: number): Promise<ISongResponse[]> {
        return getRepository(SongEntity)
            .createQueryBuilder('so')
            .select([
                'so.id as id',
                'so.category_id as categoryId',
                'so.song_name as song_name',
                'so.image as image'
            ])
            .limit(limit)
            .offset((pageNum - 1) * limit)
            .getRawMany();
    }

    async getSongInfo(songId: number): Promise<SongEntity> {
        return await getRepository(SongEntity)
            .createQueryBuilder('so')
            .where('so.id = :songId', { songId })
            .getOne();
    }

    async createSong(song: SongEntity): Promise<boolean> {
        let response = false;
        const result = await getRepository(SongEntity).insert(song);
        if (result) {
            response = true;
        }
        return response;
    }

    async updateSong(songId: number, songInfo: SongEntity): Promise<boolean> {
        let response = false;
        let song = await this.getSongInfo(songId);
        if (!song) {
            return false;
        }
        Object.assign(song, songInfo);
        song.view_number = song.view_number + 1
        const updated = await getRepository(SongEntity).update({ id: songId }, song);
        if (updated) {
            response = true;
        }
        return response
    }

    async deleteSong(songId: number): Promise<boolean> {
        let response = false;
        const deleted = await getRepository(SongEntity).delete({ id: songId });
        if (deleted) {
            response = true;
        }
        return response;
    }

    async getSongsByCategoryId(categoryId: number, limit: number, pageNum: number): Promise<ISongResponse[] | any> {
        try {
            return await getRepository(SongEntity).createQueryBuilder('sog')
                .select([
                    'id as id',
                    'category_id as categoryId',
                    'song_name as song_name',
                    'image as image',
                ]).where('sog.category_id = :categoryId', { categoryId })
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .getRawMany();
        } catch (error) {
            console.log(this.getSongsByCategoryId.toString(), error);
        }
    }

    async getSongDetail(songId: number): Promise<ISongDetailResponse | any> {
        try {
            return await getRepository(SongEntity).createQueryBuilder('sog')
                .select([
                    'cat.id as categoryId',
                    'cat.name as categoryName',
                    'song_name as song_name',
                    'sog.music as music',
                    'image as image',
                    'sog.created_at as createdAt',
                    'au.name as composedBy'
                ])
                .innerJoin(CategoriesEntity, 'cat', 'cat.id = sog.category_id')
                .innerJoin(AuthorEntity, 'au', 'au.id = sog.author_id')
                .where('sog.id = :songId', { songId })
                .getRawOne();
        } catch (error) {
            console.log(this.getSongDetail.toString(), error)
        }
    }

    async getSongByAuthorId(authorId: number, limit: number, pageNum: number): Promise<ISongAuthorResponse[] | any> {
        try {
            return await getRepository(SongEntity).createQueryBuilder('sog')
                .select([
                    'au.id as composedBy',
                    'cat.id as categoryId',
                    'cat.name as categoryName',
                    'sog.id as songId',
                    'song_name as song_name',
                    'image as image',
                    'sog.created_at as createdAt'
                ])
                .innerJoin(CategoriesEntity, 'cat', 'cat.id = sog.category_id')
                .innerJoin(AuthorEntity, 'au', 'au.id = sog.author_id')
                .where('sog.author_id = :authorId', { authorId })
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .getRawMany();
        } catch (error) {
            console.log(this.getSongByAuthorId.toString(), error);
        }
    }

    async searchSongBysongName(songName: string, limit: number, pageNum: number): Promise<ISearchsongNameResponse[] | any> {
        try {
            return await getRepository(SongEntity).createQueryBuilder('sog')
                .select([
                    'sog.id as songId',
                    'sog.song_name as song_name',
                    'sog.image as image'
                ]).where('sog.song_name like :songName ', { songName: '%' + songName + '%' })
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .getRawMany();
        } catch (error) {
            console.log(this.searchSongBysongName.toString(), error);
        }
    }

    async getNewSong(limit: number, pageNum: number): Promise<INewSongResponse[] | any> {
        try {
            return await getRepository(SongEntity).createQueryBuilder('sog')
                .select([
                    'cat.id as categoryId',
                    'sog.id as songId',
                    'cat.name as categoryName',
                    'image as image',
                    'song_name as song_name',
                    'created_at as createdAt'
                ])
                .innerJoin(CategoriesEntity, 'cat', 'cat.id = sog.category_id')
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .orderBy('sog.created_at', 'DESC')
                .getRawMany();
        } catch (error) {
            console.log(this.getNewSong.toString(), error);
        }
    }

    async getTopViewSongs(limit: number, pageNum: number): Promise<ITopViewResponse[] | any> {
        try {
            return await getRepository(SongEntity).createQueryBuilder('sog')
                .select([
                    'cat.id as categoryId',
                    'cat.name as categoryName',
                    'sog.id as songId',
                    'song_name as song_name',
                    'image as image',
                    'sog.created_at as createdAt',
                    'sog.view_number as viewNumber'
                ]).innerJoin(CategoriesEntity, 'cat', 'cat.id = sog.category_id')
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .orderBy('sog.view_number', 'DESC')
                .getRawMany();
        } catch (error) {
            console.log(this.getTopViewSongs.toString(), error);
        }
    }
}
