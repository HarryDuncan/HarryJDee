import {IShopState, shopActionTypes} from './shop.types';
import update from 'immutability-helper';
import {getFromStorage} from './../../utilities/utilityFunctions'

const initialShopState : IShopState = {
	isLoaded : false,
	checkoutModalShow: false,
	shopArray : [],
	cart :  getFromStorage("HJD_Cart", [], true),
	total : getFromStorage("Cart_Total", 0, true),
	hideCart : false,
	showReceipt: false,
	receiptType : '',
	receiptObject : {contribution : 40,  paidWith : 4242, items : getFromStorage("HJD_Cart", [], true), total : getFromStorage("Cart_Total", 0, true), email : 'h.duncan@live.com'}
}


const getTotal = (updatedCart : any[]) => {
	if(updatedCart.length === 0){
		return 0
	}else{
		let returnPrice : number = 0
		for(let i in updatedCart){
			returnPrice += Number(updatedCart[i]['Price'])
		}

		return returnPrice
	}
}

const removeMissingItems = (cart : any[], conflict : any) => {
	
	return {'currentCart' : cart, 'missingItems' : cart}
}


const updateInventory = (products : any[] , updatedInventory : any) => {
	let inventoryArr = Object.keys(updatedInventory)
	for(let i in products){
		products[i]['Stock'] = updatedInventory[products[i]['ID']]['Stock']
	}
	return products
}

function shop(state: IShopState = initialShopState, action: any){
	let newCart = state.cart
	switch(action.type) {
		case shopActionTypes.LOAD_SHOP_DATA:
			return state;
		case shopActionTypes.LOAD_SHOP_DATA_SUCCESS:
			return update(state, {
				shopArray : {$set : action.payload.data.map((obj : any, i : number) => ({...obj, index : i}))}
			})
		case shopActionTypes.ADD_TO_CART:
			let prodObj : any = action.payload
			prodObj['index'] = state.cart.length
			newCart.push(prodObj)
			sessionStorage.setItem('HJD_Cart', JSON.stringify(newCart));
			sessionStorage.setItem('Cart_Total', JSON.stringify(state.total + Number(prodObj['Price'])))
			return update(state, {
				total : {$set : state.total + Number(prodObj['Price'])},
				cart : {$set :  newCart }
			})
		case shopActionTypes.REMOVE_FROM_CART:
			return update(state, {
				hideCart : {$set: true}
			})
		case shopActionTypes.REMOVE_FROM_CART_SUCCESS:
			newCart.splice(action.payload, 1)
			let hide = false
			if(newCart.length  === 0){
				hide = true
			}
			sessionStorage.setItem('HJD_Cart', JSON.stringify(newCart));
			sessionStorage.setItem('Cart_Total', JSON.stringify(getTotal(newCart)))
			return update(state, {
				cart : {$set : newCart},
				total : {$set : getTotal(newCart)},
				hideCart : {$set: hide}
			})
		case shopActionTypes.CHECKOUT_SUCCESS:
			sessionStorage.setItem('HJD_Cart', JSON.stringify([]));
			sessionStorage.setItem('Cart_Total', JSON.stringify(0));
			let receiptTotal = state.total
			return update(state, {
				shopArray : {$set : updateInventory(state.shopArray, action.payload.updatedInventory)},
				cart : {$set : []},
				total : {$set : 0} ,
				receiptType : {$set : 'Receipt'},
				showReceipt : { $set : true},
				receiptObject : {$set : {contribution : action.contribution, paidWith : 4242, items : newCart, total : receiptTotal, email : action.customer['Email']}}
			})
		case shopActionTypes.UPDATE_INVENTORY_SUCCESS: 
			
			if(action.payload.outOfStock){
				let updatedCart  = removeMissingItems(newCart, action.payload.conflict)
			
				return update(state, {
					shopArray : {$set : action.payload.items.map((obj : any, i : number) => ({...obj, index : i}))},
					showReceipt : { $set : true},
					
					receiptType : {$set : 'Out Of Stock'},
				})
			}
		case shopActionTypes.OUT_OF_STOCK:
			let missingItems : any[] = []
			let updatedCart  = removeMissingItems(newCart, action.payload.conflict)
			sessionStorage.setItem('HJD_Cart', JSON.stringify(newCart));
			sessionStorage.setItem('Cart_Total', JSON.stringify(getTotal(newCart)))
			return update(state, {
				showReceipt : { $set : true},
				receiptType : {$set : 'Out Of Stock'},
				receiptObject : {$set : action.payload.conflict},
				total : {$set : getTotal(newCart)},
				})
		case shopActionTypes.CLOSE_NOTIFICATION:
			return update(state,{
				showReceipt : { $set : false},
				receiptObject : {$set : { paidWith : 0, items : [], total : 0, email : ''}},
			})
		default:
			return state;
	
	}
}

export default shop;

