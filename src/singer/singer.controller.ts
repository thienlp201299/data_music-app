import { Get, Post, Put, Delete, Param, Body, Controller } from '@nestjs/common';
import { SingerEntity } from '../entities/singer.entity';
import { ISearchSingerResponse } from './singer.response';
import { SingerService } from './singer.service';

@Controller('singers')
export class SingerController {
    constructor(private readonly singerService: SingerService) { }

    @Get('all/:limit/:pageNum')
    async getAll(
        @Param('limit') limit: number,
        @Param('pageNum') pageNum: number,
    ): Promise<SingerEntity[]> {
        return await this.singerService.getSingers(limit, pageNum)
    }

    @Get('detail/:singerId')
    async getSingerId(
        @Param('singerId') singerId: number
    ): Promise<SingerEntity> {
        return await this.singerService.getSingerInfo(singerId);
    }

    @Post('create')
    async createSinger(@Body() singerData: SingerEntity): Promise<boolean> {
        return await this.singerService.createSinger(singerData);
    }

    @Put('update/:singerId')
    async updateSinger(
        @Param('singerId') singerId: number,
        @Body() singerInfo: SingerEntity,
    ): Promise<boolean> {
        return await this.singerService.updateSinger(singerId, singerInfo);
    }

    @Delete('delete/:singerId')
    async deleteSinger(@Param('singerId') singerId: number): Promise<boolean> {
        return await this.singerService.deleteSinger(singerId);
    }

    @Get('search_song_by_singername/:singerName/:limit/:pageNum')
    async searchSongBySingerName(@Param('singerName') singerName: string, @Param('limit') limit: number, @Param('pageNum') pageNum: number): Promise<ISearchSingerResponse[] | undefined> {
        return this.singerService.searchSongBySingerName(singerName, limit, pageNum);
    }
}
