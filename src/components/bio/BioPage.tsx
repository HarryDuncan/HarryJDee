import React from 'react';
import {connect} from "react-redux";
import {getContent} from './../../store/app/app.actions'
import { Stack, IStackTokens, IStackStyles  ,  ITextFieldStyles} from 'office-ui-fabric-react';
import {DisplayText} from './../ui/customTextField/DisplayText';
import './BioStyles.scss';


interface IBioProps {
	getContent: any;
	content : any;
}

const stackStyles: IStackStyles = {
  root: {
   height : document.documentElement.clientWidth <= 900 ? 'fit-content' : '90vh',
   flexGrow: '100',
  },
};



const customStyles : Partial<ITextFieldStyles> = {
	root : {
		'margin' : 0,
		'padding' : 0,
		
	},
  field : {
    
    'marginTop' : 0,
	'paddingTop' : 0,
	'lineHeight': '120%',
	'letterSpacing': '0.15em',
	'fontWeight' : 500,
    'fontSize' : document.documentElement.clientWidth <= 900 ? '1.4em': '1.2em',
	'height' : document.documentElement.clientWidth <= 900 ? 'fit-content' : '70vh',
  }
}

const stackTokens: IStackTokens = { childrenGap: 0 };

class BioPage extends React.Component<IBioProps>{

	
	public componentDidMount = () => {
		if(this.props.content === null){
			this.props.getContent('_content_table')
		}
	}

	render(){
		if(this.props.content === null){
			return <div/>
		}else{
			const cardImage = `/images/content/${this.props.content['Bio']['Asset_URL']}.jpg`	
			return(
				<div className='page'>
					<div className="bio-page">
						<div className={'image-wrapper'}>
							<img src={cardImage} 
							className={'bio-pic'}
							 />
						</div>
						 <div className={'bio-content-wrapper'}>
						 	<Stack styles={stackStyles} tokens={stackTokens}>
						 		<Stack.Item align="stretch">
									<DisplayText customStyleObj={customStyles} text={this.props.content['Bio']['Content']}/>
								</Stack.Item>
								
					 		</Stack>
						</div>
						
					</div>
				</div>
				);
		}
		
	}
	
} 

const mapStateToProps = (state : any) => ({
	content : state.app.content
});

const mapDispatchToProps = {
	getContent
};

export default connect(mapStateToProps, mapDispatchToProps)(BioPage)
