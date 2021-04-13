import React from 'react';
import './PanelStyles.scss'
import {connect} from 'react-redux';
import {submitData} from './../../../store/dashboard/dashboard.actions'
import { DefaultButton, TextField, PrimaryButton} from 'office-ui-fabric-react'
import {dataScaffold, performMappingOnForm, addNewVariation, removeVariation} from './../../../data'
import {validateData} from './../../../utilities/utilityFunctions'
import {FormPageSection} from './../formComponent/FormComponent';
import {cloneDeep} from 'lodash';

 interface IAddItemProps{
 	ItemObject : any;
 	isValidCallback : ()=> void;
 	submitData : any;
 	type: string;
 	closeCallback : () => void;
 }

 interface IAddItemState{
 	data : {};
 	formValid : boolean;
 }

class AddItem extends React.Component<IAddItemProps, IAddItemState>{
	constructor(props : IAddItemProps){
		super(props)

		this.state = {
			data : dataScaffold[this.props.type],
			formValid : false,
		}
	}

	public createForm = () => {
		let fieldArray : string[] = Object.keys(dataScaffold[this.props.type])
		return(
			<div>
				{fieldArray.map((item => <FormPageSection fieldName={item} fieldItem={dataScaffold[this.props.type][item]} callbackNested={this._updateNested} callback={this._updateData} key={`FieldTYPE ${item}`}/>))}
			</div>
			)

	}
	  public submit = () => {
    		this.props.submitData(this.state.data, this.props.ItemObject['contentType'], this.onDismiss)
  		}

  	 public onDismiss = () => {
	   if(this.props.closeCallback){
	       this.props.closeCallback()
	    }
	    
	  }

		public render(){
		let formData = this.createForm()
		if(this.props.ItemObject['Title'] === undefined){
			return(<div/>)
		}else{
			
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
		            <PrimaryButton disabled={!this.state.formValid} onClick={this.submit} >
		              Submit
		              </PrimaryButton>
		            <DefaultButton onClick={this.onDismiss}>Cancel</DefaultButton>
		          </div>
				</div>
				)
			}
			
		}

	private _updateNested = (fieldName: string, index : number|undefined, nestingDepth : number) =>{
		let updatedDataObj : any = Object.assign({}, this.state.data)
		switch(fieldName){
			case 'variationAdd':
				updatedDataObj = addNewVariation(updatedDataObj)
				break;
			case 'removeVariation':
				case 'Variation':
				updatedDataObj = removeVariation(updatedDataObj, index)
				break;
			case 'variationName':
				console.log(updatedDataObj)
				console.log(fieldName)
				console.log(index)
				updatedDataObj['Variations']['value']['variationName']['value'] = index
				break;
			default:
				updatedDataObj['Variations']['value']['variationTypes']['value'][nestingDepth]['value'][fieldName]['value'] = index
				break;
		}
		this.setState({
			data : updatedDataObj
		})
		console.log(updatedDataObj)
	}
	private _updateData = (fieldName : string, value : any) => {
		let updatedDataObj : any = Object.assign({}, this.state.data)
		updatedDataObj[fieldName]['value'] = value
		updatedDataObj = performMappingOnForm(updatedDataObj)
		let valid = validateData(updatedDataObj)
		if(valid !== this.state.formValid){
			this.props.isValidCallback()
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
	submitData
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)