
export const variationItem = {
	'type' : 'subObject',
	'display' : true,
	'value' : {
		'index' : {
			'type' : 'int',
			'display' : false,
			'value' : 0,
			},
		'itemTitle' : {
				'type' : 'string',
				'display' : true,
				'required' : true,
				'label' : 'Type Name',
				'value' : ''
			},
		'stock' : {
				'type' : 'int',
				'display' : true,
				'edit' : true,
				'required' : true,
				'label' : 'Stock',
				'value' : 0
			},
		'price' : {
				'type' : 'int',
				'display' : true,
				'edit' : true,
				'required' : true,
				'label' : 'Price',
				'value' : 0
			}
	}	
}

export const variationObj : any = {
	'variationName' : {
		'type' : 'string',
		'display' : true,
		'required' : true,
		'label' : "Variation Type",
	},
	'variationTypes': {
		'type' : 'arrayItems',
		'display' : 'true',
		'value' : [
		
			{
				'type' : 'subObject',
				'display' : true,
				'value' : {
					'index' : {
						'type' : 'int',
						'display' : false,
						'value' : 0,
						},
					'itemTitle' : {
							'type' : 'string',
							'display' : true,
							'required' : true,
							'label' : 'Type Name',
							'value' : ''
						},
					'stock' : {
							'type' : 'int',
							'display' : true,
							'edit' : true,
							'required' : true,
							'label' : 'Stock',
							'value' : 0
						},
					'price' : {
							'type' : 'int',
							'display' : true,
							'edit' : true,
							'required' : true,
							'label' : 'Price',
							'value' : 0
						}
				}
				
			}
		]
	},
	'variationAdd' : {
		'type' : 'function',
		'display' : true,
		'label' : 'Add New Type'
	}
}


export const customerDetails : any = {
	'CustomerName' : {
		'type' : 'string',
		'label' : 'Customer Name',
		'display' : true,
	},
	'CustomerEmail' : {
		'type' : 'string',
		'label' : 'Customer Email',
		'display' : true,
	},
	'Address' : {
		'type' : 'string',
		'label' : 'Address',
		'display' : true,
	},
	'Country' : {
		'type' : 'string',
		'label' : 'Customer Email',
		'display' : true,
	}

}
export const orderDetails : any = {
	'ID' : {
			'type' : 'int',
			'display' : false,
		},
	'CustomerName' :{
		'type' : 'string',
		'label' : 'Customer Name',
		'display' : true,
	},
	'CustomerEmail' :{
		'type' : 'string',
		'label' : 'Customer Email',
		'display' : true,
	},
	'Address' :{
		'type' : 'string',
		'label' : 'Shipping Address',
		'display' : true,
	},
	'RefID' : {
		'type' : 'string',
		'label' : 'Payment ID',
		'display' : true,
	},
	'OrderDetails' : {
		'type' : 'orderData',
		'label' : 'Order Details',
		'display' : true,
	},
	'ShippingNo' : {
		'type' : 'string',
		'label' : 'Shipping No',
		'display' : true,
		'edit' : true,
		'required' : true,
	},
	'ShippingCompany' : {
		'type' : 'string',
		'label' : 'Shipping Company',
		'display' : true,
		'edit' : true,
		'required' : true,
	},
	'ShippingDetails' : {
		'type' : 'string',
		'multiline' : true,
		'label' : 'Shipping Details',
		'edit' : true,
		'display' : true,
	},
	'OrderStat' : {
		'type' : 'string',
		'label' : 'Status',
		'display' : true,
	},
	"Contribution" : {
		'type' : 'string',
		'label' : 'Contribution',
		'display' : true,
	}
}