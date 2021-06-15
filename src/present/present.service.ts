import { Injectable } from '@nestjs/common';
import { PresentEntity } from 'src/entities/present.entity';
import { SingerEntity } from 'src/entities/singer.entity';
import { SongEntity } from 'src/entities/song.entity';
import { getRepository } from 'typeorm';
import { ISongSingerResponse } from './present.response';

@Injectable()
export class PresentService {

    async getPresentInfo(presentId: number): Promise<PresentEntity> {
        return await getRepository(PresentEntity)
            .createQueryBuilder('pre')
            .where('pre.presentId = :presentId', { presentId })
            .getOne();
    }

    async createPresent(present: PresentEntity): Promise<boolean> {
        let response = false;
        const result = await getRepository(PresentEntity).insert(present)
        if (result) {
            response = true;
        }
        return response;
    }


    async deletePresent(songId: number, singerId: number): Promise<boolean> {
        let response = false;
        const deleted = await getRepository(PresentEntity).delete({ songId, singerId });
        if (deleted) {
            response = true;

            return response;
        }
    }

    async getSongBySingerId(singerId: number, limit: number, pageNum: number): Promise<ISongSingerResponse[] | any> {
        try {
            return await getRepository(PresentEntity).createQueryBuilder('pre')
                .select([
                    'soq.id as songId',
                    'singerId as presentedBy',
                    'song_name as song_name',
                    'image as image',
                    'created_at as createdAt'
                ]).leftJoin(SongEntity, 'soq', 'soq.id = pre.songId')
                .where('singerId = :singerId', { singerId })
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .getRawMany();
        } catch (error) {
            console.log(this.getSongBySingerId.toString(), error);
        }
    }
}
