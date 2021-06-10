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
                'so.categoryId as categoryId',
                'so.songName as songName',
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
        song.viewNumber = song.viewNumber + 1
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
                    'categoryId as categoryId',
                    'songName as songName',
                    'image as image',
                ]).where('sog.categoryId = :categoryId', { categoryId })
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
                    'songName as songName',
                    'sog.music as music',
                    'image as image',
                    'sog.createdAt as createdAt',
                    'au.name as composedBy'
                ])
                .innerJoin(CategoriesEntity, 'cat', 'cat.id = sog.categoryId')
                .innerJoin(AuthorEntity, 'au', 'au.id = sog.authorId')
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
                    'songName as songName',
                    'image as image',
                    'sog.createdAt as createdAt'
                ])
                .innerJoin(CategoriesEntity, 'cat', 'cat.id = sog.categoryId')
                .innerJoin(AuthorEntity, 'au', 'au.id = sog.authorId')
                .where('sog.authorId = :authorId', { authorId })
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .getRawMany();
        } catch (error) {
            console.log(this.getSongByAuthorId.toString(), error);
        }
    }

    async getSongBySingerId(singerId: number, limit: number, pageNum: number): Promise<ISongSingerResponse[] | any> {
        try {
            return await getRepository(SongEntity).createQueryBuilder('sog')
                .select([
                    'cat.id as categoryId',
                    'cat.name as categoryName',
                    'sog.id as songId',
                    'songName as songName',
                    'image as image',
                    'si.id as presentedBy',
                    'sog.createdAt as createdAt'
                ]).innerJoin(CategoriesEntity, 'cat', 'cat.id = sog.categoryId')
                .innerJoin(SingerEntity, 'si', 'si.id = sog.singer_id')
                .where('sog.singer_id = :singerId', { singerId })
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .getRawMany();
        } catch (error) {
            console.log(this.getSongBySingerId.toString(), error);
        }
    }

    async searchSongBysongName(songName: string, limit: number, pageNum: number): Promise<ISearchsongNameResponse[] | any> {
        try {
            return await getRepository(SongEntity).createQueryBuilder('sog')
                .select([
                    'sog.id as songId',
                    'sog.songName as songName',
                    'sog.image as image'
                ]).where('sog.songName like :songName ', { songName: '%' + songName + '%' })
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
                    'songName as songName',
                    'createdAt as createdAt'
                ])
                .innerJoin(CategoriesEntity, 'cat', 'cat.id = sog.categoryId')
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .orderBy('sog.createdAt', 'DESC')
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
                    'songName as songName',
                    'image as image',
                    'sog.createdAt as createdAt',
                    'sog.viewNumber as viewNumber'
                ]).innerJoin(CategoriesEntity, 'cat', 'cat.id = sog.categoryId')
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .orderBy('sog.viewNumber', 'DESC')
                .getRawMany();
        } catch (error) {
            console.log(this.getTopViewSongs.toString(), error);
        }
    }
}
