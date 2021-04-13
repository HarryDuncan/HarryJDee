import * as Scenes from './visualizerScenes';
import {getDataPoints, sceneScaffold} from './functions';

let allScenes = {'responsive' : [], 'nonResponsive' : []};
let currentVisualizer;


// Function to initialize all scenes
// TODO - Make promise then start playback when all items are loaded
export const initializeAllScenes = (framework) =>{
   
    allScenes.responsive.push(Scenes.BallAndPlane(framework))
    allScenes.responsive.push(Scenes.DancingBlocks(framework))
    allScenes.responsive.push(Scenes.MagicBlobs(framework))
    allScenes.responsive.push(Scenes.BackdropLights(framework))
    // allScenes.responsive.push(Scenes.RotatingCubes(framework))

    allScenes.nonResponsive.push(Scenes.CrazySpiral(framework))
    allScenes.nonResponsive.push(Scenes.StarField(framework))
  

    // Todo - Load Mix Specific scenes
   // allScenes.push(Scenes.CubeWithTexture(framework))]
  for(let i = 0; i < allScenes.responsive.length -1; i++) {
      allScenes.responsive[i].index = i
    }
  for (let i = 0; i < allScenes.length -1; i++) {
      allScenes.nonResponsive[i].index = i;
  }
    
}

export const getScene = (framework) => {
    switch(framework.streamData.shouldPlay){
      case 'nonResponsive':
        framework.nonResponsiveVisualizerIndex = updateIncrement(framework.nonResponsiveVisualizerIndex, allScenes.nonResponsive)
        return allScenes.nonResponsive[framework.nonResponsiveVisualizerIndex]
      case 'responsive':
        framework.responsiveVisualizerIndex = updateIncrement(framework.responsiveVisualizerIndex, allScenes.responsive)
        return allScenes.responsive[framework.responsiveVisualizerIndex]
      //  return allScenes.responsive[4]

    }
}


export const updateSceneManager = (framework) => {
   getDataPoints(framework) 
}


export const deleteAllScenes = () => {
  allScenes =  {'responsive' : [], 'nonResponsive' : []};
}


const updateIncrement = (frameworkIncrement, scenes) => {
  if(frameworkIncrement + 1 > scenes.length -1){
    return 0
  }else{
    return frameworkIncrement + 1
  }
}



