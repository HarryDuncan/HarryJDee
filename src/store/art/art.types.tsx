export interface IArtState{
	isLoaded : boolean;
	galleryArray: object[];
}

export enum artActionTypes {
	LOAD_ART_DATA = 'art/LOAD_ART_DATA',
	LOAD_ART_DATA_SUCCESS = 'art/LOAD_ART_DATA_SUCCESS',
	LOAD_ART_DATA_ERROR = 'art/LOAD_ART_DATA_ERROR'
}