export const siteSettings = {
	'SiteStatus': {
			'type' : 'dropdown-text',
			'display' : true,
			'required' : true,
			'label' : 'Site Status',
			'options' : ['Active', 'Maintenance'],
			'value' : '',
			'edit' : true
			},
	'HeroMessage' : {
			'type' : 'string',
			'display' : true,
			'required' : false,
			'label' : 'Hero',
			'value' : '',
			'edit' : true
		},
	'Testing' : {
			'type' : 'yesNo',
			'display' : true,
			'required' : false,
			'label' : 'Enable Test Mode',
			'value' : '',
			'edit' : true
		},
	'TestCode' : {
		'type' : 'string',
		'display' : true,
		'required' : false,
		'label' : 'Test Code',
		'value' : '',
		'edit' : true
	}
}

