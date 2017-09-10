export interface PhotosResponse {
    Photos: Array<Photo>;
}

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
