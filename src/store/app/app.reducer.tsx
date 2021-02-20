import {IAppState, appActionTypes} from './app.types';
import update from 'immutability-helper';
import {getFromStorage} from './../../utilities/utilityFunctions'


const initialAppState : IAppState = {
	content : null,
	isInitialized : getFromStorage("isInitialized", false, true),
	siteStatus : 'Open',
	sitePages : [],
	showNav : true,
	settings : {},
	testingOn :getFromStorage('testMode', false, true),
	heroMessage : null,
	testCode  : 0,
	mixes : [],
	emailData : {}
}


const combineContent = (data : any, contentType : string) => {
	let returnData :any = {};
	
	for(let i in data){
		if(data[i]['Title'] === contentType){
			returnData['Asset_URL'] === undefined? returnData['Asset_URL'] = [data[i]['Asset_URL']] : returnData['Asset_URL'].push(data[i]['Asset_URL'])
			// returnData['Content'].push(data[i]['Content'])
		}
	}
	return returnData
}



function app(state: IAppState = initialAppState, action: any){
	switch(action.type) {
		case appActionTypes.UNLOCK_SITE:
			sessionStorage.setItem('testMode',JSON.stringify(false))
			return update(state, {
				testingOn : {$set : false},
				heroMessage : {$set : null}
			})
		case appActionTypes.INITIALIZE_SITE_SUCCESS:
			let siteSettings: any = action.payload[0]
			return update(state, {
				siteStatus : {$set: siteSettings['SiteStatus']},
				sitePages : {$set: JSON.parse(siteSettings['Pages'])},

				// Todo Settings so that individual pages can be turned on and off
				settings : {$set : siteSettings},
				testingOn : {$set : JSON.parse(siteSettings['Testing']) === 1  &&  process.env.NODE_ENV === 'production' ? true : false},
				testCode : {$set : JSON.parse(siteSettings['TestCode'])},
				heroMessage : {$set : process.env.NODE_ENV === 'production' ? siteSettings['HeroMessage'] : null}
			})
		case appActionTypes.INITIALIZE_SITE_ERROR:
			return update(state,{
				siteStatus : {$set :'Down'}
			})
		case appActionTypes.TOGGLE_NAV:
			return update(state, {
				showNav : {$set : !action.payload}
			})
		case appActionTypes.LOAD_MIXES_SUCCESS:
		let mixArr =  action.payload.data.map((obj : any ) => ({...obj, title: obj['Title']}))
			return update(state, {
				mixes : {$set : mixArr.sort((a: any, b: any) => b['ID']- a['ID'])}
			})
		case appActionTypes.LOAD_CONTENT_SUCCESS:
			let returnObj : any = {}
			// Todo - when building more interesting bio page with dynamic content module
			// let rawData : any[] = [combineContent(action.payload.data, 'Bio')]
			let rawData : any[] = action.payload.data
			
			for(let i in rawData){
				returnObj[rawData[i]['Title']] = rawData[Number(i)]
			}
			
			return update(state, {
				content : {$set : returnObj}
			})
			return state
		case appActionTypes.SAVE_EMAIL:
			return update(state,{
				emailData : {$set: action.payload['emailData']}
			})
		default:
			return state;
	
	}
}

export default app;

