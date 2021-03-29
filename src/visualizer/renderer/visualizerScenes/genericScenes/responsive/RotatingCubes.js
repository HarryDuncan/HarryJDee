import * as THREE from "three";
import {fragmentShading, vertexShading, fractionate, avg, max, modulate} from './../../../functions';
import { makeNoise3D , makeNoise2D} from "open-simplex-noise";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const noise2D = makeNoise2D(2342342)
const noise3D = makeNoise3D(424342)

let sampleClosedSpline = new THREE.CatmullRomCurve3( [
  new THREE.Vector3( -100, 0, -0 ),
  new THREE.Vector3( 0, 0, 100 ),
  new THREE.Vector3( 100, 0, 0),
  new THREE.Vector3( 0, 0, -100 )
] );
sampleClosedSpline.type = 'catmullrom';
sampleClosedSpline.closed = true;

export function RotatingCubes (framework) {

  // Initializes 3 JS Stuff
    let scene = new THREE.Scene();
    let group = new THREE.Group();
    let camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, document.documentElement.clientWidth <= 900 ? -20 : 0, document.documentElement.clientWidth <= 900 ? 120 : 100);
    camera.lookAt(scene.position);
    scene.add(camera);


    let icosahedronMaterial = new THREE.MeshPhongMaterial({color : 0xff0048,  reflectivity : 0.7}) ;


 


    const cubeGeometry = new THREE.BoxGeometry(20, 20, 30);
    let cube = new THREE.Mesh(cubeGeometry, icosahedronMaterial);
    let cube2 = new THREE.Mesh(cubeGeometry, icosahedronMaterial);
    let cube3 = new THREE.Mesh(cubeGeometry, icosahedronMaterial);
    let cube4 = new THREE.Mesh(cubeGeometry, icosahedronMaterial);


    cube.position.set(-30, -30, 0);
    cube2.position.set(10, -30, 0);
    cube3.position.set(-30, 10, 0);
    cube4.position.set(10, 10, 0);

    group.add(cube);
    group.add(cube2);
    group.add(cube3);
    group.add(cube4);



 
    let ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 140, 20);
    spotLight.lookAt(group);
    spotLight.castShadow = true;
    scene.add(spotLight);
    scene.add(group);

    let t = window.performance.now()

    let BallAndPlaneScene = {
      name: 'RotatingCubes',
      scene: scene,
      camera: camera,
      sceneLength: 8000,
      onUpdate: function(framework){
        framework.analyserNode.getByteFrequencyData(framework.data);
        let lowerHalfArray = framework.data.slice(0, (framework.data.length/2) - 1);
        let upperHalfArray = framework.data.slice((framework.data.length/2) - 1, framework.data.length - 1);

        let overallAvg = avg(framework.data);
        let lowerMax = max(lowerHalfArray);
        let lowerAvg = avg(lowerHalfArray);
        let upperMax = max(upperHalfArray);
        let upperAvg = avg(upperHalfArray);

        let lowerMaxFr = lowerMax / lowerHalfArray.length;
        let lowerAvgFr = lowerAvg / lowerHalfArray.length;
        let upperMaxFr = upperMax / upperHalfArray.length;
        let upperAvgFr = upperAvg / upperHalfArray.length;

        const rotate = (currentRotation) => {
          console.log(currentRotation)
          currentRotation += Math.PI / 2;
          return currentRotation
        }

        if(framework.streamData.frequencies.bassFr > 1.1 && window.performance.now() - t > 50 ){
          cube.rotation.x = rotate(cube.rotation.x )
          t = window.performance.now()
        }
        group.rotation.y += 0.005;
        // makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 10));
        // makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 17));
        // makeRoughBall(ball, modulate(Math.pow(lowerMaxFr, 2), 0, 1, 0, 20), modulate(upperAvgFr, 0, 1, 0, 10));
        //
        // renderer.render(scene, camera);
        // if(!framework.breakAnimation){
        //   requestAnimationFrame(render);
        // }
      //   function makeRoughBall(mesh, bassFr, treFr) {
      //     mesh.geometry.vertices.forEach(function (vertex, i) {
      //         var offset = mesh.geometry.parameters.radius;
      //         var amp = 2;
      //         var time = window.performance.now();
      //         vertex.normalize();
      //         var rf = 0.0003;
      //         var distance = (offset + bassFr ) + noise3D(vertex.x + time *rf*8, vertex.y +  time*rf*7, vertex.z + time*rf*9) * amp * treFr;
      //         vertex.multiplyScalar(distance);
      //     });
      //     mesh.geometry.verticesNeedUpdate = true;
      //     mesh.geometry.normalsNeedUpdate = true;
      //     mesh.geometry.computeVertexNormals();
      //     mesh.geometry.computeFaceNormals();
      // }

      //   function makeRoughGround(mesh, distortionFr) {
      //     mesh.geometry.vertices.forEach(function (vertex, i) {
      //         var amp = 2;
      //         var time = Date.now();

      //         var distance = (noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) * distortionFr * amp;
      //         vertex.z = distance;
      //     });
      //     mesh.geometry.verticesNeedUpdate = true;
      //     mesh.geometry.normalsNeedUpdate = true;
      //     mesh.geometry.computeVertexNormals();
      //     mesh.geometry.computeFaceNormals();
      // }
      }

      
      

    }

    return BallAndPlaneScene
}


function getAverageVolume(array) {
      var values = 0;
      var average;

      var length = array.length;

      // get all the frequency amplitudes
      for (var i = 0; i < length; i++) {
         
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
