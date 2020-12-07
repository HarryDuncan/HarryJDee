import {getData,postData} from './../mainFunctions'
import {campaignActionTypes} from './campaign.types'
import {appActionTypes} from './../app/app.types'

export const closeDonationModal = () => {
	return function (dispatch : any) {
		dispatch({type : campaignActionTypes.CLOSE_DONATION_RECEIPT_MODAL})
	}
}

export const getCampaignData = (title : string ) => {
	return function (dispatch : any) {
		dispatch({type : campaignActionTypes.LOAD_CAMPAIGN_DATA})

	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				dispatch(
					{type: campaignActionTypes.LOAD_CAMPAIGN_DATA_SUCCESS, payload: items}
				)
			}else{
				dispatch(
					{type:  campaignActionTypes.LOAD_CAMPAIGN_DATA_ERROR, payload: items}
				)
			}
		}
	getData('_campaigns', '', returnDataCallback)
	}
}


export const donationReceived = (paymentData : object, donorData : object, amount : number) => {
	return (dispatch : any, getState : () => any) => {
		dispatch({type : campaignActionTypes.DONATION_RECEIVED})

	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				dispatch(
					{type: campaignActionTypes.DONATION_RECEIVED_SUCCESS, payload: {payment : paymentData, donor : donorData, donationAmount : amount}}
				)
			if(items !== undefined){
					dispatch(
							{type : appActionTypes.SAVE_EMAIL, payload : items}
							)

						}
			}else{
				dispatch(
					{type:  campaignActionTypes.DONATION_RECEIVED_ERROR, payload: items}
				)
			}
		}
	let campaign = getState().campaigns.activeCampaign

	let donationObj : any = {}
	donationObj['donor'] = donorData
	donationObj['payment'] = paymentData
	donationObj['donationData'] = {'Amount' : amount, 'CampaignID' : campaign['ID']}
	postData('donate', donationObj , returnDataCallback)
	}
}