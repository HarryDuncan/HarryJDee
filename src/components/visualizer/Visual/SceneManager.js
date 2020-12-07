import * as Scenes from './../../../Animations/VisualizerScenes/GenericScenes';


let allScenes = [];
let currentVisualizer;


export function initializeAllScenes(framework) {
    allScenes.push(Scenes.BallAndPlane(framework))
    allScenes.push(Scenes.StarField(framework))
    allScenes.push(Scenes.DancingBlocks(framework))

     
     
   
   // allScenes.push(Scenes.CubeWithTexture(framework))
    for (var i = 0; i < allScenes.length -1; i++) {
        allScenes[i].index = i;
    }
    
}

export function deleteAllScenes(){
  allScenes = [];
}

export function getSceneByIndex(sceneIndex) {
    return allScenes[sceneIndex];
}

function getNumScenes() {
  return allScenes.length;
}







// // called after the scene loads
// function onLoad(framework) {
//   Scenes.initializeAllScenes(framework);

//   currentVisualizer = Scenes.getScene("icosahedron");
//   framework.visualizerIndex = 0;
//   framework.scene = currentVisualizer.scene;
//   framework.camera = currentVisualizer.camera;
//   var renderer = framework.renderer;
//   // var gui = framework.gui;

//   // // LOOK: the line below is syntactic sugar for the code above. Optional, but I sort of recommend it.
//   // // var {scene, camera, renderer, gui, stats} = framework; 

//   // // edit params and listen to changes like this
//   // // more information here: https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage
//   // gui.add(framework.camera, 'fov', 0, 130).onChange(function(newVal) {
//   //   framework.camera.updateProjectionMatrix();
//   // });
// }

// function switchVisualizer(framework, visualizerIndex) {
//   currentVisualizer = Scenes.getSceneByIndex(visualizerIndex);
//   framework.scene = currentVisualizer.scene;
//   framework.camera = currentVisualizer.camera;
//   framework.visualizerIndex = visualizerIndex;
// }

// // called on frame updates
// function onUpdate(framework) {
//   if (currentVisualizer != undefined) {
//     // switch manually
//     if(currentVisualizer.index != framework.visualizerIndex) {
//       switchVisualizer(framework, framework.visualizerIndex);
//     } 
//     // switch automatically
//     if (framework.automaticSwitchingOn) {
//       if (Scenes.timeIsOnBeat(framework, 0.5)) {
//         var randomNum = Scenes.getRandomInt(0, Scenes.getNumScenes());
//         while (randomNum == framework.visualizerIndex) {
//           randomNum = Scenes.getRandomInt(0, Scenes.getNumScenes());
//         } 
//         //console.log("switched to " + randomNum); 
//         switchVisualizer(framework, randomNum);
//       }
//     }
//     currentVisualizer.onUpdate(framework);
//   }
// }

