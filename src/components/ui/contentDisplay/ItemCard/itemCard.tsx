import React from 'react';
import { Card , CardTitle , CardBody, CardSubtitle, CardImg} from 'reactstrap';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import './cardItem.scss';


interface IItemTileState {
	hovered : boolean;
	height : number;
	width: number;
	loaded : boolean;
}
interface IItemTileProps {
	itemProps : any
	isHoverable?: boolean;
	onClickCallback? : any;
}

export class ItemTile extends React.Component<IItemTileProps, IItemTileState>{
	private imgEl : any = React.createRef();
	constructor(props : IItemTileProps){
	super(props);
	this.state = {
		hovered : false,
		loaded : false,
		height: 0,
		width: 0,
		}
	}


	public onHover = (event: any ) => {
		this.setState({
			hovered : true
		})
	}

	public onLeave = (event : any ) => {
		this.setState({
			hovered : false
		})
	}

	public cardClicked = (event : any) => {
		this.props.onClickCallback(this.props.itemProps)
	}

	public _getItemPrice = (item : any) => {
		if(this.props.itemProps['HasVariations']){
			// Get Variation Stock Data
			let variationData = JSON.parse(this.props.itemProps['Variations'])
			
			let minPrice = Number(variationData['value'][0]['price'])
			let maxPrice = Number(variationData['value'][0]['price'])
			for(let i in variationData['value']){
				minPrice = Number(variationData['value'][i]['price']) < minPrice? variationData['value'][i]['price'] : minPrice
				maxPrice = Number(variationData['value'][i]['price']) > maxPrice ? variationData['value'][i]['price'] : maxPrice
			}
			return `AUD $${minPrice} - $${maxPrice}`
		}else{
			if(item['Price'] !== undefined && item['Price'] !== 0){
				return `AUD $${item['Price']}`
			}else{
				return `AUD $0`
			}
		}
	}
	public _isSoldOut = () => {
		if(this.props.itemProps['HasVariations']){
			// Get Variation Stock Data
			let variationData = JSON.parse(this.props.itemProps['Variations'])
			for(let i in variationData['value']){
				if(Number(variationData['value'][i]['stock']) !== 0){
					return false
				}
			}
			return true
		}else{
			if(this.props.itemProps['Stock'] !== undefined && this.props.itemProps['Stock'] <= 0){
				return true
			}else{
				return false
			}
		}
		
	}
	
	public render(){
		let cardImage : any;
		if(this.props.itemProps['DataType'] === undefined || this.props.itemProps['Url'] === undefined){
			cardImage = null
		}else if(this.props.itemProps['DataType'] === 'hjdmix'){
			cardImage = `/${this.props.itemProps['DataType']}/${this.props.itemProps['Url']}.jpg`
		}else{
			cardImage = `/images/${this.props.itemProps['DataType']}/${this.props.itemProps['Url']}.jpg`
		}
		if(this.props.itemProps['DataType'] === 'products'){
			return(
				<div className="cardItem" onClick={this.cardClicked.bind(this)} onMouseLeave={this.onLeave.bind(this)} onMouseOver={this.onHover.bind(this)}>
			      <Card>
			      	{this._isSoldOut() ? 
			      		<div className={'sold-out-div'}><p>Sold Out</p></div>
			      		: 
			      		<div/>
			      	}
			      	{!this.state.loaded ?
			      		<Spinner size={SpinnerSize.medium} />
			      		:
			      		null
			      	}
			      	<img 
			      		className="product-img" 
			      		src={cardImage} 
			      		alt={this.props.itemProps['Title']}
			      		ref={this.imgEl}
	        			onLoad={() => this.setState({height: this.imgEl.current.naturalHeight, width: this.imgEl.current.naturalWidth, loaded : true})} 
	        		 />
	        		<div style={{'display' : 'inline-block', 'background' : 'black', 'width' : '100%'}}>
			          <CardTitle className={'item-title-card'}>{String(this.props.itemProps['Title'])}</CardTitle>
			          <CardSubtitle className={'item-price-card'} >{this._getItemPrice(this.props.itemProps)}</CardSubtitle>
			        </div>
			      </Card>
			     </div>
			);
		}else{
			return(
				<div className="cardItem" onClick={this.cardClicked.bind(this)} onMouseLeave={this.onLeave.bind(this)} onMouseOver={this.onHover.bind(this)}>
			      <Card>
			      	<h1 className={"artTitle " + (this.state.hovered ? "hovered" : "")} >{String(this.props.itemProps['Title'])}</h1>
			      	{!this.state.loaded ?
			      		<Spinner size={SpinnerSize.medium} />
			      		:
			      		null
			      	}
			      	<img 
			      		className="GalleryArtWorkImg" 
			      		src={cardImage} 
			      		alt={this.props.itemProps['Title']}
			      		ref={this.imgEl}
	        			onLoad={() => this.setState({height: this.imgEl.current.naturalHeight, width: this.imgEl.current.naturalWidth, loaded : true})} 
	        		 />
			      </Card>
			     </div>
		      
		
			);
		}
		
	}


}

