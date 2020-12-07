import React from 'react';
import {HomeScene} from './../../Animations/StaticScenes/HomeScene';
import {connect} from 'react-redux';


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

					<HomeScene />
					
				</div>
			</div>
		);
	}
} 
