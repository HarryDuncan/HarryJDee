import axios from "axios";


const isError = (data : any) => {
	if(data['status'] === 200 || data['status'] === undefined){
		return false
	}else{
		return true
	}
}

// Promise for retrieving data
export const getDataPromise = (table : string, query : string) => {
	return new Promise((resolve, reject) => {
		let getDataCall = `${process.env.REACT_APP_API_URL}/${table}`;
		try{
			axios.get(getDataCall)
			.then(response => {
				if(response.status === 200  ){
					resolve(response.data)
				}else{
					reject(response.status)
				}
			}).catch(err => {
				reject('Error')
			})
		}catch{
			reject('Error')
		}
	})
}

export const getData = (table : string, query : string, returnFunction : (success : boolean, data : any[]) => void) => {
	let getDataCall = `${process.env.REACT_APP_API_URL}/${table}`;
		if(query.length > 0){
			getDataCall = getDataCall + query
		}
		try{
			axios.get(getDataCall)
			.then(response => {
				if(response.status === 200  ){
					returnFunction(true, response.data)
				}else{
					returnFunction(false, [response.status])
				}
			}).catch(err => {
				returnFunction(false, ['Error'])
			})
		}catch{
			returnFunction(false, ['Error'])
		}

}


export const postDataPromise = (method : string, data : object, returnFunction : (success : boolean, data? : any[]) => void) => {
		return new Promise((resolve, reject) => {
			const body =  JSON.stringify(data);
			let axiosConfig = {
			  headers: {
			      'Content-Type': 'application/json',
			      "Access-Control-Allow-Origin": "*",
			  }
			};


			const postMethod = `${process.env.REACT_APP_API_URL}/${method}`;
			try{
				axios.post(postMethod, body, axiosConfig)
				.then(response =>{
					if(!isError(response.data)){
						resolve(response.data)
					}else{
						reject(response.data)
					}
				})
			}catch{
				reject('unknownIssue')
			}
		})


}


export const postData = (method : string, data : object, returnFunction : (success : boolean, data? : any[]) => void) => {
		let body =  JSON.stringify(data);
		let axiosConfig = {
		  headers: {
		      'Content-Type': 'application/json',
		      "Access-Control-Allow-Origin": "*",
		  }
		};


		var postMethod = process.env.REACT_APP_API_URL + '/' + method;
		try{
			axios.post(postMethod, body, axiosConfig)
			.then(response =>{
				if(!isError(response.data)){
					returnFunction(true, response.data)
				}else{
					returnFunction(false, response.data)
				}
			})
		}catch{

			returnFunction(false, ['unknownIssue'])
		}
}



export const removeFile = (method : string, data : any, type : string, returnFunction : (success : boolean, returnData? : any[]) => void) => {
		let item = {'dataType' : data['image_data']['dataType'], 'url' : data['image_data']['url']}
		let body =  JSON.stringify(item);

		let axiosConfig = {
		  headers: {
		      'Content-Type': 'application/json',
		      "Access-Control-Allow-Origin": "*",
		  }
		};

		var postMethod = process.env.REACT_APP_API_URL + '/' + method + ':' + type;
		try{
			axios.post(postMethod, body, axiosConfig)
			.then(response =>{

				if(response.status === 200){
					returnFunction(true, response.data)
				}else{
					returnFunction(false, [response.status])
				}
			})
			}
		catch{
			returnFunction(false, ['unknownIssue'])
		}

}

export const postImage = (method : string, data : any, type : string, returnFunction : (success : boolean, returnData? : any[]) => void) => {
		const fd = new FormData();
		fd.append('file', data.file)
		var postMethod = process.env.REACT_APP_API_URL + '/' + method + ':' + type;
		try{
			axios.post(postMethod, fd)
			.then(response =>{
				if(response.status === 200){
					returnFunction(true, response.data)
				}else{
					returnFunction(false, [response.status])
				}
			})
			}
		catch{
			returnFunction(false, ['unknownIssue'])
		}

	}

export const formatSubmissionData = (data: any, update? : boolean) => {
	const returnDataType = (dataType : string ) => {
		switch(dataType){
			case 'dropdown-text':
				return 'string'
			default:
				return dataType
		}
	}
	let returnDataObj : any = {}
	let dataArray = Object.keys(data)
	for(let i in dataArray){
		if(data[dataArray[i]]['type'] !== 'image' && data[dataArray[i]]['value'] !== undefined && data[dataArray[i]]['edit'] && data[dataArray[i]]['type'] !== 'subObject'){
			returnDataObj[dataArray[i]] = {}
			if(data[dataArray[i]]['type'] === 'yesNo'){
				returnDataObj[dataArray[i]]['value'] = data[dataArray[i]]['value'] === 'Yes'? 1 : 0
			}else{
				returnDataObj[dataArray[i]]['value'] = data[dataArray[i]]['value']
			}
			returnDataObj[dataArray[i]]['type'] = returnDataType(data[dataArray[i]]['type'])
		}
		if(data[dataArray[i]]['type'] === 'subObject'){
			returnDataObj['Variations'] = {'value' : '', type : 'string'}
			let variationValueArr = []
			for(let i in data['Variations']['value']['variationTypes']['value']){
				let obj = data['Variations']['value']['variationTypes']['value'][i]['value']
				variationValueArr.push({'itemTitle' : obj['itemTitle']['value'], 'stock' : obj['stock']['value'], 'price' : obj['price']['value']})
			}
			returnDataObj['Variations']['value'] = JSON.stringify({'Name' : data['Variations']['value']['variationName']['value'], value : variationValueArr})
			returnDataObj['Variations']['value'] = returnDataObj['Variations']['value'].replace(/'/g, "''")
		}if(data[dataArray[i]]['type'] === 'image'){
			returnDataObj['url'] = {}
			try{
				returnDataObj['url']['value'] = data[dataArray[i]]['value']['file']['name'].split('.')[0]
				returnDataObj['url']['type'] = 'string'
			}catch{
				delete returnDataObj['url']
			}

		}
	}
	return returnDataObj
}

export const removeFromCurrent = (itemID : number, currentData : any[] ) => {
	try{
		for(let i in currentData){
			if(currentData[i]['ID'] === itemID){
				let newObj = currentData.splice(Number(i),1)
				break;
			}
		}
		return currentData
	}catch{
		return currentData
	}
}


export const updateCurrentData = (newData : any , itemID : number ,  currentData : any[] ) => {
	try{
		for(let i in currentData){
			if(currentData[i]['ID'] === itemID){
				let newObj = Object.assign({}, currentData[i])
				let fieldArr = Object.keys(newData)
				for(let field in fieldArr){
					newObj[fieldArr[field]] = newData[fieldArr[field]]['value']
				}
				currentData[i] = newObj
				}
			}
		return currentData
	}catch{
		return currentData
	}

}


export const formatContributionData = (productData : any ) => {
	const lossLeaderData = (product : any ): number => {
		let returnItem = Number(product['Price']) - product['EstimatedCost'];
		return returnItem
	}
	let totalAmount : number = 0
	for(let i in productData){
		if(productData[i]['LossLeader'] === 1){
			totalAmount += lossLeaderData(productData[i])
		}else{
			totalAmount += productData[i]['Price'] * (0.01 * productData[i]['PercentageDonated'])
		}

	}
	return totalAmount
}
