export interface ICampaignSectionState{
	activeCampaign : any;
	campaignArray: any[];
	donationReceipt : object;
	showDonationReceipt : boolean;
}


export enum campaignActionTypes {
	LOAD_CAMPAIGN_DATA = 'campaign/LOAD_CAMPAIGN_DATA',
	LOAD_CAMPAIGN_DATA_SUCCESS = 'campaign/LOAD_CAMPAIGN_DATA_SUCCESS',
	LOAD_CAMPAIGN_DATA_ERROR = 'campaign/LOAD_CAMPAIGN_DATA_ERROR',

	CONTRIBUTE = 'campaign/CONTRIBUTE',

	DONATION_RECEIVED = 'campaign/DONATION_RECEIVED',
	DONATION_RECEIVED_SUCCESS = 'campaign/DONATION_RECEIVED_SUCCESS',
	DONATION_RECEIVED_ERROR = 'campaign/DONATION_RECEIVED_ERROR',

	CLOSE_DONATION_RECEIPT_MODAL = 'campaign/CLOSE_DONATION_RECEIPT_MODAL'
}