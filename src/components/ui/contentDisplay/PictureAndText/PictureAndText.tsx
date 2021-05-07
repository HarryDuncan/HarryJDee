import React, { useState } from 'react';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  PrimaryButton,
  Modal,
  IconButton,
  IIconProps,
  Stack,
  IStackTokens,
  Link,
  IButtonStyles,
  Text,
  Label
} from 'office-ui-fabric-react';


interface IPictureAndTextProps{
	text : string;
	imgURl : string;
	styles : any;
	imgSide?: any;
}



const PictureAndTextStyles = {
  root: {
    display: 'flex',
    
  },
  imgWrapper : {
  	imgPic :{
  		height : '80vh',
  		display: 'flex',
  	}
  },
  textWrapper : {
  		maxWidth: '40%',
  		display: 'flex',
  }
  
};


export const PictureAndText : React.FunctionComponent<IPictureAndTextProps> = (props) => {

	// PictureAndTextStyles['root']['flexDirection'] = props.imageSide? 'row' : 'reverse-row' <DisplayText customStyleObj={props.customStyles} text={props.text}/>
	const cardImage = `/images/content/${props.imgURl}`	
	return (
		<div className="content-item">
			<div className={'image-wrapper'}>
				<img src={cardImage} 
				className={'bio-pic'}
				 />
			</div>
			 <div className={'text-content-wrapper'}>
			 	<Stack >
			 		<Stack.Item align="stretch">
						<h1> Hiii</h1>
					</Stack.Item>
		 		</Stack>
			</div>		
		</div>
	  );
}

