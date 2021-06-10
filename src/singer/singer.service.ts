import { Injectable } from '@nestjs/common';
import { SongEntity } from 'src/entities/song.entity';
import { getRepository } from 'typeorm';
import { SingerEntity } from '../entities/singer.entity';
import { ISearchSingerResponse } from './singer.response';

@Injectable()
export class SingerService {

    async getSingers(limit: number, pageNum: number): Promise<SingerEntity[]> {
        return getRepository(SingerEntity)
            .createQueryBuilder('si')
            .limit(limit)
            .offset((pageNum - 1) * limit)
            .getMany();
    }

    async getSingerInfo(singerId: number): Promise<SingerEntity> {
        return await getRepository(SingerEntity)
            .createQueryBuilder('si')
            .where('si.id = :singerId', { singerId })
            .getOne();
    }

    async createSinger(singer: SingerEntity): Promise<boolean> {
        let response = false;
        const result = await getRepository(SingerEntity).insert(singer);
        if (result) {
            response = true
        }
        return response;
    }

    async updateSinger(singerId: number, singerInfo: SingerEntity): Promise<boolean> {
        let response = false;
        let singer = await this.getSingerInfo(singerId);
        if (!singer) {
            return false;
        }
        Object.assign(singer, singerInfo);
        const updated = await getRepository(SingerEntity).update({ id: singerId }, singer);
        if (updated) {
            response = true;
        }
        return response
    }

    async deleteSinger(singerId: number): Promise<boolean> {
        let response = false;
        const deleted = await getRepository(SingerEntity).delete({ id: singerId });
        if (deleted) {
            response = true;
        }
        return response;
    }

    async searchSongBySingerName(singerName: string, limit: number, pageNum: number): Promise<ISearchSingerResponse[] | any> {
        try {
            return await getRepository(SingerEntity).createQueryBuilder('si')
                .select([
                    'si.singer as singerName',
                    'sog.id as songId',
                    'sog.songName as songName',
                    'sog.image as image',
                    'sog.music as music'
                ])
                .innerJoin(SongEntity, 'sog', 'sog.singer_id = si.id')
                .where('si.singer like :singerName', { singerName: '%' + singerName + '%' })
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .getRawMany();
        } catch (error) {
            console.log(this.searchSongBySingerName.toString(), error)
        }
    }
}
