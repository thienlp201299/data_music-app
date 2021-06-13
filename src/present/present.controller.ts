import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PresentEntity } from 'src/entities/present.entity';
import { ISongSingerResponse } from './present.response';
import { PresentService } from './present.service';

@Controller('presents')
export class PresentController {
    constructor(private readonly presentSevice: PresentService) { }

    @Get('detail/:presentId')
    async getPresentId(@Param('presentId') presentId: number): Promise<PresentEntity> {
        return await this.presentSevice.getPresentInfo(presentId);
    }

    @Post('create')
    async createPresent(@Body() presentData: PresentEntity): Promise<boolean> {
        return await this.presentSevice.createPresent(presentData);
    }

    @Put('update/:presentId')
    async updatePresent(
        @Param('presentId') presentId: number,
        @Body() presentInfo: PresentEntity,
    ): Promise<boolean> {
        return await this.presentSevice.updatePresent(presentId, presentInfo);
    }

    @Delete('delete/:presentId')
    async deletePresent(
        @Param('presentId') presentId: number
    ): Promise<boolean> {
        return await this.presentSevice.deletePresent(presentId);
    }

    @Get('get_song_by_singer/:singerId/:limit/:pageNum')
    async getSongBySingerId(@Param('singerId') singerId: number, @Param('limit') limit: number, @Param('pageNum') pageNum: number): Promise<ISongSingerResponse[] | undefined> {
        return this.presentSevice.getSongBySingerId(singerId, limit, pageNum);
    }
}


