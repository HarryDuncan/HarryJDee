import {getData, postData, formatSubmissionData} from './../mainFunctions';
import {appActionTypes} from './app.types';
import {artActionTypes} from './../art/art.types';
import {campaignActionTypes} from './../campaign/campaign.types';
import {shopActionTypes} from './../shop/shop.types';


export const unlockApp = () => {
	return function (dispatch : any) {
		dispatch({type : appActionTypes.UNLOCK_SITE})
	}
}

export const openSite = () => {
	return function (dispatch : any) {
		dispatch({type : appActionTypes.UNLOCK_SITE})
	}
}
export const initializeSite = () => {
	return function (dispatch : any) {
		dispatch({type : appActionTypes.INITIALIZE_SITE})

	const returnDataCallback = (success : boolean, items : any|undefined) => {
		
			if(success && items !== undefined){
				 let siteData : any = items['data'][0]
				 let painting  : any = {'data' : items['data'][1]}
				 let products  : any = {'data' : items['data'][2]}
				 let content  : any = items['data'][3]
				 let mixes  : any = items['data'][4]
				 let campaigns : any = items['data'][5]
				//  console.log(items)
				dispatch(
					{type: appActionTypes.INITIALIZE_SITE_SUCCESS, payload: siteData},
					)
				dispatch(
					{type: artActionTypes.LOAD_ART_DATA_SUCCESS, payload: painting}
					)
				dispatch(
					{type: shopActionTypes.LOAD_SHOP_DATA_SUCCESS, payload: products}
					)
				dispatch(
					{type: campaignActionTypes.LOAD_CAMPAIGN_DATA_SUCCESS, payload : {data : campaigns}} 
					)
				
				
			}else{
				dispatch(
					{type:  appActionTypes.INITIALIZE_SITE_ERROR, payload: items}
				)
			}
		}
	getData('all', '', returnDataCallback)
	}
}

export const resendEmail = () => {
	return function(dispatch: any, getState : () => any){
		dispatch({type : appActionTypes.RESEND_EMAIL})
		const returnDataCallback = (success : boolean, items : any ) => {
			console.log('asdasd')
		}

	let email : any = getState().app.emailData
	postData('resend_email', email, returnDataCallback)
	}
}

export const toggleNav = (isFullScreen : boolean) => {
	return function (dispatch : any) {
		dispatch({type : appActionTypes.TOGGLE_NAV, payload : isFullScreen})
	}
}
export const getContent = (title : string ) => {
	return function (dispatch : any) {
		dispatch({type : appActionTypes.LOAD_CONTENT_DATA})

	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				dispatch(
					{type: appActionTypes.LOAD_CONTENT_SUCCESS, payload: items}
				)
			}else{
				dispatch(
					{type:  appActionTypes.LOAD_CONTENT_ERROR, payload: items}
				)
			}
		}
	getData(title, '', returnDataCallback)
	}
}

export const getMixes = (title : string ) => {
	return function (dispatch : any) {
		dispatch({type : appActionTypes.LOAD_MIXES})

	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				dispatch(
					{type: appActionTypes.LOAD_MIXES_SUCCESS, payload: items}
				)
			}else{
				dispatch(
					{type:  appActionTypes.LOAD_MIXES_ERROR, payload: items}
				)
			}
		}
	getData('_mixes_table', '', returnDataCallback)
	}
}

export const updateSiteSettings = (settingType : string, settingData : any) => {
	return function(dispatch : any){
		dispatch({type : appActionTypes.UPDATE_SETTINGS})

	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				dispatch(
					{type: appActionTypes.UPDATE_SETTINGS_SUCCESS, payload: settingData}
				)
			}else{
				dispatch(
					{type:  appActionTypes.UPDATE_SETTINGS_ERROR, payload: items}
				)
			}
		}

	let table : string = 'site_settings';
	let dataBody :any = {}
	switch(settingType){
		case 'Site Settings':
			dataBody['new_item'] = formatSubmissionData(settingData, true);
		default:
			table = ''
			break;
	}
	dataBody['item_ID'] = 1
	dataBody['data_table'] = '_site_settings'
	postData('update', dataBody, returnDataCallback)
	}
}

