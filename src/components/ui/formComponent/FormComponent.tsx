import React from 'react';
import {TextField, MaskedTextField, Label, DefaultButton} from 'office-ui-fabric-react'
import {ImageUpload} from './../imageUpload/ImageUpload';
import {CustomDropdown} from './../customDropdown/CustomDropdown';
import {EditExternalLinks} from './../externalLinkWidget/EditExternalLinks';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import './../itemPanel/PanelStyles.scss'
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

const options: IChoiceGroupOption[] = [
  { key: 'Yes', text: 'Yes' },
  { key: 'No', text: 'No' }
];


interface IFormSectionState {
	data : any;
}
interface IFormSectionProps {
	fieldItem : any;
	callback : any;
	fieldName : any;

	//Props for dynamic subcomponents of a form
	index?: number;
	nestedDepth?: number;
	callbackNested? : any;

}

const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 350 } }
  };

export class FormPageSection extends React.Component<IFormSectionProps, IFormSectionState>{
	constructor(props: IFormSectionProps){
	super(props)
		this.state = {
			data : {}
		}
	}

	public imageUploaded = (imageObject : any) => {
		this.props.callback(this.props.fieldName, imageObject)
	}

	public render(){
		if(this.props.index!== undefined){
			this.props.fieldItem['index'] = this.props.index
		}
		if(this.props.nestedDepth === undefined){
			this.props.fieldItem['nestedDepth'] = 0
		}else{
			try{
				this.props.fieldItem['nestedDepth'] = this.props.nestedDepth
			}catch{
				return <h1>{this.props.nestedDepth}</h1>
			}
		}
		if(!this.props.fieldItem['display']){
			return(
				<div style={{'display':'none'}}/>
				)
		}
		let value = this.props.fieldItem['value']
		if(value ===  'Add New'){
			value = "";
		}
		switch(this.props.fieldItem['type']){
			case 'string':
				if(this.props.fieldItem['multiline']){
					return(
						<div className="form-field-section">
					 		<TextField required={this.props.fieldItem['required']} multiline={true} autoAdjustHeight={true} label={this.props.fieldItem['label']} value={value} underlined onChange={this.setData}/>
					 	</div>
						);
				}else{
					return(
						<div className="form-field-section">
					 		<TextField required={this.props.fieldItem['required']} label={this.props.fieldItem['label']} value={value} underlined onChange={this.setData}/>
					 	</div>
						);
				}
			case 'htmlString':
				return (
						<div className="form-field-section">
					 		<TextField required={this.props.fieldItem['required']} multiline={true} autoAdjustHeight={true} label={this.props.fieldItem['label']} value={value} underlined onChange={this.setData}/>
					 	</div>
						);
			case 'int':
				if(this.props.fieldItem['label'] === 'Year Completed'){
					return(
						<div className="form-field-section">
						 	<MaskedTextField required={this.props.fieldItem['required']} mask="9999" value={String(value)} label={this.props.fieldItem['label']} maskChar='' underlined onChange={this.setData}/>
						</div>
					);
				}else if(this.props.fieldItem['label'] === 'Price'){
					return(
						<div className="form-field-section">
						 	<MaskedTextField required={this.props.fieldItem['required']} mask="9999999" value={String(value)} label={this.props.fieldItem['label']} maskChar='' underlined onChange={this.setData}/>
						</div>
					);
				}else{
					return(
						<div className="form-field-section">
						 	<MaskedTextField required={this.props.fieldItem['required']} mask="9999999" value={String(value)} label={this.props.fieldItem['label']} maskChar='' underlined onChange={this.setData}/>
						</div>
					);
				}
			case 'orderData':
				let productsArr : string[] = Object.keys(this.props.fieldItem['value'])
				return(
					<div>
						<Label>Order Details</Label>
						<ul>
							{productsArr.map((item => <li>{this.props.fieldItem['value'][item]['Product']} {this.props.fieldItem['value'][item]['Type']}</li>))}
						</ul>
					</div>
					)
			case 'subObject':
				if(this.props.fieldItem['value'].length === 0){
					return(
						<div className="form-field-section">
						 	<h1>Variations</h1>
						</div>
						)
				}else{
					let subArray : string[] = Object.keys(this.props.fieldItem['value'])
					return(
						<div>
							<div className={this.props.nestedDepth !== undefined && this.props.nestedDepth > 1 ? "form-field-section" : 'hide'}>
								<h2 style={{float : 'left'}}>Variation {Number(this.props.index) + 1}</h2>
								<DefaultButton style={{float : 'right', zIndex : 90}} onClick={this._buttonClicked}>Remove Item</DefaultButton>
							</div>
							{subArray.map((item => <FormPageSection fieldName={item} fieldItem={this.props.fieldItem['value'][item]} callbackNested={this.props.callbackNested} nestedDepth={this.props.fieldItem['nestedDepth'] + 1} callback={this._changeNested} key={`Inner type ${item}`}/>))}
						</div>

					)
				}
			case 'arrayItems':
				let arrayItems : any[] = this.props.fieldItem.value
				return(
						<div>
							{arrayItems.map((item , i)=> <FormPageSection fieldName={'Variation'}  callbackNested={this.props.callbackNested} nestedDepth={this.props.fieldItem['nestedDepth'] + 1}  index={Number(i)} fieldItem={item} callback={this._changeNested} key={`Inner type ${Number(i)}`}/>)}
						</div>
					)
			case 'yesNo':
				return(
					<div className="form-field-section">
						<ChoiceGroup defaultSelectedKey={this.props.fieldItem['value']} options={options} onChange={this._onChange} label={this.props.fieldItem['label']} required={this.props.fieldItem['required']} />
					</div>
					)
			case 'dropdown-text':
				return (
					<div className="form-field-section">
						<CustomDropdown value={this.props.fieldItem['value']} fieldName={this.props.fieldName} options={this.props.fieldItem['options']} callback={this._updateData} label={this.props.fieldItem['label']} required={this.props.fieldItem['required']} />
					</div>
				)
			case 'image':
				return (
					<div className="form-field-section image-section">
						<Stack {...columnProps}>
						<Label required={this.props.fieldItem['required']} >Upload Image</Label>
					 	<ImageUpload onUpload={this.imageUploaded} defaultValue={this.props.fieldItem['value']}/>
					 	</Stack>
					</div>
				)
			case 'function':
				return(
					<div className="form-field-section">
						<DefaultButton onClick={this._buttonClicked}>{this.props.fieldItem['label']}</DefaultButton>
					</div>
					)
			case 'externalLinks':
				return(
					<div className="form-field-section">
						<EditExternalLinks links={this.props.fieldItem['value']}/>
					</div>
					)
			default: 
				return (
					<div>
					 	<h1>Blank</h1>
					</div>
				)
			}
	}

	private _removeSection = (event : any) => {
		if(this.props.callbackNested !== undefined){
			this.props.callbackNested('Remove item' ,Number(this.props.index), this.props.fieldItem['nestedDepth'])
		}
	}

	private _buttonClicked = ( event : any) =>{
		if(this.props.callbackNested !== undefined){
			this.props.callbackNested(this.props.fieldName,this.props.fieldItem['index'], this.props.fieldItem['nestedDepth'])
		}
	}
	private _changeNested = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: any) => {
		
		if(this.props.callbackNested !== undefined){
			this.props.callbackNested(event, newValue,this.props.fieldItem['index'], this.props.fieldItem['nestedDepth'])
		}
	}
	private _onChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: any) => {
  		if(option.key !== undefined){
  			this.props.callback(this.props.fieldName, option.key)
  		}
	}
	private _updateData = (fieldName : string, value : string) => {
		this.props.callback(fieldName, value)
	}

	private setData = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
		this.props.callback(this.props.fieldName, newValue)
	}

} 
