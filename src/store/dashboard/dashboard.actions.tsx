import {getData,postData, formatSubmissionData, postImage, removeFile} from './../mainFunctions'
import {dashboardActionTypes} from './dashboard.types'

export const login = (loginData : object) => {
	return function (dispatch : any) {
		dispatch({type : dashboardActionTypes.LOGIN_TRY})


	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				dispatch(
					{type: dashboardActionTypes.LOGIN_SUCCESS, payload: items}
				)
			}else{
				dispatch(
					{type:  dashboardActionTypes.LOGIN_FAIL, payload: items}
				)
			}
		}
		postData('login' , loginData, returnDataCallback)
	}
}


export const initializeContentEditor = (type : string) => {
	return function (dispatch : any) {
		dispatch({type : dashboardActionTypes.LOAD_DASHBOARD_DATA})

	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				dispatch(
					{type: dashboardActionTypes.LOAD_DASHBOARD_DATA_SUCCESS, payload: items, table :type}
				)
			}else{
				dispatch(
					{type:  dashboardActionTypes.LOAD_DASHBOARD_DATA_ERROR, payload: items}
				)
			}
		}
	let table = '';
	switch(type){
		case 'art':
			table = '_painting_table'
			break;
		case 'products':
			table = '_product_table'
			break;
		case 'content':
			table =  '_content_table'
			break;
		case 'campaigns':
			table = '_campaigns'
			break;
		case 'mixes':
			table = '_mixes_table'
			break;
		default:
			table = ''
			break;
	}
	getData(table, '', returnDataCallback)
	}
}

export const deleteData = (data : any, type? : string, callback?: () => void ) => {
		return function (dispatch : any ){
			dispatch({type : dashboardActionTypes.DELETE_DATA})

		const returnDataCallback = (success : boolean, items : any[]|undefined) => {
				if(success){
					dispatch(
						{type: dashboardActionTypes.DELETE_DATA_SUCCESS, payload: dataBody}
					)
					if(callback){
						callback()
					}
				}else{
					dispatch(
						{type:  dashboardActionTypes.DELETE_DATA_ERROR, payload: items}
					)
				}
			}

		let dataType: string = String(type)
		if(dataType === 'undefined'){
			dataType = data['DataType']['value']
		}
		let table : string;
		let dataBody :any = {}
		dataBody['item_ID'] =  data['ID']['value']
		switch(dataType){
			case 'art':
				table = '_painting_table'
				break;
			case 'products':
				table = '_product_table'
				break;
			case 'content':
				table = '_content_table'
				break;
			default:
				table = ''
				break;
		}
		dataBody['data_table'] = table
		let deleteImageValue = {dataType : data['DataType']['value'], url : data['originalValue']['value']}
		dataBody['image_data'] = deleteImageValue
		dispatch(deleteImage(dataBody, dataType))
		postData('delete', dataBody, returnDataCallback)
		}
	}

export const submitData = (data : any, type? : string, callback? : () => void) => {
	return function (dispatch : any ){
		dispatch({type : dashboardActionTypes.SUBMIT_DATA})

	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				if(callback !== undefined){
					callback()
				}
				dispatch(
					{type: dashboardActionTypes.SUBMIT_DATA_SUCCESS, payload: items, newData : data}
				)
			}else{
				dispatch(
					{type:  dashboardActionTypes.SUBMIT_DATA_ERROR, payload: items}
				)
			}
		}

	let dataType: string = String(type)
	if(dataType === 'undefined'){
		dataType = data['DataType']['value']
	}
	let table : string;
	let dataBody :any = {}
	dataBody['new_item'] = formatSubmissionData(data);
	switch(dataType){
		case 'art':
			table = '_painting_table'
			break;
		case 'products':
			table = '_product_table'
			break;
		case 'campaigns':
			table = '_campaigns'
			break;
		default:
			table = ''
			break;
	}
	dataBody['data_table'] = table
	if(data['Image'] !== undefined){
		dispatch(uploadImage(data['Image']['value'], dataType))
	}
	postData('new', dataBody, returnDataCallback)
	}
}

export const updateData = (data : any, type? : string , callback?: () => void) =>{
	return function (dispatch : any ){
		dispatch({type : dashboardActionTypes.UPDATE_DATA})

	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				dispatch(
					{type: dashboardActionTypes.UPDATE_DATA_SUCCESS, payload: dataBody}
				)
				if(callback !== undefined){
					callback()
				}
			}else{
				dispatch(
					{type:  dashboardActionTypes.UPDATE_DATA_ERROR, payload: items}
				)
			}
		}

	let dataType: string = String(type)
	if(dataType === 'undefined'){
		console.log(data)
		dataType = data['DataType']['value']
	}
	let table : string;
	let dataBody :any = {}
	dataBody['new_item'] = formatSubmissionData(data, true);
	console.log(dataType)
	switch(dataType){
		case 'art':
			table = '_painting_table'
			break;
		case 'products':
			table = '_product_table'
			break;
		case 'content':
			table = '_content_table'
			break;
		case 'campaigns':
		case 'campaign':
			table = '_campaigns'
			break;
		default:
			table = ''
			break;
	}
	dataBody['data_table'] = table
	dataBody['item_ID'] =  data['ID']['value']
	if(data['Image'] !== undefined && data['Image']['value'] !== undefined && data['Image']['value']['Url'] !== undefined){
		let remove_image_Body : any = {'data_table' : table}
		let deleteImageValue = {dataType : data['DataType']['value'], url : data['originalValue']['value']}
		remove_image_Body['image_data'] = deleteImageValue
		dispatch(deleteImage(remove_image_Body, dataType))
		dispatch(uploadImage(data['image']['value'], dataType))
	}
	postData('update', dataBody, returnDataCallback)
	}

}


export const deleteImage = (data : any, type : string) => {
	return function (dispatch : any ){
		dispatch({type : dashboardActionTypes.DELETE_IMAGE})


	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				dispatch(
					{type: dashboardActionTypes.DELETE_IMAGE_SUCCESS, payload: items}
				)
			}else{
				dispatch(
					{type:  dashboardActionTypes.DELETE_IMAGE_ERROR, payload: items}
				)
			}
		}
		removeFile('deleteImage', data, type, returnDataCallback)
	}
}

export const uploadImage  = (file: any, type : string) => {
	return function (dispatch : any ){
		dispatch({type : dashboardActionTypes.UPLOAD_IMAGE})


	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				dispatch(
					{type: dashboardActionTypes.UPLOAD_IMAGE_SUCCESS, payload: items}
				)
			}else{
				dispatch(
					{type:  dashboardActionTypes.UPLOAD_IMAGE_ERROR, payload: items}
				)
			}
		}
		postImage('uploadImage', file, type, returnDataCallback)

	}
}


// Order Data 
export const getOrders = () => {
	return function (dispatch : any) {
		dispatch({type : dashboardActionTypes.LOAD_ORDERS})

	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			if(success){
				dispatch(
					{type: dashboardActionTypes.LOAD_ORDERS_SUCCESS, payload: items}
				)
			}else{
				dispatch(
					{type:  dashboardActionTypes.LOAD_ORDERS_ERROR, payload: items}
				)
			}
		}

	getData('_order_table', '', returnDataCallback)
	}
}


export const updateOrder = (orderData : any, status : string, callback : (success:boolean) => void) => {
	return function(dispatch: any){
	dispatch({type : dashboardActionTypes.UPDATE_ORDER})

	let dataBody :any = {}


	const returnDataCallback = (success : boolean, items : any[]|undefined) => {
			callback(success)
			if(success){
				dispatch(
					{type: dashboardActionTypes.UPDATE_ORDER_SUCCESS, payload: dataBody}
				)
			}else{
				dispatch(
					{type:  dashboardActionTypes.UPDATE_ORDER_ERROR, payload: items}
				)
			}
		}

	

	dataBody['data_table'] = '_order_table'
	dataBody['new_item'] = formatSubmissionData(orderData, true);
	dataBody['new_item']['OrderStat'] = { value: status, type: 'string' }
	dataBody['item_ID'] =  orderData['ID']['value']
	postData('update_order', dataBody, returnDataCallback)
	}
}



	/*
  let body = JSON.stringify({
      key: filename
  })
  var url = process.env.REACT_APP_API_URL + 'S3Resolve/signs3Bucket'
  let axiosConfig = {
  headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
      }
  }
  axios.post(url, body, axiosConfig )
  .then(response => {
   let options = {
    headers: {
      "Content-Type": 'jpg'
    }
   };
   axios.put(response.data, file, options)
   .then(response => {
    
   })
    })

}

*/
