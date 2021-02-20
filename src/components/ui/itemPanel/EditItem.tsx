import React from 'react';
import './PanelStyles.scss'
import AddItem from './AddItem'
import {connect} from 'react-redux';
import { DefaultButton, TextField} from 'office-ui-fabric-react';
import {validateData} from './../../../utilities/utilityFunctions';
import {FormPageSection} from './../formComponent/FormComponent';
import { PrimaryButton} from 'office-ui-fabric-react';
import {formatRawData, dataScaffold,  addNewVariation, removeVariation, bioData, performMappingOnForm,CampaignItem} from './../../../data';
import {updateData, deleteData} from './../../../store/dashboard/dashboard.actions';
import {CustomDialog} from './../customDialog/CustomDialog';

 interface IEditItemProps{
 	ItemObject : any;
 	isValid : () => void;
 	type: string;
 	updateData : any;
 	closePanelCB : any;
 	deleteData : any;

 }

 interface IEditItemState{
 	data : any;
 	changeFields : any;
 	formValid : boolean;
 }

const getScaffold = (type : string) =>{
	console.log(type)
	if(type === 'content'){
		return bioData
	}else if( type === 'campaigns'){
		return CampaignItem
	}else{
		return dataScaffold[type]
	}
}
class EditItem extends React.Component<IEditItemProps, IEditItemState>{
	constructor(props : IEditItemProps){
		super(props)

		this.state = {
			changeFields : {},
			data :  formatRawData(this.props.ItemObject, getScaffold(this.props.type)),
			formValid : false
		}
	}

	public createForm = (type : string) => {
		let fieldArray : string[] = Object.keys(this.state.data)
		return(
			<div>
				{fieldArray.map((item => <FormPageSection fieldName={item} fieldItem={this.state.data[item]}  callbackNested={this._updateNested} callback={this._updateData} key={`FieldTYPE ${item}` } />))}
			</div>
	)}

	public render(){
		if(this.props.ItemObject['Title'] === undefined){
			return(<div/>)
		}else if(this.props.ItemObject['Title'] === "Add New"){
			return (<AddItem closeCallback={this.props.closePanelCB} ItemObject={this.props.ItemObject} type={this.props.type} isValidCallback={this.props.isValid}/>)
		}else{
			let formData = this.props.type ? this.createForm(this.props.type) : <div/>
			return(
				<div className="panelSection">
					<div className="cover" />
					<div className="viewSection">
					<div className='imageContainer'>
					</div>
						<div className="PieceContent">
						{formData}
						</div>
					</div>
					<div className='panel-footer'>
		            <PrimaryButton disabled={!this.state.formValid} onClick={this._updateObj} >
		             	Update
		              </PrimaryButton>
		            <CustomDialog 
		            	btnTxt={'Delete'}
		            	label={'Delete'} 
		            	description={'Are you sure you want to delete this item?'}
		            	primaryButtonTxt={'Delete Item'}
						primaryButtonCallback={this._delete}
						secondaryButtonTxt={'Cancel'}
		            	/>
		            <DefaultButton onClick={this._closePanel}>Cancel</DefaultButton>
		          </div>
				</div>
				)
			}
			
		}
		

	private _updateObj = () => {
		this.props.updateData(this.state.data, undefined, this._closePanel)
	}

	private _updateNested = (fieldName: string, index : number|undefined, nestingDepth : number) =>{
		let updatedDataObj : any = Object.assign({}, this.state.data)
		switch(fieldName){
			case 'variationAdd':
				updatedDataObj = addNewVariation(updatedDataObj)
				break;
			case 'Variation':
				updatedDataObj = removeVariation(updatedDataObj, index)
				break;
			case 'variationName':
				updatedDataObj['variations']['value']['variationName']['value'] = index
				break;
			default:
				updatedDataObj['variations']['value']['variationTypes']['value'][nestingDepth]['value'][fieldName]['value'] = index
				break;
		}
		let valid = validateData(updatedDataObj)
		if(valid !== this.state.formValid){
			this.props.isValid()
		}
		this.setState({
			data : updatedDataObj,
			formValid : valid
		})
	}

	private _delete = () => {
		this.props.deleteData(this.state.data, undefined, this._closePanel)
	}

	private _closePanel = (e?: any) => {
		this.props.closePanelCB() 
	}
	private _updateData = (fieldName : string, value : any) => {
		let updatedDataObj : any = Object.assign({}, this.state.data)
		let changeFields : any = Object.assign({}, this.state.changeFields)
		updatedDataObj[fieldName]['value'] = value
		updatedDataObj = performMappingOnForm(updatedDataObj)
		let valid = validateData(updatedDataObj)
		if(valid !== this.state.formValid){
			this.props.isValid()
		}
		this.setState({
			data : updatedDataObj,
			formValid : valid
		})
	}			

}

const mapStateToProps = (state : any) => ({

})

const mapDispatchToProps = {
	updateData,
	deleteData,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItem)