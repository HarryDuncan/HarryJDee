import React from 'react';
import {AnimationWidget} from './../animationWidget'
import {connect} from 'react-redux';
// import {HomeScene} from './../../animations/staticScenes/HomeScene';

// import {VidScene} from './../../animations/staticScenes/VideoPlayer';

interface IHomePageProps{

}
interface IHomePageState{
	
}

export class HomePage extends React.Component<IHomePageProps, IHomePageState>{
	constructor(props: IHomePageProps){
	super(props)
		this.state = {
		}
	}
	
	render(){
		return(
			<div>
				<div style={{'height': '100vh', 'width': '100vw', 'overflow':'hidden'}}>
					<AnimationWidget scenes={['ArtLavaLamp', 'HomeScene']} />
				</div>
			</div>
		);
	}
} 
