import {getData,postData, formatContributionData} from './../mainFunctions'
import {shopActionTypes} from './shop.types'
import {campaignActionTypes} from './../campaign/campaign.types'
import {appActionTypes} from './../app/app.types'
import moment from 'moment'

export const initializeShop = () => {
	return function (dispatch : any) {
		dispatch({type : shopActionTypes.LOAD_SHOP_DATA })

		const returnDataCallback = (success : boolean, items : any[]) => {
			if(success){
				dispatch(
					{type: shopActionTypes.LOAD_SHOP_DATA_SUCCESS, payload: items}
				)
			}else{
				dispatch(
					{type: shopActionTypes.LOAD_SHOP_DATA_ERROR, payload: items}
				)
			}
		} 

		getData('_product_table', '', returnDataCallback)
	}
	
}



export const closeNotification = () => {
	return function(dispatch : any){
		dispatch({type : shopActionTypes.CLOSE_NOTIFICATION})
	}
}
export const addItemToCart = (newItem : any ) => {
	return function(dispatch : any){
		dispatch({ type : shopActionTypes.ADD_TO_CART, payload : newItem})
	}
}

export const removeItemFromCart = (index : number) => {
	return function(dispatch : any){
		dispatch({ type : shopActionTypes.REMOVE_FROM_CART_SUCCESS, payload : index})
	}
}



export const updateInventory = (isOutOfStock?: boolean) => {
	return (dispatch : any, getState : () => any) => {
		dispatch({type : shopActionTypes.UPDATE_INVENTORY})

	

	const returnDataCallback = (success : boolean, items : any[]) => {

			if(success){
				console.log(items)
				dispatch(
					{type: shopActionTypes.UPDATE_INVENTORY_SUCCESS, payload: items, outOfStock : isOutOfStock}
				)
			}else{
				dispatch(
					{type: shopActionTypes.UPDATE_INVENTORY_ERROR, payload: items}
				)
			}
		} 
		console.log(isOutOfStock)
		getData('_product_table', '', returnDataCallback)
	}
}


export const checkout = (token : any, product : any, customerData : any, billingData : any) => {
	return (dispatch : any, getState : () => any) => {
		dispatch({type : shopActionTypes.CHECKOUT})
		

		const returnDataCallback = (success : boolean, items : any[]|undefined) => {
					if(success){
						dispatch(
							{type: shopActionTypes.CHECKOUT_SUCCESS, payload: items, customer : customerData, contribution : contributionData}
						)
					if(getState().campaigns.activeCampaign['Name'] !== 'No Active Campaign'){
						dispatch(
							{type : campaignActionTypes.CONTRIBUTE, payload: contributionData}
							)
					}
						if(items !== undefined){
							dispatch(
							{type : appActionTypes.SAVE_EMAIL, payload : items}
							)

						}
						
					}else{
						if(items !== undefined){
							
							dispatch(
								{type:  shopActionTypes.OUT_OF_STOCK, payload: items}
								)
						}else{
							dispatch(
								{type:  shopActionTypes.CHECKOUT_ERROR, payload: items}
							)
						}
						
					}
				}


		let checkoutData : any = {token, product}
		let orderObj : any = {}
		let cart = getState().shop.cart
		for(let i in cart){
			let itemType = cart[i]['type']
			if(itemType === undefined){
				itemType = null
			}
			let obj : any = {Product : `${cart[i]['Title']}`, Type : itemType, ID : `${cart[i]['ID']}`, Price : `${cart[i]['Price']}`, lossLeader : `${cart[i]['LossLeader']}`, charityPercentage : `${cart[i]['PercentageDonated']}`}
			orderObj[`product ${Number(i)}`] = obj
		}
		let contributionData : any = null
		let address = `${customerData['City']} ${customerData['Address']} ${customerData['State']} ${customerData['ZIP']} ${customerData['Country']}`
		checkoutData['order'] = {'Customer' : {'address' : address.replace(/,/g, ""), 'name' : customerData['Name'], 'email' : customerData['Email'] }, 'Order' : {'value' : JSON.stringify(orderObj)}}
		checkoutData['order']['Order']['value'] = checkoutData['order']['Order']['value'].replace(/'/g, "''")
		checkoutData['order']['id'] = token['id']
		checkoutData['order']['time'] = moment().format('DD MM YYYY hh:mm:ss');
		if(getState().campaigns.activeCampaign['Name'] !== 'No Active Campaign'){
			contributionData = formatContributionData(cart)
			checkoutData['order']['contribution'] = contributionData
			checkoutData['order']['campaignID'] = getState().campaigns.activeCampaign['ID']
		}
		postData('checkout', checkoutData, returnDataCallback)
	}
}

export const toggleCheckoutModal = () => {
	return function(dispatch : any){
		dispatch({ type : shopActionTypes.TOGGLE_CHECKOUT_MODAL})
	}
}