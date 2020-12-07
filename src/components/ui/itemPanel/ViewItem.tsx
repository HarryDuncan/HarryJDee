import React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import './PanelStyles.scss'
import EditItem from './EditItem'
import {connect} from 'react-redux'
import {addItemToCart} from './../../../store/shop/shop.actions'
import {isEmpty} from 'lodash';
import ProductDetailsDiv from './../../shop/ProductDetailsDiv';
import {DisplayText} from './../customTextField/DisplayText'
import { Stack, IStackTokens , IStackStyles,  Link} from 'office-ui-fabric-react';
import { SwipeHandler } from './../../mobile/SwipeHandler';
import {SwipeSignal} from './../../mobile/SwipeSignal';
import {ReactComponent as Left} from './togglers/Left.svg'
import {ReactComponent as Right} from './togglers/Right.svg'
// import {TermsAndConditions} from './../termsAndConditions/TermsAndConditions'
// import hoverEffect from 'hover-effect'

 interface IViewItemProps{
 	ItemObject : any;
 	isEditor : boolean|undefined;
 	isValid : () => void;
 	addItemToCart : any;
 	type?: string;
 	closePanel : () => void;

 	shopArray : any[];
 	galleryArray : any[];

 	activeCampaign : any;
 }

 interface IViewItemState{
 	currentItem : any
 	classNameSide : string;
 	showSwipeSignal : boolean;
 }

const stackStyles: IStackStyles = {
  root: {
  
    width: '100%',
  },
};


const stackTokens: IStackTokens = { childrenGap: 10 };

class ViewItem extends React.Component<IViewItemProps, IViewItemState>{

	constructor(props : IViewItemProps){
		super(props)
		this.state = {
			currentItem : this.props.ItemObject,
			classNameSide: 'slide-right',
			showSwipeSignal : true,
			
		}
	}

	public _hideSwipeSignal = () => {
		this.setState({
			showSwipeSignal : false,
		})
	}

	public renderContent = () =>{
		const isMobile = window.innerWidth <= 900;
		let innerData : JSX.Element = <div/>
		if(this.props.ItemObject.DataType === 'products'){
			innerData = (
				<div className={"view-section-full " + this.state.classNameSide}>
					<div className='image-container'>
						 <img className="ArtWorkImg" src={'/images/'+ this.state.currentItem['DataType'] + '/' + this.state.currentItem['Url'] + '.jpg'} alt={this.state.currentItem.Title} />
					</div>
					<div className="piece-content">
					 <Stack  styles={stackStyles} tokens={stackTokens}>
					 	<Stack.Item align="stretch">
						<h1 className={'product-content-title'}>{this.state.currentItem['Title']}</h1>
						</Stack.Item>
						<Stack.Item align="stretch">
						<DisplayText text={this.state.currentItem.Blurb} />
						
						<Stack.Item align="stretch">
						<ProductDetailsDiv productData={this.state.currentItem} addToCartCB={this.addToCart} />
						</Stack.Item>
						</Stack.Item>
							<Stack.Item align="stretch">
							{
								this.state.currentItem['LossLeader'] === 1?
								<div>
								<span className={'sub-text'}>100% of the profit will be donated to {this.props.activeCampaign['Name']}</span>
								<br/>
								<span className={'sub-text'}>Profit is determined as sale price less the cost of goods, shipping and taxes</span>
								</div>
								:
								
								<span className={'sub-text'}>{this.state.currentItem['PercentageDonated']}% of the sale price will be donated to {this.props.activeCampaign['Name']}</span>
							

							}
						</Stack.Item>
						<Stack.Item align="stretch">
							<span className={'sub-text'}>Prices are inclusive of all taxes and shipping</span>
							
						</Stack.Item>
					 </Stack>
					</div>

				</div>
				)
		}else{
			innerData = (
					<div className={"view-section-full " + this.state.classNameSide} >
						<div className='image-container'>
							 <img className="ArtWorkImg" src={'/images/'+ this.state.currentItem['DataType'] + '/' + this.state.currentItem['Url'] + '.jpg'} alt={this.state.currentItem.Title} />
						</div>
						<div className="piece-content">
						<Stack styles={stackStyles} tokens={stackTokens}>
							<Stack.Item align="stretch">
							<h1 className={'piece-content-title'}>{this.state.currentItem['Title']}</h1>
							</Stack.Item>
							{this.state.currentItem.Blurb !== null?
								<Stack.Item align="stretch">
								<DisplayText text={this.state.currentItem.Blurb} />
								</Stack.Item>
								:
								null
							}
							

							<Stack.Item align="stretch">
							<p className='blurb'>Completed in {this.state.currentItem.PaintingYear}</p>
							</Stack.Item>

							<Stack.Item align="stretch">
							<p className='blurb'>{this.state.currentItem.Medium}</p>
							</Stack.Item>
						</Stack>
						</div>

					</div>
				
				)
		}
		if(isMobile){
			return(
				<div>
				<SwipeHandler childElement={innerData} registerActions={this._swipeAction} hideActionCB={this._hideSwipeSignal} />
				<SwipeSignal show={this.state.showSwipeSignal} />
				</div>
				)
			
		}else{
			return innerData
		}
		
	}
	public render(){
		if(this.props.ItemObject['Title'] === undefined){
			return(<div/>)
		}else if(this.props.isEditor){
			return <EditItem ItemObject={this.props.ItemObject}  closePanelCB={this.props.closePanel} type={this.props.type? this.props.type : ''} isValid={this.props.isValid}/>

		}else{
			let arrType = this.props.galleryArray
			if(this.props.ItemObject.DataType === 'products'){
				arrType = this.props.shopArray
			}
			return(
				 <FocusZone>
					<div className="panelSection" onKeyDown={this.onKeyPressed}>

						<Left className={"scroll-left"} onClick={this._scrollLeft} />
						<Right className={"scroll-right"} onClick={this._scrollRight}/> 
						<div className="cover" />
						<div key={`Product Content Section ${this.state.currentItem['index']}`}>
							{this.renderContent()}
						</div>
					</div>
				 </FocusZone>
				)
			}
			
		}
			

	private _swipeAction = (actionType : string ) => {
		
		if(actionType === 'Left Swipe'){
			this._scrollLeft()
		}else if(actionType === 'Right Swipe'){
			this._scrollRight()
		}
	} 


	private onKeyPressed = (e:any) => { 
		if(e.key === 'ArrowLeft'){
			
			this._scrollLeft()
		}else if(e.key == 'ArrowRight'){
			
			this._scrollRight()
		}
	}


	private _scrollRight = () => {
		let arrType = this.props.galleryArray
		if(this.props.ItemObject.DataType === 'products'){
			arrType = this.props.shopArray
		}
		if(this.state.currentItem['index'] !== arrType.length - 1){
			let newObj = Object.assign({}, arrType[this.state.currentItem['index'] + 1])
			this.setState({
				currentItem : newObj,
				classNameSide : 'slide-right',
			})
		}else{
			let newObj = Object.assign({}, arrType[0])
			this.setState({
				currentItem : newObj,
				classNameSide : 'slide-right',
			})
		}
	}

	private _scrollLeft = () =>{
		let arrType = this.props.galleryArray
		if(this.props.ItemObject.DataType === 'products'){
			arrType = this.props.shopArray
		}
		if(this.state.currentItem['index'] !== 0){
			let newObj = Object.assign({}, arrType[this.state.currentItem['index'] - 1])
			this.setState({
				currentItem : newObj,
				classNameSide : 'slide-left',
			})
		}else{
			console.log(arrType.length)
			let newObj = Object.assign({}, arrType[arrType.length - 1])
			this.setState({
				currentItem : newObj,
				classNameSide : 'slide-left',
			})
		}
		
	}

	private addToCart = (selectedItem : any) =>{
		console.log(selectedItem)
		if(isEmpty(selectedItem)){
			this.props.addItemToCart(this.state.currentItem)
		}else{
			let newCartItemObj: any = Object.assign({}, this.state.currentItem)
			newCartItemObj['Price'] = selectedItem['data']['Price']
			newCartItemObj['stock'] = selectedItem['data']['Stock']
			newCartItemObj['type'] = selectedItem['text']
			this.props.addItemToCart(newCartItemObj)
		}
		
	}
}


const mapStateToProps = (state: any) => ({
	galleryArray : state.art.galleryArray,
	shopArray : state.shop.shopArray,
	activeCampaign : state.campaigns.activeCampaign
})

const mapDispatchToProps = {
	addItemToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewItem)