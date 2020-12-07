import * as THREE from "three";
import {fragmentShading} from './../../Functions/shaders/my-frag.js'
import {vertexShading} from './../../Functions/shaders/my-vert.js'
import {fractionate, avg, max, modulate} from './../../Functions/visualizerFunctions/visualizerMaths.js'
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

export function CubeWithTexture (framework) {

  // Initializes 3 JS Stuff
    let scene = new THREE.Scene();
    let group = new THREE.Group();
    let camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, document.documentElement.clientWidth <= 900 ? -20 : 0, document.documentElement.clientWidth <= 900 ? 120 : 100);
    camera.lookAt(scene.position);
    scene.add(camera);

    let planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
    let planeMaterial =  new THREE.MeshLambertMaterial({
        color: 0x6904ce,
        side: THREE.DoubleSide,
        wireframe: true
    });
    
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 90, 0);
    group.add(plane);
    

    let icosahedronMaterial = new THREE.ShaderMaterial({
      uniforms: {
          time: { 
            type: "f", 
            value: Date.now()
          },
          noiseStrength: {
            type: "f",
            value: 2.0
          }, 
          numOctaves: {
            type: "f",
            value: 3
          },
          audioScale: {
            type: "f",
            value: 1
          }
        },
      vertexShader: vertexShading,
      fragmentShader: fragmentShading,
      });

    let plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
    plane2.rotation.x = -0.5 * Math.PI;
    plane2.position.set(0, -90, 0);
    group.add(plane2);

    let icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
  

    let ball = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    ball.position.set(0, 0, 0);
    group.add(ball);
 
    let ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
    spotLight.lookAt(ball);
    spotLight.castShadow = true;
    scene.add(spotLight);
    scene.add(group);


    let BallAndPlaneScene = {
      name: 'BallAndPlane',
      scene: scene,
      camera: camera,
      sceneLength: 30000,
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

        makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 10));
        makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 17));
        makeRoughBall(ball, modulate(Math.pow(lowerMaxFr, 2), 0, 1, 0, 20), modulate(upperAvgFr, 0, 1, 0, 10));
        group.rotation.y += 0.0005;
        // renderer.render(scene, camera);
        // if(!framework.breakAnimation){
        //   requestAnimationFrame(render);
        // }
        function makeRoughBall(mesh, bassFr, treFr) {
          mesh.geometry.vertices.forEach(function (vertex, i) {
              var offset = mesh.geometry.parameters.radius;
              var amp = 2;
              var time = window.performance.now();
              vertex.normalize();
              var rf = 0.0003;
              var distance = (offset + bassFr ) + noise3D(vertex.x + time *rf*8, vertex.y +  time*rf*7, vertex.z + time*rf*9) * amp * treFr;
              vertex.multiplyScalar(distance);
          });
          mesh.geometry.verticesNeedUpdate = true;
          mesh.geometry.normalsNeedUpdate = true;
          mesh.geometry.computeVertexNormals();
          mesh.geometry.computeFaceNormals();
      }

        function makeRoughGround(mesh, distortionFr) {
          mesh.geometry.vertices.forEach(function (vertex, i) {
              var amp = 2;
              var time = Date.now();

              var distance = (noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) * distortionFr * amp;
              vertex.z = distance;
          });
          mesh.geometry.verticesNeedUpdate = true;
          mesh.geometry.normalsNeedUpdate = true;
          mesh.geometry.computeVertexNormals();
          mesh.geometry.computeFaceNormals();
      }
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
