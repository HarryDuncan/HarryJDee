
export const CampaignItem = {
		'ID' : {
			'type' : 'int',
			'display' : false,
		},
		'Name' : {
			'type' : 'string',
			'label' : 'Title',
			'display' : true,
			'edit' : true,
			'required' : true,
		},
		'Total' : {
			'type' : 'int',
			'label' : 'Amount Raised',
			'display' : true,
			'edit' : true,
			'required' : true,
		},
		'Supporting' : {
			'type' : 'string',
			'display' : true,
			'label' : 'Blurb',
			'value' : '',
			'edit' : true,
			'multiline' : true
			},
		'SiteUrl': {
			'type' : 'string',
			'display' : true,
			'label' : 'URL',
			'value' : '',
			'edit' : true
		},
		'Status':{
			'type' : 'dropdown-text',
			'display' : true,
			'label' : 'Status',
			'options' : ['Active','Closed','Archived'],
			'value' : '',
			'edit' : true
		},
		'StartDate':{
			'type' : 'dateTime',
			'display' : true,
			'label' : 'Campaign Start Date',
			'time' : true,
			'value' : '',
			'edit' : true
		},
		'EndDate':{
			'type' : 'dateTime',
			'display' : true,
			'label' : 'Campaign End Date',
			'value' : '',
			'edit' : true
		},
		'DataType' : {
			'type' : 'string',
			'display' : false,
			'value' : 'campaigns'
		},
}


export const formatDataToCampaign = ( data: any[] ) => {
	data = data.map(item => ({...item , 'Title' : item['Name'], 'DataType' : 'campaigns' }))
	return data

}