import {getData} from './../mainFunctions'
import {artActionTypes} from './art.types'


export const initializeGallery = () => {
	return function (dispatch : any) {
		dispatch({type : artActionTypes.LOAD_ART_DATA })

		const returnDataCallback = (success : boolean, items : any[]) => {
			if(success){
				dispatch(
					{type: artActionTypes.LOAD_ART_DATA_SUCCESS, payload: items}
				)
			}else{
				dispatch(
					{type: artActionTypes.LOAD_ART_DATA_ERROR, payload: items}
				)
			}
		} 
	getData('_painting_table', '', returnDataCallback)
	}
}