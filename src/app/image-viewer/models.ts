export interface PhotosResponse {
    Photos: Array<PhotoResponse>;
}

export interface PhotoResponse {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
