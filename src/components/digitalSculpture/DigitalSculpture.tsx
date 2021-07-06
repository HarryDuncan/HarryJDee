import React from 'react';
import {AnimationWidget} from './../animationWidget'
import {connect} from 'react-redux';
// import {HomeScene} from './../../animations/staticScenes/HomeScene';

// import {VidScene} from './../../animations/staticScenes/VideoPlayer';

interface IHomePageProps{

}
interface IHomePageState{
	
}

export const  DigitalSculpture: React.FunctionComponent<IHomePageProps> = (props) => {
	

		return(
			<div>
				<div style={{'height': '100vh', 'width': '100vw', 'overflow':'hidden', 'cursor' : 'none'}}>
					<AnimationWidget scenes={['SpinningHaring','ArtLavaLamp', 'HomeScene']} />
				</div>
			</div>
		);
	
} 
