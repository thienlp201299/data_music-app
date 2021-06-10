export interface ISongResponse {
    songName: string;
    categoryId: number;
    id: number;
    image: string;
}

export interface ISongDetailResponse {
    categoryId: number;
    categoryName: string;
    songName: string;
    music: string;
    image: string;
    presentedBy: string;
    composedBy: string;
    createdAt: Date;
}

export interface INewSongResponse {
    categoryId: number;
    songId: number;
    categoryName: string;
    image: string;
    songName: string;
    createdAt: string;
}

export interface ISongAuthorResponse {
    categoryId: number;
    categoryName: string;
    composedBy: string;
    songId: number;
    songName: string;
    image: string;
    createdAt: Date;
}

export interface ISongSingerResponse {
    categoryId: number;
    categoryName: string;
    presentedBy: string;
    songId: number;
    songName: string;
    image: string;
    createdAt: Date;

}

export interface ITopViewResponse {
    categoryId: number;
    categoryName: string;
    songId: string;
    songName: string;
    image: string;
    createdAt: Date;
    viewNumber: number;
}

export interface ISearchsongNameResponse {
    songId: number;
    songName: string;
    image: string;
}