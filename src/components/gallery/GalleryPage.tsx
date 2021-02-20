import React from 'react';
import {connect} from "react-redux";
import {initializeGallery} from './../../store/art/art.actions'
import {ItemTile} from './../ui/itemCard/itemCard';
import { ItemPanel} from './../ui/itemPanel/itemPanel';
// import {Gallery3D} from './Gallery3D' 	 <Gallery3D items={this.props.galleryArray} key={`3d ${this.props.galleryArray.length}`}/>
import './galleryStyles.scss';


interface IGalleryState {
	viewingPiece : boolean;
	pieceData : any;
}
interface IGalleryProps {
	initializeGallery : any;
	galleryArray : any[];

}
class GalleryPage extends React.Component<IGalleryProps, IGalleryState>{
	constructor(props: IGalleryProps){
	super(props)
		this.state = {
			viewingPiece : false,
			pieceData : {}
		}
	}

	public componentDidMount = () => {
		if(this.props.galleryArray.length === 0){
			this.props.initializeGallery()
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
			let height = '100vh'
			if(this.props.galleryArray.length > 3 && this.props.galleryArray.length < 6){
				 height = String(this.props.galleryArray.length / 2 * 45) +'vh'
			}else if(this.props.galleryArray.length > 6){
				 height = String(this.props.galleryArray.length / 3 * 45) +'vh'
			}
			if(isMobile){
				height = String(this.props.galleryArray.length * 70) +'vh'
			}
			return(
			<div className='page'>
				<div className="gallerySection" style={{'height' : height}}>
					{this.props.galleryArray.map(item => (<ItemTile onClickCallback={this.isViewing} itemProps={item} key={`Gallery Item ${item['ID']}`}/> ))}
				</div>
			
				<ItemPanel isOpen={this.state.viewingPiece} item={this.state.pieceData} closeCallback={this.closePanel} />
			</div>
			);
		

		
		
	}
} 

const mapStateToProps = (state: any) => ({
  galleryArray : state.art.galleryArray
})
 
const mapDispatchToProps = {
	initializeGallery,
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage);
