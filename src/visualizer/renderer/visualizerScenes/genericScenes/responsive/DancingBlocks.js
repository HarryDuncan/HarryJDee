import * as THREE from "three";
import {fractionate, avg, max, modulate} from './../../../functions';
import { makeNoise3D , makeNoise2D} from "open-simplex-noise";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const noise2D = makeNoise2D(2342342)
const noise3D = makeNoise3D(424342)


export function DancingBlocks (framework) {
  // Initializes 3 JS Stuff
    let scene = new THREE.Scene();
    let group = new THREE.Group();
    let camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, document.documentElement.clientWidth <= 900 ? 0 : 0, document.documentElement.clientWidth <= 900 ? 140 : 180);
    camera.lookAt(scene.position);
    scene.add(camera);
    let planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
    let planeMaterial =  new THREE.MeshStandardMaterial( { color :0xffffff, roughness: 0, metalness: 0.1 })
    let plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
    plane2.rotation.x = -0.5 * Math.PI;
    plane2.position.set(0, -90, 0);
    plane2.receiveShadow = true;
    scene.add(plane2);
    const loader = new GLTFLoader();
    let url = '../animationAssets/4blocks.glb'
    
      loader.load(url, (gltf) => {
        var root = gltf.scene;
         var scale = document.documentElement.clientWidth <= 900 ? 7 : 12;
        
          root.scale.set (scale,scale,scale);
          root.castShadow = true;
           
            // var material2 =  new THREE.MeshPhongMaterial({color : 0xff0048,  reflectivity : 0.7}) ;
            let material1 = new THREE.MeshBasicMaterial({map : new THREE.TextureLoader().load('../animationAssets/textures/Cube.png')})
            let material2 = new THREE.MeshBasicMaterial({map : new THREE.TextureLoader().load('../animationAssets/textures/Cube2.png')})

            let count = 0
             root.traverse((o) => {
              if(o.isMesh){
                o.name = 'block'
                o.castShadow = true
                if(count % 2 === 0){

                  o.material = material1
                }else{
                  
                     o.material = material2
                  
                 
                }
                count ++
              }
             })
             root.castShadow = true
            scene.add(root);
             },
          );



   

   
  
    camera.position.y = 0;
    
    var light = new THREE.DirectionalLight( 0xdfebff, 1.75 );
    light.position.set( 0, 1, 0.5 ); 
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.1;       
    light.shadow.camera.far = 2000;      
    light.shadow.camera.left = -1000;
    light.shadow.camera.bottom = -1000;
    light.shadow.camera.right = 500;
    light.shadow.camera.top = 500;
       //default; light shining from top
    light.castShadow = true;            // default false
    scene.add( light );
    scene.background = new THREE.Color( 0xffffff );
    scene.name = 'DancingBlocks'
    let toggle = -1
    let bgToggleLimit = 40
    let bgTranslateCount = 0;
    var setTime = Date.now() 
    let DancingBlocks = {
      name: 'DancingBlocks',
      scene: scene,
      camera: camera,
      sceneLength: 9000,
      onUpdate: function(framework){

        // Linear Interpolation for smoother animation
        function lerp(a, b, t) {return a + (b - a) * t}

        // example easing function 
        function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}


        var timer = Date.now() 
       
        let count = 0
        let bgC = 0
   
        let MoveUpper = framework.streamData.bufferData.peak - 1 < framework.streamData.bufferData.average
        let MoveDowner = framework.streamData.bufferData.trough + 1 > framework.streamData.bufferData.average

       
        var time = window.performance.now();
        var rf = 0.0003;
        var distance = framework.streamData.frequencies.bassFr  + noise3D( time *rf*1,   time*rf*2 , time*rf*3) * 2 * framework.streamData.frequencies.trebelFr

        let t = 0;
        if(framework.streamData.bufferData.average !== 0){
            
            scene.traverse((o) => {
              if(o.isMesh && o.name === 'block'){
                if(count % 2 === 0){
                  
                  if(o.position.y > 2  && (MoveDowner ||  framework.streamData.bufferData.lowerMaxFr > 0.9 )){
                    // o.translateY(-1 * modulate(framework.streamData.bufferData.peak, 1,2,0,2))
                     o.translateY(-1 * lerp(o.position.y, distance * 2, ease(t)))
                  }else if(o.position.y < 2  && MoveUpper){
                    //  o.translateY(modulate(framework.streamData.bufferData.trough,1,2,0,2.5))
                     o.translateY(lerp(o.position.y, distance * 2, ease(t)))
                  }else{
                    if(o.position.y < 2){
                      o.translateY(0.05)
                    }else{
                      o.translateY(- 0.05)
                    }
                  
                  }
                }else{
                  if(o.position.y < 2 && (MoveDowner ||  framework.streamData.bufferData.lowerMaxFr > 0.9 )){
                     // o.translateY( modulate(framework.streamData.bufferData.peak, 1,2.5,0,2.5))
                     o.translateY(lerp(o.position.y, distance , ease(t)))
                  }else if(o.position.y > 2 && MoveUpper ){
                     // o.translateY(-1 * modulate(framework.streamData.bufferData.trough,1,2,0,2))
                      o.translateY( -1 * lerp(o.position.y, distance , ease(t)))
                  }else{
                    if(o.position.y < 2 ){
                      o.translateY(0.05)
                    }else{
                      o.translateY(- 0.05)
                    }
                  }
                }
                t+= 0.02
                if(t > 1){
                  t = 0
                }
                count ++ 
            //  console.log(o)
               // extrapolateCube(o, lowerAvgFr, upperAvgFr)
              }
            })
         
          
        }
      

        }

    }

    return DancingBlocks

  }

function getAverageVolume(array) {
      var values = 0;
      var average;

      var length = array.length;

      // get all the frequency amplitudes
      for (var i = 0; i < length; i++) {
          console.log(array[i])
          values += array[i];
      }

      average = values / length;
      return average;
}

function mapVolumeToNoiseStrength(vol) {
  // map range from 0 -> 150 to 4 -> 1
  var result = vol / 150 * (1 - 4) + 4;
  return result;
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}



 // framework.analyserNode.getByteFrequencyData(framework.data);
 //        let lowerHalfArray = framework.data.slice(0, (framework.data.length/2) - 1);
 //        let upperHalfArray = framework.data.slice((framework.data.length/2) - 1, framework.data.length - 1);

 //        let overallAvg = avg(framework.data);
 //        let lowerMax = max(lowerHalfArray);
 //        let lowerAvg = avg(lowerHalfArray);
 //        let upperMax = max(upperHalfArray);
 //        let upperAvg = avg(upperHalfArray);

 //        let lowerMaxFr = lowerMax / lowerHalfArray.length;
 //        let lowerAvgFr = lowerAvg / lowerHalfArray.length;
 //        let upperMaxFr = upperMax / upperHalfArray.length;
 //        let upperAvgFr = upperAvg / upperHalfArray.length;
