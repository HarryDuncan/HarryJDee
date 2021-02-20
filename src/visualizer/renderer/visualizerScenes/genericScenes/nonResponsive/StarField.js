import * as THREE from "three";
import {fractionate, avg, max, modulate} from './../../../functions'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


let sampleClosedSpline = new THREE.CatmullRomCurve3( [
  new THREE.Vector3( -100, -10, -50 ),
  new THREE.Vector3( 0, 10, 100 ),
  new THREE.Vector3( 100, -50, -50),
  new THREE.Vector3( 0, 0, -100 )
] );
sampleClosedSpline.type = 'catmullrom';
sampleClosedSpline.closed = true;


export function StarField(framework) {
    let scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.009 );
    let camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, document.documentElement.clientWidth <= 900 ? -20 : 0, document.documentElement.clientWidth <= 900 ? 120 : 100);
    camera.lookAt(new THREE.Vector3(0,0,0));
    var controls = new OrbitControls(camera, framework.renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.target.set(0, 0, 0);
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 2.0;

    var particles, materials = [];
    var geometry = new THREE.Geometry();
    for ( var i = 0; i < 9000; i ++ ) {
      var vertex = new THREE.Vector3();
      vertex.x = getRandomArbitrary(-600, 600);
      vertex.y = getRandomArbitrary(-20, 20);;
      vertex.z = getRandomArbitrary(-800, 800);
      geometry.vertices.push( vertex );
    
    }
    var parameters = [
      [ [1, 1, 0.5], 5 ],
      [ [0.95, 1, 0.5], 4 ],
      [ [0.90, 1, 0.5], 3 ],
      [ [0.85, 1, 0.5], 2 ],
      [ [0.80, 1, 0.5], 1 ]
    ];
    var color, size;
    let colourPairs = {
                  //Initial
                  0 : 0xe92b13, 
                  2 : 0x0255e1,
                  }
    for ( var i = 0; i < parameters.length; i ++ ) {
      color = parameters[i][0];
      size  = parameters[i][1];
      materials[i] = new THREE.PointsMaterial( { size: size } );
      particles = new THREE.Points( geometry, materials[i] );
      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;
      scene.add( particles );
    }


    let ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
    spotLight.lookAt(new THREE.Vector3(0,0,0));
    spotLight.castShadow = true;
    scene.add(spotLight);
         
    

    camera.position.z = 5;

    let starfieldScene = {
        name: 'starfield',
        scene: scene,
        camera: camera,
        sceneLength: 4000,
        onUpdate: function(framework) {
          var time = Date.now() * 0.00005;
          // if (timeIsOnBeat(framework, 1)) {
            for ( var i = 0; i < materials.length; i ++ ) {
              color = parameters[i][0];
              var h = color[0] + time * 2;
              materials[i].color.setHSL( h, color[1], color[2] );
            }
          // } else {
          

            // if(!framework.isPlaying){
            //   controls.rotateSpeed(0)
            //   controls.zoomSpeed = 0)
            //   controls.panSpeed(0)
            // }
            for ( var i = 0; i < framework.scene.children.length; i ++ ) {
              var object = framework.scene.children[ i ];
              if ( object instanceof THREE.Points ) {
                object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );

              }
           // }
          }

   
          // if(framework.data !== null && framework.data !== undefined) {
          //   framework.analyserNode.getByteFrequencyData(framework.data)
          //   var array = framework.data
          //   for ( var i = 0; i < framework.scene.children.length; i ++ ) {
          //     var object = framework.scene.children[ i ];
          //     if ( object instanceof THREE.Points ) {
          //       var offset;
          //       if (offset < 100) {
          //         offset = 1; 
          //       } else {
          //         offset = getAverageVolume(array)/800;
          //       }
          //       object.scale.set(offset/2, 0, offset/2);
          //     }
          //   }
          // }
          if (!framework.cameraPaused) {
            animateCamera(framework, 1, sampleClosedSpline); 
            framework.camera.lookAt(new THREE.Vector3(0,0,0));
          }
          function onWindowResize() {
            framework.camera.aspect = window.innerWidth / window.innerHeight;
            framework.camera.updateProjectionMatrix();
            framework.renderer.setSize(window.innerWidth, window.innerHeight);
          }

          function animateCamera(framework, scale, pipeSpline) {
            var splineCamera = framework.camera;
            var tubeGeometry = new THREE.TubeBufferGeometry(pipeSpline, 100, 2, 3, true);
            var binormal = new THREE.Vector3();
            var normal = new THREE.Vector3();

            // animate camera along spline
            var time = Date.now();
            var looptime = 20 * 1000;
            var t = ( time % looptime ) / looptime;
            var pos = tubeGeometry.parameters.path.getPointAt( t );
            pos.multiplyScalar(scale);
            // interpolation
            var segments = tubeGeometry.tangents.length;
            var pickt = t * segments;
            var pick = Math.floor( pickt );
            var pickNext = ( pick + 1 ) % segments;
            binormal.subVectors( tubeGeometry.binormals[ pickNext ], tubeGeometry.binormals[ pick ] );
            binormal.multiplyScalar( pickt - pick ).add( tubeGeometry.binormals[ pick ] );
            var dir = tubeGeometry.parameters.path.getTangentAt( t );
            var offset = 15;
            normal.copy( binormal ).cross( dir );
            // we move on a offset on its binormal
            pos.add( normal.clone().multiplyScalar( offset ) );
            splineCamera.position.copy( pos );
            // using arclength for stablization in look ahead
            var lookAt = tubeGeometry.parameters.path.getPointAt( ( t + 30 / tubeGeometry.parameters.path.getLength() ) % 1 ).multiplyScalar(scale);
            // camera orientation 2 - up orientation via normal
            splineCamera.matrix.lookAt( splineCamera.position, lookAt, normal );
            splineCamera.rotation.setFromRotationMatrix(splineCamera.matrix, splineCamera.rotation.order);
          }
        }
    }

    return starfieldScene
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
