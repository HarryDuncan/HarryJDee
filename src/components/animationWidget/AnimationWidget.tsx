import  React from 'react';
import * as Scenes from '../../animations';
import {IFramework, framework} from './data/Framework';
import * as THREE from "three";
import * as Transitions from '../../animations/transitions'

interface IAnimationWidgetProps{
	scenes : any[];
	// sceneTimeLength : number;
}

interface IAnimationWidgetState{
	manager : IFramework;
	sceneArray : any[];
	transitionArray : any[];
	currentVisual : any;
}




// Scene magager for displaying mutliple scenes in a particular setting
export class AnimationWidget extends React.Component<IAnimationWidgetProps, IAnimationWidgetState> {
	private container : any;
	constructor(props : IAnimationWidgetProps){
	    super(props)
	    this.container = React.createRef()
	    this.state = {
	    	manager : this.initalizeFramework(),
	    	sceneArray : [],
	    	transitionArray : [],
	    	currentVisual : null
	    }


	}
	/*
	************************************
	Used To Initialize the scenes and three JS Stuff
	************************************
	*/


	public initializeScenes = (scenes : any[]) : any[]=> {
		let returnArray :any[] = []
		// returnArray.push(Scenes.SpinningHaring(this.state.manager))
		// returnArray.push(Scenes.RoomAndMirror(this.state.manager))
		// returnArray.push(Scenes.TransLights(this.state.manager))

		returnArray.push(Scenes.HomeScene(this.state.manager))
		returnArray.push(Scenes.ArtLavaLamp(this.state.manager))

		return returnArray
	}

	public initalizeFramework = () => {
		let returnManager : IFramework = framework
		// Initialize Renderer
		returnManager.breakAnimation = false
		returnManager.initialized = true

	    // Initializes 3 JS Stuff
	    returnManager.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	    returnManager.renderer.setSize(window.innerWidth, window.innerHeight);
	    returnManager.renderer.shadowMap.enabled = true;
	    returnManager.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap



		return returnManager
	}



		/*
	************************************
	Managing the renderer
	************************************
	*/
	public componentDidMount = () => {
		let scenes = this.initializeScenes(this.props.scenes)
		this.setState({
			sceneArray : scenes,
			transitionArray : [Transitions.BlackTransition()]
		},  )

		setTimeout(() => {
			this.createScene()
		}, 2000)

	}

	public createScene = () => {
		// @ts-ignore
		let node = this.container.current
		 node.appendChild(this.state.manager.renderer.domElement );
	     // window.addEventListener('resize', onWindowResize, false);

	      let currentVisualizer = this.state.sceneArray[0]
	      this.state.manager.renderer.render(currentVisualizer.scene,  currentVisualizer.camera )
	      this.setState({
	      		manager : {...this.state.manager,  'scene' : currentVisualizer.scene, 'camera' : currentVisualizer.camera, sceneIndex : 0},
	      		currentVisual : currentVisualizer
	      	})



	      // switchVisualizers(framework, this.dispatchFunctions)
	      const tick = () => {

	      	if(this.state.manager.transition){
	      		this.state.currentVisual.onUpdate(this.state.manager); // perform any requested updates
	      		setTimeout(() => {
	      			this.setState({
	      				manager : {...this.state.manager, transition : false}
	      			})
	      		}, 10)

	      	}else{
	      		this.state.currentVisual.onUpdate(this.state.manager); // perform any requested updates
		   	 	this.state.manager.renderer.render(this.state.currentVisual.scene,  this.state.currentVisual.camera )
	      	}

			 if(!this.state.manager.breakAnimation){
			 		if(this.state.manager.changeVisuals === true){

			 			this.changeScene()
			 		}
			       requestAnimationFrame(tick); // register to call this again when the browser renders a new frame
			    }
	    	}
	        tick()

	}

	public changeScene = () => {
		if(!this.state.manager.breakAnimation){
			let index : number = 0;
			if(Number(this.state.manager.sceneIndex) < this.state.sceneArray.length - 1){
				index ++
			}else{
				index = 0
			}
			let currentVisualizer = this.state.sceneArray[index]

			this.state.manager.renderer.render(this.state.transitionArray[0].scene,  this.state.transitionArray[0].camera)
		    this.setState({
		    		currentVisual : currentVisualizer,
		      		manager : {...this.state.manager, reInitScene : true, transition : true, 'scene' : currentVisualizer.scene, 'camera' : currentVisualizer.camera,changeVisuals : false, sceneIndex : index}
		      	})
		   if(currentVisualizer.sceneLength !== undefined){
		   	setTimeout(() => {
		   		this.changeScene()
		   	}, currentVisualizer.sceneLength)
		   }
		}


	}



  public onWindowResize() {
	  	this.setState({
	  		manager : {...this.state.manager, camera : {...this.state.manager.camera, aspect : window.innerWidth / window.innerHeight}}
	  	})
       this.state.manager.camera.updateProjectionMatrix();
       this.state.manager.renderer.setSize(window.innerWidth, window.innerHeight);


    }
	public componentWillUnmount = () => {
		this.setState({
			manager : {...this.state.manager, 'breakAnimation' : true},
			sceneArray : []
		})

	   this.state.manager.renderer.dispose()

	//  deleteAllScenes()
	//  console.log('asdasd')
	//  window.removeEventListener('resize', this.handleResize, false)

	}




	public render(){
		return(
			<div style={{'height': '100vh', 'width': '100vw', 'overflow':'hidden'}}
				ref={this.container}>

			</div>
		);

	}

}
