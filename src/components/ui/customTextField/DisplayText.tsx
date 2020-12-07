import * as React from 'react';
import {TextField, ITextFieldStyles} from 'office-ui-fabric-react'


const customStyles : Partial<ITextFieldStyles> = {
	root : {
		'margin' : 0,
		'padding' : 0,
    'width' : '100%',
    'height' : 'fit-content',
	},
  field : {
     'fontWeight' : 400,
    'fontSize' : '1.3em',
    'marginTop' : 0,
    'paddingTop' : 0,
    'lineHeight': '120%',
    'letterSpacing': '0.05em',
  }
}


interface IDisplayTextProps {
  text : string
  customStyleObj?: Partial<ITextFieldStyles>;
  
}


// Used for displaying text with line breaks

export const DisplayText: React.FunctionComponent<IDisplayTextProps > = props => {
  return (
      <TextField styles={props.customStyleObj === undefined? customStyles : props.customStyleObj}  value={props.text} borderless={true} readOnly={true} multiline={true} resizable={false} autoAdjustHeight={true}/>
      );
};
