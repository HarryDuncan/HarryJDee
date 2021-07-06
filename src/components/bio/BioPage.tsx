import React, {useState, useEffect} from 'react';
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
   height : document.documentElement.clientWidth <= 900 ? '100vh' : '40vh',
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
    'fontSize' : document.documentElement.clientWidth <= 900 ? '1.1em': '1.3em',
	'height' : document.documentElement.clientWidth <= 900 ? '50vh' : '30vh',
  }
}


const stackTokens: IStackTokens = { childrenGap: 0 };

const BioPage: React.FunctionComponent<IBioProps> = (props) => {


	const safeSetBio = (bioData : any) => {
		if(bioData !== null){
			console.log(bioData)
			let newD : any = {}
			try{
					console.log(bioData['Bio']['Content'])
				let content = JSON.parse(bioData['Bio']['Content'])
				console.log(content)
			}catch(err){
				console.log(err)
			}
			finally{
				return bioData['Bio']
			}
			
			
		}else{
			return null
		}
	}
	const [bioContent, setBioContent] = useState(safeSetBio(props.content))

	// When bio data is fetched
	useEffect(() => {
		setBioContent(safeSetBio(props.content))
	}, [props.content])

	// On Mount
	useEffect(() => {
		if(props.content === null){
			props.getContent('_content_table')
		}

	}, [])



	let content1 = "Harry J Dee is a kiwi artist based in Naarm/Melbourne. From a young age Harry dabbled in painting, drawing and sculpture. With fine art fundamentals like chiaroscuro and anatomic realism combined with forced perspective and an artificial colour pallette inspired from street art world he developed his unique style; a bold colour choice, a geometric trompe l'oeil effect and a central figure."
	let content2 = "Harry J Dee is a fresh and exciting up-and-coming DJ. His playful mixing style and track selection encompasses a range of energies from hard and fast, to soft and smooth. Combining the constant force of driving beats to keep people moving while mixing melodies to create the highs and lows Harry J Dee will make sure you leave it all on the dance floor."
	let content3 = "As a professional software engineer, Harry J Dee combines his creative practice with his technical expertise to create magic with interactive art through creative coding and music visualization experiences."
		if(props.content === null){
			return <div/>
		}else{
			// const cardImage = `/images/content/${props.content['Bio']['Asset_URL']}.jpg`	
			return(
				<div className='page'>
					<div className="bio-page">
						<CSSAnimationHook togglerVar={false} animationType={'slideLeft'} isOnScroll={true} >
							<div className={'image-wrapper'}>
								<img src={'/images/content/bio1.jpg'} 
								className={'bio-pic'}
								 />
							</div>
						</CSSAnimationHook>
						
						 <div className={'bio-content-wrapper wrapper-left'}>
						 	<CSSAnimationHook togglerVar={false} animationType={'slideRight'} isOnScroll={true} >
						 		<Stack styles={stackStyles} tokens={stackTokens}>
						 			<Stack.Item align="stretch">
						 				<h1>Artist</h1>
										<DisplayText customStyleObj={customStyles} text={content1}/>
									</Stack.Item>
						
					 				</Stack>
					 		</CSSAnimationHook>
						</div>
						
					</div>
					{
						document.documentElement.clientWidth <= 900?

							<div className="bio-page reverse-flex">
							<CSSAnimationHook togglerVar={false} animationType={'slideRight'} isOnScroll={true} >
								<div className={'image-wrapper'}>
									<img src={'/images/content/DJ.jpg'} 
									className={'bio-pic'}
									 />
								</div>
							</CSSAnimationHook>
							 <div className={'bio-content-wrapper wrapper-right'}>
							 	<CSSAnimationHook togglerVar={false} animationType={'slideLeft'} isOnScroll={true} >
								 	<Stack styles={stackStyles} tokens={stackTokens}>
								 		<Stack.Item align="stretch">
								 			<h1>DJ</h1>
											<DisplayText customStyleObj={customStyles} text={content2}/>
										</Stack.Item>
										
							 		</Stack>
							 	</CSSAnimationHook>
							</div>
							
						</div>
						:
							<div className="bio-page reverse-flex">
								 <div className={'bio-content-wrapper wrapper-right'}>
								 	<CSSAnimationHook togglerVar={false} animationType={'slideLeft'} isOnScroll={true} >
									 	<Stack styles={stackStyles} tokens={stackTokens}>
									 		<Stack.Item align="stretch">
									 			<h1>DJ</h1>
												<DisplayText customStyleObj={customStyles} text={content2}/>
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

					}
				

					<div className="bio-page">
						<CSSAnimationHook togglerVar={false} animationType={'slideLeft'} isOnScroll={true} >
							<div className={'image-wrapper'}>
								<img src={'/images/content/bio3.jpg'} 
								className={'bio-pic'}
								 />
							</div>
						</CSSAnimationHook>
						
						 <div className={'bio-content-wrapper wrapper-left'}>
						 	<CSSAnimationHook togglerVar={false} animationType={'slideRight'} isOnScroll={true} >
						 		<Stack styles={stackStyles} tokens={stackTokens}>
						 			<Stack.Item align="stretch">
						 				<h1>Creative Technologist</h1>
										<DisplayText customStyleObj={customStyles} text={content3}/>
									</Stack.Item>
						
					 				</Stack>
					 		</CSSAnimationHook>
						</div>
						
					</div>
				</div>
				);
	}
} 

const mapStateToProps = (state : any) => ({
	content : state.app.content
});

const mapDispatchToProps = {
	getContent
};

export default connect(mapStateToProps, mapDispatchToProps)(BioPage)
