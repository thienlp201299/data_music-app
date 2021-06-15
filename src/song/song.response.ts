export interface ISongResponse {
    song_name: string;
    categoryId: number;
    id: number;
    image: string;
}

export interface ISongDetailResponse {
    categoryId: number;
    categoryName: string;
    song_name: string;
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
    song_name: string;
    createdAt: string;
}

export interface ISongAuthorResponse {
    categoryId: number;
    categoryName: string;
    composedBy: string;
    songId: number;
    song_name: string;
    image: string;
    createdAt: Date;
}


export interface ITopViewResponse {
    categoryId: number;
    categoryName: string;
    songId: string;
    song_name: string;
    image: string;
    createdAt: Date;
    viewNumber: number;
}

export interface ISearchsongNameResponse {
    songId: number;
    song_name: string;
    image: string;
}