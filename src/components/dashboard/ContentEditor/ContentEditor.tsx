import React from 'react';
import {connect} from "react-redux";
import {initializeContentEditor} from './../../../store/dashboard/dashboard.actions'
import {ItemTile} from './../../ui/itemCard/itemCard'
import { ItemPanel} from './../../ui/itemPanel/itemPanel'

interface IContentEditorState {
	viewingItem : boolean;
	itemData : object;
	
}
interface IContentEditorProps {
	type : string;
	dashboardItems : any[];
	dashboardLoading : boolean;
	initializeContentEditor : any;

}
class ContentEditor extends React.Component<IContentEditorProps, IContentEditorState>{
	constructor(props: IContentEditorProps){
	super(props)
		this.state = {
			viewingItem : false,
			itemData : {},
		}
	}

	public componentDidMount = () => {
		this.props.initializeContentEditor(this.props.type)
	}
	

	public isViewing = (objectData : object|any) => {
		this.setState({
			viewingItem : true,
			itemData : objectData
		})
	}

	public closePanel = () => {
		this.setState({
			viewingItem : false,
			itemData : {},
		})
	}


	public render(){
		const isMobile = window.innerWidth <= 900;
		let  editItems = this.props.dashboardItems
		let addItemObj = [{'ID' : -1, 'Title' : 'Add New' , 'DataType' : 'icons', 'Url' : 'add_item_bkEnd', 'contentType' : this.props.type}]
		editItems = addItemObj.concat(editItems)
		let height = '100vh'
		if(editItems.length > 3 && editItems.length < 6){
			 height = String(editItems.length / 2 * 50) +'vh'
		}else if(editItems.length > 6){
			 height = String(editItems.length / 3 * 50) +'vh'
		}
		return(
		<div className='content-page'>
			<div key={`Content ${editItems.length}`} className={'gallerySection'} style={{'height' : height}}>
				{editItems.map(item => (<ItemTile onClickCallback={this.isViewing} itemProps={item} key={`${this.props.type} Dashboard Item ${item['ID']}`}/> ))}
			</div>
			<ItemPanel isOpen={this.state.viewingItem} item={this.state.itemData} closeCallback={this.closePanel} panelType={this.props.type} isEditor={true}/>
		</div>
		);
		
		
	}
} 

const mapStateToProps = (state: any) => ({
 	dashboardItems : state.dashboard.dashboardArray,
 	dashboardLoading : state.dashboard.dashboardLoading
})
 
const mapDispatchToProps = {
	initializeContentEditor
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditor);
