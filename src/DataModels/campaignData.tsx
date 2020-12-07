
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
		'DataType' : {
			'type' : 'string',
			'display' : false,
			'value' : 'campaigns'
		},
}


export const formatDataToCampaign = ( data: any[] ) => {
	console.log(data)
	data = data.map(item => ({...item , 'Title' : item['Name'], 'DataType' : 'campaigns' }))
	return data

}