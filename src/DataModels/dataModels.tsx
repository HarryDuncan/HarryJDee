import cloneDeep from 'lodash/cloneDeep';
import {performMapping} from './dataFunctions'

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


export const dataScaffold : any = {
		'art' :{
			'ID' : {
			'type' : 'int',
			'display' : false,
		},
		'Title' : {
			'type' : 'string',
			'label' : 'Piece Name',
			'display' : true,
			'edit' : true,
			'required' : true,
		},
		'PaintingYear' : {
			'type' : 'int',
			'label' : 'Year Completed',
			'display' : true,
			'edit' : true,
			'required' : true,
		},
		'ExternalUrl' : {
			'type' : 'string',
			'label' : 'External Url',
			'display' : true,
			'edit' : true,
		},
		'Blurb' : {
			'type' : 'string',
			'multiline' : true,
			'label' : 'Blurb',
			'display' : true,
			'edit' : true,
		},

		'Medium' : {
			'type' : 'string',
			'label' : 'Medium',
			'display' : true,
			'edit' : true,
			'required' : true,
		},
		'Image' :{
			'type' : 'image',
			'label' : 'Upload Image',
			'display' : true,
			'edit' : true,
			'required' : true,
		},
		'DataType' : {
			'type' : 'string',
			'display' : false,
			'value' : 'art'
			},
		'contentType' : {
			'type' : 'string',
			'display' : false,
			'value' : ''
			}
		},



	'products' : {
			'ID' : {
			'type' : 'int',
			'display' : false,
			},
		'Title' : {
			'type' : 'string',
			'label' : 'Product Name',
			'display' : true,
			'edit' : true,
			'required' : true,
		},
		'ExternalUrl' : {
			'type' : 'string',
			'display' : true,
			'edit' : true,
			'label' : 'External Url'
		},
		'Blurb' : {
			'type' : 'string',
			'display' : true,
			'edit' : true,
			'multiline' : true,
			'required' : true,
			'label' : 'Product Description'
		},
		'PercentageDonated': {
			'type' : 'int',
			'display' : true,
			'edit' : true,
			'required' : true,
			'label' : 'Percentage Donated to Charity',
		},
		'LossLeader' : {
			'type' : 'yesNo',
			'display' : true,
			'value' : 'No',
			'edit' : true,
			'required' : true,
			'label' : 'Is this product a loss leader?'
		},
		'EstimatedCost' : {
			'type' : 'int',
			'display' : true,
			'value' : 0,
			'edit' : true,
			'required' : true,
			'label' : 'Estimated cost of product'
		},
		'HasVariations' : {
			'type' : 'yesNo',
			'display' : true,
			'value' : 'No',
			'edit' : true,
			'required' : true,
			'label' : 'Are there variations to this product?'
		},
		'Stock' : {
			'type' : 'int',
			'display' : true,
			'edit' : true,
			'required' : true,
			'label' : 'Product Stock',
		},
		'Price' : {
			'type' : 'int',
			'display' : true,
			'edit' : true,
			'required' : true,
			'label' : 'Item Price',
		},
		'Variations' : {
			'type' : 'subObject',
			'display' : false,
			'edit' : true,
			'label' : 'Sizes',
			'value' : variationObj,
		},
		'Image' :{
			'type' : 'image',
			'label' : 'Upload Image',
			'display' : true,
			'edit' : true,
			'required' : true,
		},
		'DataType' : {
			'type' : 'string',
			'display' : false,
			'value' : 'products'
		},
		'contentType' : {
			'type' : 'string',
			'display' : false,
			'value' : ''
		}
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

export const bioData : any = {
	'ID' : {
			'type' : 'int',
			'display' : false,
		},
	'Title' : {
			'type' : 'string',
			'label' : 'Bio',
			'display' : false,
		},
	'Content' : {
			'type' : 'htmlString',
			'label' : 'Bio Content',
			'display' : true,
			'edit' : true,
		},
	'Image' : {
		'type' : 'image',
		'label' : 'Upload Image',
		'display' : true,
		'edit' : true,
		'required' : true,
		},
	'dataType' : {
			'type' : 'string',
			'display' : false,
			'value' : 'content'
		},
}

//Returns product variation strings into an array of objects
export const createTypes = (dataValue : string) => {
	let variationTypes = JSON.stringify(dataValue)
	return variationTypes
}



export const addNewVariation = (data: any) => { 
	let newVarItem = cloneDeep(variationItem)
	newVarItem['value']['index']['value'] = data['Variations']['value']['variationTypes']['value'].length
	data['Variations']['value']['variationTypes']['value'].push(newVarItem)
	return data
}

export const removeVariation = (data : any, index : number|undefined) => {
	let variationData = data['Variations']['value']['variationTypes']['value']
	if(index !== undefined){
		variationData.splice(index, 1)
	}
	data['Variations']['value']['variationTypes']['value'] = variationData
	return data
}
export const performMappingOnForm = (data: any) =>{
	if(data['HasVariations']){
		if(data['HasVariations']['value'] === 'Yes'){
			data = performMapping(data, ['Price', 'Stock'], false)
			data = performMapping(data, ['Variations'], true)
			checkVariationData(data)
		}else{
			data = performMapping(data, ['Price', 'Stock'], true)
			data = performMapping(data, ['Variations'], false)
		}
	}
	if(data['LossLeader']){
		if(data['LossLeader']['value'] === 'Yes'){
			data = performMapping(data, ['EstimatedCost'], true)
		}else{
			data = performMapping(data, ['EstimatedCost'], false)
		}
	}
	return data
}
export const checkVariationData = (data : any) =>{
	if(data['HasVariations'] && data['HasVariations']['value'] === 'Yes'){
		if(data['Variations']['value'] === undefined){
			data['Variations']['value'] = variationObj
		}
	}
	return data
}

export const _reformatVariation = (data : any) => {
	let returnVariationObj : any = cloneDeep(variationObj)
	returnVariationObj['variationName']['value'] = data['Name']
	let variationValueArr = []
	for(let i in data['value']){
		let vObj = cloneDeep(variationItem)
		vObj['value']['index']['value'] = Number(i)
		vObj['value']['itemTitle']['value'] = String(data['value'][i]['ItemTitle'])
		vObj['value']['stock']['value'] = Number(data['value'][i]['Stock'])
		vObj['value']['price']['value'] = Number(data['value'][i]['Price'])
		variationValueArr.push(vObj)
	}
	returnVariationObj['variationTypes'] = {type: "arrayItems", display: "true", value: variationValueArr, nestedDepth: 1}
	return returnVariationObj
}

export const formatOrderDetails = (data : any) => {
	return JSON.parse(data)
}
