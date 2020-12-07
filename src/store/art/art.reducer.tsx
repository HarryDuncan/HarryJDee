import {IArtState, artActionTypes} from './art.types';
import update from 'immutability-helper';


const initialArtState : IArtState = {
	isLoaded : false,
	galleryArray : [],
}



function art(state: IArtState = initialArtState, action: any){
	switch(action.type) {
		case artActionTypes.LOAD_ART_DATA_SUCCESS:
			return update(state, {
				galleryArray : {$set : action.payload.data.map((obj : any ,i : number) => ({...obj, index : i}))}
			})
		default:
			return state;
	
	}
}

export default art;

