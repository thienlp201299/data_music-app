export interface ISearchsongNameResponse {
    songId: number;
    song_name: string;
    image: string;
}

export interface ISongSingerResponse {
    presentedBy: number;
    songId: number;
    song_name: string;
    image: string;
    createdAt: Date;

}