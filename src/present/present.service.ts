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
            .where('pre.id = :presentId', { presentId })
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

    async updatePresent(presentId: number, presentInfo: PresentEntity): Promise<boolean> {
        let response = false;
        let present = await this.getPresentInfo(presentId)
        if (!present) {
            return false;
        }
        Object.assign(present, presentInfo);
        const updated = await getRepository(PresentEntity).update({ presentId!: presentId }, present);
        if (updated) {
            response = true;
        }
        return response
    }

    async deletePresent(presentId: number): Promise<boolean> {
        let response = false;
        const deleted = await getRepository(PresentEntity).delete({ presentId!: presentId });
        if (deleted) {
            response = true;
        }
        return response;
    }

    async getSongBySingerId(singerId: number, limit: number, pageNum: number): Promise<ISongSingerResponse[] | any> {
        try {
            return await getRepository(PresentEntity).createQueryBuilder('pre')
                .select([
                    'si.id as singerId',
                    'singer  as singer',
                    'pre.id as presentId',
                    'song_name as song_name',
                    'image as image',
                    'si.id as presentedBy',
                    'sog.created_at as createdAt'
                ]).innerJoin(SingerEntity, 'si', 'si.id = pre.singer_id')
                .innerJoin(SongEntity, "pre", 'pre.id = pre.sonq_id')
                .where('pre.singer_id = :singerId', { singerId })
                .limit(limit)
                .offset((pageNum - 1) * limit)
                .getRawMany();
        } catch (error) {
            console.log(this.getSongBySingerId.toString(), error);
        }
    }

}
