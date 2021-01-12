import React from 'react';
import {connect} from "react-redux";
import {initializeShop} from './../../store/shop/shop.actions'
import {ItemTile} from './../ui/itemCard/itemCard'
import { ItemPanel} from './../ui/itemPanel/itemPanel'
import Hero from './../ui/hero/Hero'
import './ShopStyles.scss';


interface IShopState {
	viewingPiece : boolean;
	pieceData : any;
}
interface IShopProps {
	initializeShop : any;
	shopArray : any[];

}
class ShopPage extends React.Component<IShopProps, IShopState>{
	constructor(props: IShopProps){
	super(props)
		this.state = {
			viewingPiece : false,
			pieceData : {}
		}
	}

	public componentDidMount = () => {
		if(this.props.shopArray.length === 0){
			this.props.initializeShop()
		}
	}

	public isViewing = (objectData : object|any) => {
		this.setState({
			viewingPiece : true,
			pieceData : objectData
		})
	}
	public closePanel = () => {
		this.setState({
			viewingPiece : false,
			pieceData : {},
		})
	}
	public render(){
		const isMobile = window.innerWidth <= 900;
		let height = '80vh'

		if(this.props.shopArray.length > 3 && this.props.shopArray.length < 6){
				 height = String(this.props.shopArray.length / 2 * 65) +'vh'
			}else if(this.props.shopArray.length > 6){
				 height = String(this.props.shopArray.length / 3 * 65) +'vh'
			}
		if(isMobile){
			height = String(this.props.shopArray.length * 80) +'vh'
		}
		return(
			<div className='page'>
				<div className="shop-wrapper">
					<Hero dismissable={true} message={'All prices include taxes and GST. Free shipping world wide.'} showLinks={false}/>

				{
					this.props.shopArray.length > 0?
						<div className="shopSection" style={{'height' : height}}>

								{this.props.shopArray.map(item => (<ItemTile onClickCallback={this.isViewing} itemProps={item} key={`Shop Item ${item['ID']}`}/> ))}
						</div>
							:
						<div className="shopSection">	

							<Hero dismissable={false} message={'Products are coming soon. head to instagram to keep up to date with the latest releases.'} showLinks={true}/>
						</div>
					}
				</div>
				<ItemPanel isOpen={this.state.viewingPiece} item={this.state.pieceData} closeCallback={this.closePanel} />
			</div>
			);
	}
} 

const mapStateToProps = (state: any) => ({
  shopArray : state.shop.shopArray
})
 
const mapDispatchToProps = {
	initializeShop,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
