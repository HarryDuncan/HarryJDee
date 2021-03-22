import React, { Component } from "react";
import * as THREE from "three";
import {initializeAllScenes,getScene, deleteAllScenes, updateSceneManager} from './SceneManager'
import {dataPoints} from './data/dataPoints'
import './../visualizer.css';
import {changeToLight} from '../../store/app/app.actions';
import framework from './data/Framework'
import {connect} from 'react-redux'

let currentVisualizer; 

// This node is where the controler meets the visualizer
class Node extends Component {
  constructor(props){
    super(props);
    this.state = {
      isPlaying : false
    }
    this.audio = this.props.audio
    this.createScene = this.createScene.bind(this)
    this.dispatchFunctions = this.dispatchFunctions.bind(this)
  }

  createScene(){
    framework.breakAnimation = false

    // Creates Analyzer Nodes to analyze audio data ----- Audio Context stuff
      framework.isPlaying = true
      framework.initialized = true

       framework.analyserNode= this.props.audioCtx.createAnalyser()
      framework.analyserNode.fftSize =  1024
      framework.analyserNode.maxDecibels = 50
      framework.analyserNode.minDecibels = -80
      framework.analyserNode.smoothingTimeConstant = 0.01


    framework.source = this.props.audioCtx.createMediaElementSource(this.props.audio) 
    framework.source.connect(framework.analyserNode);
    var bufferLength = framework.analyserNode.frequencyBinCount;
    framework.data = new Uint8Array(bufferLength);
    framework.analyserNode.connect(this.props.audioCtx.destination)



    // Initializes 3 JS Stuff
    framework.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    framework.renderer.setSize(window.innerWidth, window.innerHeight);

    // framework.renderer.outputEncoding = THREE.sRGBEncoding;
    framework.renderer.shadowMap.enabled = true;
    framework.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    this.elVisualizer.appendChild(framework.renderer.domElement );
     window.addEventListener('resize', onWindowResize, false);
      initializeAllScenes(framework)
      currentVisualizer = getScene(framework)
      framework.scene = currentVisualizer.scene
      framework.camera = currentVisualizer.camera
      framework.renderer.render(framework.scene, framework.camera );
      switchVisualizers(framework, this.dispatchFunctions)

      tick()
      function tick() {
        currentVisualizer.onUpdate(framework); // perform any requested updates
        framework.renderer.render(framework.scene, framework.camera); // render the scene
        updateSceneManager(framework)
        if(!framework.breakAnimation){
          requestAnimationFrame(tick); // register to call this again when the browser renders a new frame
        }
    }


  function switchVisualizers(framework, dispatchFunctions) {
    if(!framework.breakAnimation && framework.isPlaying){
      if(framework.streamData.change){
          currentVisualizer = getScene(framework)
          framework.scene = currentVisualizer.scene
          framework.camera = currentVisualizer.camera
          framework.streamData.change = false
          dispatchFunctions(currentVisualizer)
         
          setTimeout(() => {
            switchVisualizers(framework, dispatchFunctions)
          }, currentVisualizer.sceneLength)
      }else{
         setTimeout(() => {
            switchVisualizers(framework, dispatchFunctions)
          }, 10)
      }
    }
  }



  function onWindowResize() {
        framework.camera.aspect = window.innerWidth / window.innerHeight;
        framework.camera.updateProjectionMatrix();
        framework.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  
  }


// Functions if we need to update app state while visualizer is playing
dispatchFunctions(data){
  // TODO - Change Seeker and logo from light to dark depending on bg 
  if(data['backgroundDark'] === true){
    this.props.changeToLight(true)
  }else{

    this.props.changeToLight(false)
  }
// TODO - Warning message if CPU usage is too high
// TODO - Get track playing

}

componentWillUnmount(){
    framework.breakAnimation = true
    if(framework.renderer !== undefined && framework.renderer !== null){
      framework.renderer.dispose()
    }
    deleteAllScenes() 
    this.props.audio.pause()
    window.removeEventListener('resize', this.handleResize, false)
  }


  togglePlaying = () => {
    framework.isPlaying = !framework.isPlaying
  }
 




 render() {
   if(this.props.playerState.playStarted && !framework.isPlaying && this.props.audio !== undefined){
      framework.isPlaying = true
      this.createScene();
     
    }else if(!this.props.playerState.playStarted && framework.isPlaying){
       framework.isPlaying = false
    }
    return (
        <div className={'visualizer-node-full'} 
          ref={thisNode => this.elVisualizer=thisNode}>
      </div>  
    )
  }

}

const mapDispatchToProps = {
  changeToLight,
}

export default connect(null, mapDispatchToProps)(Node)

