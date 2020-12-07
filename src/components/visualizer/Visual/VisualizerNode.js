import React, { Component } from "react";
import * as THREE from "three";
import {initializeAllScenes, getSceneByIndex, deleteAllScenes} from './SceneManager'
import {fractionate, modulate, avg, max} from './visualizerFunctions/functions.js';
import './../visualizer.css';


let framework = {
        initialized : false,
        isPlaying : false,
        paused: false,
        audioStartOffset: 0,
        audioStartTime: 0,
       
        visualizerIndex : 0,
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

    }
let currentVisualizer; 
export class VisualizerNode extends Component {
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
      framework.analyserNode.maxDecibels = -50
      framework.analyserNode.minDecibels = -80
      framework.analyserNode.smoothingTimeConstant = 0.001
    // framework.analyserNode = new AnalyserNode(this.props.audioCtx, {
    //     fftSize: 1024,
    //     maxDecibels: -50,
    //     minDecibels: -80,
    //     smoothingTimeConstant: 0.001
    //   });

    framework.source = this.props.audioCtx.createMediaElementSource(this.props.audio) 
    framework.source.connect(framework.analyserNode);
    var bufferLength = framework.analyserNode.frequencyBinCount;
    framework.data = new Uint8Array(bufferLength);
    framework.analyserNode.connect(this.props.audioCtx.destination)
    console.log(framework)
    // Initializes 3 JS Stuff
    
    framework.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    framework.renderer.setSize(window.innerWidth, window.innerHeight);
    framework.renderer.shadowMap.enabled = true;
    framework.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    this.elVisualizer.appendChild(framework.renderer.domElement );
     window.addEventListener('resize', onWindowResize, false);
    initializeAllScenes(framework)
    currentVisualizer = getSceneByIndex(framework.visualizerIndex)
    framework.scene = currentVisualizer.scene
    framework.camera = currentVisualizer.camera
    
    framework.renderer.render(framework.scene, framework.camera );
    switchVisualizers(framework)
    tick()
    function tick() {
      currentVisualizer.onUpdate(framework); // perform any requested updates
      framework.renderer.render(framework.scene, framework.camera); // render the scene
      if(!framework.breakAnimation){
        requestAnimationFrame(tick); // register to call this again when the browser renders a new frame
      }
      
    }


  function switchVisualizers(framework) {
    if(!framework.breakAnimation && framework.isPlaying){
      if(framework.visualizerIndex < 2 ){
         framework.visualizerIndex += 1
       }else{
         framework.visualizerIndex = 0
       }
     currentVisualizer = getSceneByIndex(framework.visualizerIndex)  
      framework.scene = currentVisualizer.scene  
      framework.camera = currentVisualizer.camera

      setTimeout(() => {
        switchVisualizers(framework)
      }, currentVisualizer.sceneLength)
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