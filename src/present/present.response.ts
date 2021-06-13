export interface ISongSingerResponse {
    singer: string;
    presentId: number;
    presentedBy: string;
    songId: number;
    song_name: string;
    image: string;
    createdAt: Date;

}

export interface ISearchsongNameResponse {
    songId: number;
    song_name: string;
    image: string;
}