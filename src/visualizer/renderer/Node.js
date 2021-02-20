import React, { Component } from "react";
import * as THREE from "three";
import {initializeAllScenes,getScene, deleteAllScenes, updateSceneManager} from './SceneManager'
import {dataPoints} from './data/dataPoints'
import './../visualizer.css';


let framework = {
        initialized : false,
        isPlaying : false,
        paused: false,
        audioStartOffset: 0,
        audioStartTime: 0,
       
        responsiveVisualizerIndex : 0,
        nonResponsiveVisualizerIndex : 0,
        cameraPaused: false,
        automaticSwitchingOn: true,
        breakAnimation  : false,

        //Audio context 
        source : null,
        audioBuffer: null,
        data : null,
        analyserNode : null,

        // Three JS part of the framework
        renderer : null,
        camera: null,
        scene : null,

        //Data Points
        streamData : dataPoints,

    }
let currentVisualizer; 

// This node is where the controler meets the visualizer
export class Node extends Component {
  constructor(props){
    super(props);
    this.state = {
      isPlaying : false
    }
    this.audio = this.props.audio
    this.createScene = this.createScene.bind(this)
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
      framework.analyserNode.smoothingTimeConstant = 0.001


    framework.source = this.props.audioCtx.createMediaElementSource(this.props.audio) 
    framework.source.connect(framework.analyserNode);
    var bufferLength = framework.analyserNode.frequencyBinCount;
    framework.data = new Uint8Array(bufferLength);
    framework.analyserNode.connect(this.props.audioCtx.destination)



    // Initializes 3 JS Stuff
    framework.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    framework.renderer.setSize(window.innerWidth, window.innerHeight);
    framework.renderer.shadowMap.enabled = true;
    framework.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    this.elVisualizer.appendChild(framework.renderer.domElement );
     window.addEventListener('resize', onWindowResize, false);
      initializeAllScenes(framework)
      currentVisualizer = getScene(framework)
      framework.scene = currentVisualizer.scene
      framework.camera = currentVisualizer.camera
      framework.renderer.render(framework.scene, framework.camera );
      switchVisualizers(framework)

      tick()
      function tick() {
        currentVisualizer.onUpdate(framework); // perform any requested updates
        framework.renderer.render(framework.scene, framework.camera); // render the scene
        updateSceneManager(framework)
        if(!framework.breakAnimation){
          requestAnimationFrame(tick); // register to call this again when the browser renders a new frame
        }
    }


  function switchVisualizers(framework) {
    if(!framework.breakAnimation && framework.isPlaying){
      if(framework.streamData.change){
          currentVisualizer = getScene(framework)  
          framework.scene = currentVisualizer.scene  
          framework.camera = currentVisualizer.camera
          framework.streamData.change = false
          setTimeout(() => {
            switchVisualizers(framework)
          }, currentVisualizer.sceneLength)
      }else{
         setTimeout(() => {
            switchVisualizers(framework)
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