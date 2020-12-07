import {ICampaignSectionState, campaignActionTypes} from './campaign.types';
import update from 'immutability-helper';


const initialCampaignState : ICampaignSectionState = {
	activeCampaign: {Name : '', Total : 0, CampaignContent : {}, ID : 0},
	campaignArray: [],
	donationReceipt : {},
	showDonationReceipt : false,
}

const getActiveCampaign = (campaignArray : any) => {
	// @ts-ignore
	let active = campaignArray.filter(campaign => campaign['Status'] === 'Active')
	if(active.length === 0){
		// @ts-ignore
		active = campaignArray.filter(campaign => campaign['Status'] === 'Closed')
		if(active.length === 0){
			active.push(campaignArray[0])
		}
	}
	
	return active[0]
}

const addContribution = (amount : number, campaignData : any ) => {
	campaignData['Total'] = campaignData['Total'] + amount
	campaignData['contributionCount'] += 1
	return campaignData
}

function campaigns(state: ICampaignSectionState = initialCampaignState, action: any){
	switch(action.type) {
		case campaignActionTypes.LOAD_CAMPAIGN_DATA_SUCCESS:
			return update(state, {
					campaignArray : {$set  : action.payload.data},
					activeCampaign : {$set : getActiveCampaign(action.payload.data)}
				}
			)
		case campaignActionTypes.CONTRIBUTE:
			return update(state, {
					activeCampaign : {$set : addContribution(action.payload, state.activeCampaign)}
				}
			)
		case campaignActionTypes.DONATION_RECEIVED_SUCCESS:
			return update(state, {
					activeCampaign : {$set : addContribution(action.payload.donationAmount, state.activeCampaign)},
					donationReceipt : {$set : {'donor' : action.payload.donor, amount : action.payload.donationAmount}},
					showDonationReceipt : {$set : true}
				}
			)
		case campaignActionTypes.CLOSE_DONATION_RECEIPT_MODAL:
			return update(state,{
				showDonationReceipt : {$set : false},
				donationReceipt : {$set : {}}
			})
		default:
			return state;
	
	}
}

export default campaigns;