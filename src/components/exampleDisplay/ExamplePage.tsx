import React from 'react';
import {CameraRoot} from './../../animations/cameraScenes/CameraRoot';
import {MotionDetectorRoot} from './../../animations/cameraScenes/MotionDetectorRoot';

interface IExampleProps {
	getContent?: any;
	content ?: any;
}



export class ExamplePage extends React.Component<IExampleProps>{

	


	render(){
			
			return(
				<div className='page'>
					<h1>Example 1</h1>
					<p>This is an example of visualizers from a web cam input</p>
					<CameraRoot />
					<h1>Example 2</h1>
					<p>This is an example of visualizers from a web cam input that has motion detection</p>
					 <MotionDetectorRoot/>
				</div>
				);
		}
		
	
	
} 


