import {variationObj} from './../commerce/commerceData'

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
	},
	'mixes' : {
			'ID' : {
			'type' : 'int',
			'display' : false,
			},
		'Title' : {
			'type' : 'string',
			'label' : 'Mix Name',
			'display' : true,
			'edit' : true,
			'required' : true,
		},
		
		'MixDescription' : {
			'type' : 'string',
			'display' : true,
			'edit' : true,
			'multiline' : true,
			'required' : true,
			'label' : 'Mix Description'
		},
		'PublishDate' : {
			'type' : 'dateTime',
			'display' : true,
			'label' : 'Date Recorded',
			'time' : true,
			'value' : '',
			'edit' : true
		},
		'Mix File': {
			'type' : 'int',
			'display' : true,
			'edit' : true,
			'required' : false,
			'label' : 'Mix File',
		},
		
		'Image' :{
			'type' : 'image',
			'label' : 'Upload Image',
			'display' : true,
			'edit' : false,
			'required' : true,
		},
		'DataType' : {
			'type' : 'string',
			'display' : false,
			'value' : 'products'
		},
		
	}
}