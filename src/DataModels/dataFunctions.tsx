import {formatOrderDetails, _reformatVariation} from './dataModels'

//Returns variation strings into an array of objects
export const createTypes = (dataValue : string) => {
	let variationTypes = JSON.stringify(dataValue)
	return variationTypes
}
export const convertToBoolean = (dataValue : number) => {
	return (dataValue === 1 ? 'Yes' : 'No')
}

export const performMapping = (returnData : any , fieldsArr : string[], onOff : boolean) =>{
	for(let i in fieldsArr){
		returnData[fieldsArr[i]]['display'] = onOff
	}
	return returnData 
}


export const formatRawData = (rawData : any, scaffold : any) => {
	let returnObj : any = {}
	let scaffoldArr = Object.keys(scaffold)
	for(let i in scaffoldArr){
		returnObj[scaffoldArr[i]] = scaffold[scaffoldArr[i]]
		switch(returnObj[scaffoldArr[i]]['type']){
			case 'types':
				returnObj[scaffoldArr[i]]['value'] = createTypes(rawData[scaffoldArr[i]])
				break;
			case 'boolean':
			case 'yesNo':
				returnObj[scaffoldArr[i]]['value'] = convertToBoolean(rawData[scaffoldArr[i]])
				break;
			case 'image':
			 	returnObj[scaffoldArr[i]]['value'] = '/images/'+ rawData['DataType'] + '/' + rawData['Url'] + '.jpg'
				returnObj['originalValue'] = {'value' :  rawData['url'], 'display' : false}
				break;
			case 'orderData': 
				returnObj[scaffoldArr[i]]['value'] = formatOrderDetails(rawData[scaffoldArr[i]])
				break;
			case 'externalLinks':
				if(rawData[scaffoldArr[i]] !== null){
					returnObj[scaffoldArr[i]]['value'] = JSON.parse(rawData[scaffoldArr[i]])
				}else{
					returnObj[scaffoldArr[i]]['value'] = null
				}
				
				break;
			case 'subObject':
				if(rawData[scaffoldArr[i]] !== undefined &&  rawData[scaffoldArr[i]] !== null){
					if(scaffoldArr[i] === 'Variations'){
						returnObj[scaffoldArr[i]]['value'] = _reformatVariation(JSON.parse(rawData[scaffoldArr[i]]))
					}else{
						returnObj[scaffoldArr[i]]['value'] = JSON.parse(rawData[scaffoldArr[i]])
					}
				}
				break
			default:
				if(rawData[scaffoldArr[i]] === null){
					returnObj[scaffoldArr[i]]['value'] = ''
				}else{
					returnObj[scaffoldArr[i]]['value'] = rawData[scaffoldArr[i]]
				}
				
		}
		
		
	}
	if(returnObj['HasVariations']){
		 if(returnObj['HasVariations']['value'] === 'Yes'){
			returnObj = performMapping(returnObj, ['Price', 'Stock'], false)
			returnObj = performMapping(returnObj, ['Variations'], true)
		}else{
			returnObj = performMapping(returnObj, ['Price', 'Stock'], true)
			returnObj = performMapping(returnObj, ['Variations'], false)
		}
	}
	return returnObj
}




export const formatDataToMixes = (data : any[]) => {
	
	
	for(let i in data){
		
		data[i]['DataType'] = 'hjdmix'
		
	}
	
	return data
}

export const formatDataToContent = (data : any[]) => {
	let returnArr = []
	for(let i in data){
		switch(data[i]['Title']){
			case 'Bio':
				data[i]['Url'] = data[i]['Asset_URL']
				data[i]['DataType'] = 'content'
				returnArr.push(data[i])
				break;
			default:
				break;
		}
	}
	return returnArr
}