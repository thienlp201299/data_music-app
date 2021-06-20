import { Get, Post, Put, Delete, Param, Body, Controller } from '@nestjs/common';
import { AuthorEntity } from 'src/entities/author.entity';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { SingerEntity } from 'src/entities/singer.entity';
import { SongEntity } from '../entities/song.entity';
import { INewSongResponse, ISearchsongNameResponse, ISongAuthorResponse, ISongDetailResponse, ISongResponse, ITopViewResponse } from './song.response';
import { SongService } from './song.service';

@Controller('songs')
export class SongController {
    constructor(private readonly songService: SongService) { }

    @Get('all/:limit/:pageNum')
    async getAll(
        @Param('limit') limit: number,
        @Param('pageNum') pageNum: number,
    ): Promise<ISongResponse[]> {
        return await this.songService.getSongs(limit, pageNum)
    }

    @Get('detail/:songId')
    async getSongId(
        @Param('songId') songId: number
    ): Promise<SongEntity> {
        return await this.songService.getSongInfo(songId);
    }

    @Post('create')
    async createSong(@Body() songData: SongEntity): Promise<boolean> {
        return await this.songService.createSong(songData);
    }

    @Put('update/:songId')
    async updateSong(
        @Param('songId') songId: number,
        @Body() songInfo: SongEntity,
    ): Promise<boolean> {
        return await this.songService.updateSong(songId, songInfo);
    }

    @Delete('delete/:songId')
    async deleteSong(@Param('songId') songId: number): Promise<boolean> {
        return await this.songService.deleteSong(songId);
    }

    @Get('get_song_by_category/:categoryId/:limit/:pageNum')
    async getSongsByCategoryId(@Param('categoryId') categoryId: number, @Param('limit') limit: number, @Param('pageNum') pageNum: number): Promise<ISongResponse[] | undefined> {
        return this.songService.getSongsByCategoryId(categoryId, limit, pageNum);
    }

    @Get('get_song_detail/:songId')
    async getSongDetail(@Param('songId') songId: number): Promise<ISongDetailResponse | undefined> {
        return this.songService.getSongDetail(songId);
    }

    @Get('get_song_by_author/:authorId/:limit/:pageNum')
    async getSongByAuthorId(@Param('authorId') authorId: number, @Param('limit') limit: number, @Param('pageNum') pageNum: number): Promise<ISongAuthorResponse[] | undefined> {
        return this.songService.getSongByAuthorId(authorId, limit, pageNum);
    }

    @Post('search_song_by_songname/:limit/:pageNum')
    async searchSongBysongName(@Body() songCondition: any,
        @Param('limit') limit: number,
        @Param('pageNum') pageNum: number): Promise<ISearchsongNameResponse[] | undefined> {
        return this.songService.searchSongBysongName(songCondition.songName, limit, pageNum);
    }

    @Get('get_new_song/:limit/:pageNum')
    async getNewSong(@Param('limit') limit: number, @Param('pageNum') pageNum: number): Promise<INewSongResponse[] | undefined> {
        return this.songService.getNewSong(limit, pageNum);
    }

    @Get('get_topview_songs/:limit/:pageNum')
    async getTopviewSongs(@Param('limit') limit: number, @Param('pageNum') pageNum: number): Promise<ITopViewResponse[] | undefined> {
        return this.songService.getTopViewSongs(limit, pageNum);
    }
}
