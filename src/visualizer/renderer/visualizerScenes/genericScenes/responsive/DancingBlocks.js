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
    let planeMaterial =  new THREE.MeshPhongMaterial({color :0xffffff, reflectivity : 0})
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
           var material =  new THREE.MeshPhongMaterial({color :0x0914ed, reflectivity : 0.7}) ;
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



   

    let bgUrl = '../animationAssets/bg.glb'
    
      loader.load(bgUrl, (gltf) => {
        var bgRoot = gltf.scene;
         var scale = 5;
          bgRoot.scale.set (scale,scale,scale);
          bgRoot.castShadow = true;
          //, 'colour_2' : {'colour_1' : , 'colour_2' : 0x170708}, 
           var material =  new THREE.MeshPhongMaterial({color :0xeb0510, reflectivity : 0.7}) ;
            var material2 =  new THREE.MeshPhongMaterial({color : 0x170708,  reflectivity : 0.7}) ;
            
            let count = 0
             bgRoot.traverse((o) => {
              if(o.isMesh){
                o.name = 'bgBlock'
              
                if(count % 2 === 0){

                  o.material = material
                }else{
                  o.material = material2
                 
                }
                count ++
              }
             })
            bgRoot.position.z = -90
            bgRoot.position.y = 50
            scene.add(bgRoot);
             },
          );

   //  let material = new THREE.MeshBasicMaterial({map : new THREE.TextureLoader().load('../images/art/Haza_Paintings_05.jpg'), side : THREE.DoubleSide})

   //  let cube1 = new THREE.Mesh(new THREE.BoxGeometry(50, 70, 50),  material);

   //  let cube2 = new THREE.Mesh(new THREE.BoxGeometry(100, 140, 50),  material);

   //  let cube3 = new THREE.Mesh(new THREE.BoxGeometry(50, 70, 50),  material);

   //  let cube4 = new THREE.Mesh(new THREE.BoxGeometry(100, 140, 50),  material);

   // cube1.name = 'block'
   // cube1.castShadow = true;
   // cube2.name = 'block'
   // cube2.castShadow = true;
   // cube3.name = 'block'
   // cube3.castShadow = true;
   // cube4.name = 'block'
   // cube4.castShadow = true;

   // scene.add(cube1)
   // cube1.position.x = -200
   // scene.add(cube2)
   // cube2.position.x = -100
   // scene.add(cube3)
    camera.position.y = 0;
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
    ambientLight.position.x = 0
    scene.add( ambientLight );
    var light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
    light.position.set( 0, 1, 0.5 ); 
    light.shadow.camera.near = 0.1;       
    light.shadow.camera.far = 2000;      
    light.shadow.camera.left = -500;
    light.shadow.camera.bottom = -500;
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
   
        let MoveUpper = framework.streamData.bufferData.peak -0.5 < framework.streamData.bufferData.average
        let MoveDowner = framework.streamData.bufferData.trough + 0.5 > framework.streamData.bufferData.average

       
        var time = window.performance.now();
        var rf = 0.0003;
        var distance = framework.streamData.frequencies.bassFr  + noise3D( time *rf*1,   time*rf*2 , time*rf*3) * 2 * framework.streamData.frequencies.trebelFr

        let t = 0;
        if(timer - setTime > 10 && framework.streamData.bufferData.average !== 0){
            setTime = window.performance.now();

            scene.traverse((o) => {
              if(o.isMesh && o.name === 'block'){
                if(count % 2 === 0){
                  
                  if(o.position.y > 2  && (MoveDowner ||  framework.streamData.bufferData.upperMaxFr > 0.7 )){
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
                  if(o.position.y < 2 && (MoveDowner ||  framework.streamData.bufferData.upperMaxFr > 0.7 )){
                     // o.translateY( modulate(framework.streamData.bufferData.peak, 1,2.5,0,2.5))
                     o.translateY(lerp(o.position.y, distance * 2, ease(t)))
                  }else if(o.position.y > 2 && MoveUpper ){
                     // o.translateY(-1 * modulate(framework.streamData.bufferData.trough,1,2,0,2))
                      o.translateY( -1 * lerp(o.position.y, distance * 2, ease(t)))
                  }else{
                    if(o.position.y < 2 ){
                      o.translateY(0.05)
                    }else{
                      o.translateY(- 0.05)
                    }
                  }
                }
                t+= 0.002
                if(t > 1){
                  t = 0
                }
                count ++ 
            //  console.log(o)
               // extrapolateCube(o, lowerAvgFr, upperAvgFr)
              }else if(o.isMesh && o.name === 'bgBlock'){
                if(bgC % 2 === 0){
                  o.translateY( toggle * 0.02)
                  o.translateX( toggle * 0.01)
                }else{
                  o.translateY(  - 1 * toggle * 0.02)
                  o.translateZ( toggle * 0.01)
                }
              }
              bgC ++ 
            })
          bgTranslateCount += 1
          if(bgTranslateCount > 200){
            bgTranslateCount = 0
            toggle = -1 * toggle
          }
          
        }
      
      
      //   function extrapolateCube(mesh, bassFr, treFr) {
      //         console.log(mesh)
      //         mesh.geometry.vertices.forEach(function (vertex, i) {
      //         let time = window.performance.now();
      //         var amp = 2;
              
      //         vertex.normalize();
      //         var rf = 0.003;
      //         var distance = ( bassFr + 40) + noise3D(vertex.x + time *rf*8, vertex.y +  time*rf*7, vertex.z + time*rf*9) * amp * treFr;
      //         vertex.multiplyScalar(distance);
      //     });
      //     mesh.geometry.verticesNeedUpdate = true;
      //     mesh.geometry.normalsNeedUpdate = true;
      //     mesh.geometry.computeVertexNormals();
      //     mesh.geometry.computeFaceNormals();
         
      // }
        // function makeRoughBall(mesh, bassFr, treFr) {
        //   mesh.geometry.vertices.forEach(function (vertex, i) {
        //       var offset = mesh.geometry.parameters.radius;
        //       var amp = 2;
        //       var time = window.performance.now();
        //       vertex.normalize();
        //       var rf = 0.0003;
        //       var distance = (offset + bassFr ) + noise3D(vertex.x + time *rf*8, vertex.y +  time*rf*7, vertex.z + time*rf*9) * amp * treFr;
        //       vertex.multiplyScalar(distance);
        //   });
        //     mesh.geometry.verticesNeedUpdate = true;
        //     mesh.geometry.normalsNeedUpdate = true;
        //     mesh.geometry.computeVertexNormals();
        //     mesh.geometry.computeFaceNormals();
        //   }
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
