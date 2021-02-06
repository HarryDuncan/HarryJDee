// Validates the dataObject
export const validateData = (dataObject : any) => {
	let dataArray = Object.keys(dataObject)
	for(let i in dataArray){
	if(dataArray.hasOwnProperty(i)){
		if((dataObject[dataArray[i]]['value'] === '' || dataObject[dataArray[i]]['value'] === undefined ) && dataObject[dataArray[i]]['required'] && dataObject[dataArray[i]]['display'] !== false){
			return false
			}
		}
	
	}
	return true
}

export const getFromStorage = ( key: string, nullReturnValue : any , parse? : boolean): any =>{
	let localItem = localStorage.getItem(key)
	if(localItem === null){
		return nullReturnValue
	}else{
		if(parse !== undefined){
			return JSON.parse(localItem)
		}else{
			return localItem
		}
		
	}
	
}