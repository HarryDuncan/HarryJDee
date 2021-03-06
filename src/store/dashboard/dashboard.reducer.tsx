import {IDashboardState, dashboardActionTypes} from './dashboard.types';
import update from 'immutability-helper';
import {updateCurrentData, removeFromCurrent} from './../mainFunctions'
import {formatDataToContent, formatDataToMixes, formatDataToCampaign} from './../../data';
import {getFromStorage} from './../../utilities/utilityFunctions'



const initialDashboardState : IDashboardState = {
	isLoggingIn : false,
	loggedIn : process.env.NODE_ENV === 'development' ? true : getFromStorage("Logged_In", false, true),
	loggedInFailMessage : false,
	dashboardArray : [],
	ordersArray: [],
}



function dashboard(state: IDashboardState = initialDashboardState, action: any){
	switch(action.type) {
		
		// Login 
		case dashboardActionTypes.LOGIN_TRY:
			return update(state, {
				isLoggingIn : {$set : true},
			})
		case dashboardActionTypes.LOGIN_SUCCESS:
			localStorage.setItem('Logged_In', JSON.stringify(true)) 
			return update(state, {
				loggedIn : {$set : true},
				loggedInFailMessage : {$set :false},
				isLoggingIn : {$set : false},
			})
		case dashboardActionTypes.LOGIN_FAIL:
			return update(state, {
				loggedIn : {$set : false},
				loggedInFailMessage : {$set : true},
					isLoggingIn : {$set : false},
			})


		// Content Editor
		case dashboardActionTypes.LOAD_DASHBOARD_DATA:
			return state;
		case dashboardActionTypes.LOAD_DASHBOARD_DATA_SUCCESS:
			let data = action.payload.data
			switch(action.table){
				case 'content':
					data = formatDataToContent(data)
					break;
				case 'campaigns':
					data = formatDataToCampaign(data)
					break;
				case 'mixes':
					data = formatDataToMixes(data)
					break

			}
			console.log(action.table)
			return update(state, {
				dashboardArray : {$set : data}
			})

		// Edit content -Submit, Update, Delete
		case dashboardActionTypes.SUBMIT_DATA_SUCCESS:
			let updatedDashboardArr = state.dashboardArray
			updatedDashboardArr.push(action.payload.newData)
			return update(state, {
				dashboardArray : {$set : updatedDashboardArr}
			})
			return state;
		case dashboardActionTypes.UPDATE_DATA_SUCCESS:
			return update(state, {
				dashboardArray : {$set : updateCurrentData(action.payload['new_item'], action.payload['item_ID'], state.dashboardArray)}
			})
		case dashboardActionTypes.DELETE_DATA_SUCCESS:
			return update(state, {
				dashboardArray : {$set : removeFromCurrent(action.payload['item_ID'], state.dashboardArray)}
			})
		case dashboardActionTypes.UPLOAD_IMAGE_SUCCESS:
			console.log('done')
		// Orders
		case dashboardActionTypes.LOAD_ORDERS_SUCCESS:
			return update(state, {
				ordersArray : {$set : action.payload.data}
			})

		case dashboardActionTypes.UPDATE_ORDER_SUCCESS:
			return update(state, {
					ordersArray : {$set : updateCurrentData(action.payload['new_item'], action.payload['item_ID'], state.ordersArray)}
			})
		default:
			return state;
	
	}
}

export default dashboard;

