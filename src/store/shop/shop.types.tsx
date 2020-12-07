export interface IShopState{
	isLoaded : boolean;
	checkoutModalShow : boolean;
	shopArray: object[];
	cart : object[];
	total : number;
	hideCart : boolean;
	showReceipt: boolean;
	receiptType : string;
	receiptObject : IReceiptObject;
}
export interface IReceiptObject {

	items : any[];
	total : number;
	email : string;
	paidWith : number;
	contribution? : number
}
export enum shopActionTypes {
	LOAD_SHOP_DATA = 'shop/LOAD_SHOP_DATA',
	LOAD_SHOP_DATA_SUCCESS = 'shop/LOAD_SHOP_DATA_SUCCESS',
	LOAD_SHOP_DATA_ERROR = 'shop/LOAD_SHOP_DATA_ERROR',


	ADD_TO_CART = 'shop/ADD_TO_CART',

	REMOVE_FROM_CART = 'shop/REMOVE_FROM_CART',
	REMOVE_FROM_CART_SUCCESS = 'shop/REMOVE_FROM_CART_SUCCESS',

	CHECKOUT = 'shop/CHECKOUT',
	CHECKOUT_SUCCESS = 'shop/CHECKOUT_SUCCESS',
	CHECKOUT_ERROR = 'shop/CHECKOUT_ERROR',
	OUT_OF_STOCK = 'shop/OUT_OF_STOCK',
	
	TOGGLE_CHECKOUT_MODAL = 'shop/TOGGLE_CHECKOUT_MODAL',

	CLOSE_NOTIFICATION = 'shop/CLOSE_NOTIFICATION',

	UPDATE_INVENTORY = 'shop/UPDATE_INVENTORY',
	UPDATE_INVENTORY_SUCCESS = 'shop/UPDATE_INVENTORY_SUCCESS',
	UPDATE_INVENTORY_ERROR = 'shop/UPDATE_INVENTORY_ERROR'
}