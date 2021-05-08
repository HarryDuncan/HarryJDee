import React from 'react';
import {connect} from "react-redux";
import {getContent} from './../../store/app/app.actions'
import { Stack, IStackTokens, IStackStyles  ,  ITextFieldStyles} from 'office-ui-fabric-react';
import {DisplayText} from './../ui/customTextField/DisplayText';
import {CSSAnimationHook} from 'components/ui';
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
						<CSSAnimationHook togglerVar={false} animationType={'slideLeft'} isOnScroll={true} >
							<div className={'image-wrapper'}>
								<img src={cardImage} 
								className={'bio-pic'}
								 />
							</div>
						</CSSAnimationHook>

						
						 <div className={'bio-content-wrapper'}>
						 	<CSSAnimationHook togglerVar={false} animationType={'slideRight'} isOnScroll={true} >
						 		<Stack styles={stackStyles} tokens={stackTokens}>
						 			<Stack.Item align="stretch">
										<DisplayText customStyleObj={customStyles} text={this.props.content['Bio']['Content']}/>
									</Stack.Item>
						
					 				</Stack>
					 		</CSSAnimationHook>
						</div>
						
					</div>
					
					<div className="bio-page">
						 <div className={'bio-content-wrapper'}>
						 	<CSSAnimationHook togglerVar={false} animationType={'slideLeft'} isOnScroll={true} >
							 	<Stack styles={stackStyles} tokens={stackTokens}>
							 		<Stack.Item align="stretch">
										<DisplayText customStyleObj={customStyles} text={this.props.content['Bio']['Content']}/>
									</Stack.Item>
									
						 		</Stack>
						 	</CSSAnimationHook>
						</div>
						<CSSAnimationHook togglerVar={false} animationType={'slideRight'} isOnScroll={true} >
							<div className={'image-wrapper'}>
								<img src={'/images/content/DJ.jpg'} 
								className={'bio-pic'}
								 />
							</div>
						</CSSAnimationHook>
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
