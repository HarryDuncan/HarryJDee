import * as THREE from "three";
import {fragmentShading} from './../../Functions/shaders/my-frag.js'
import {vertexShading} from './../../Functions/shaders/my-vert.js'
import {fractionate, avg, max, modulate} from './../../Functions/visualizerFunctions/visualizerMaths.js'
import { makeNoise3D , makeNoise2D} from "open-simplex-noise";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const noise2D = makeNoise2D(2342342)
const noise3D = makeNoise3D(424342)

let sampleClosedSpline = new THREE.CatmullRomCurve3( [
  new THREE.Vector3( -100, -10, -50 ),
  new THREE.Vector3( 0, 10, 100 ),
  new THREE.Vector3( 100, -50, -50),
  new THREE.Vector3( 0, 0, -100 )
] );
sampleClosedSpline.type = 'catmullrom';
sampleClosedSpline.closed = true;



// Ball and planne scene
export function BallAndPlane (framework) {

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
      sceneLength: 45000,
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
         function onWindowResize() {
            framework.camera.aspect = window.innerWidth / window.innerHeight;
            framework.camera.updateProjectionMatrix();
            framework.renderer.setSize(window.innerWidth, window.innerHeight);
          }
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
          console.log(mesh)
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
        sceneLength: 7000,
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
        color: 0x0010c2,
        side: THREE.DoubleSide,
        wireframe: true
    });
    
   
    

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

    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 90, 0);
    group.add(plane);
    let plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
    plane2.rotation.x = -0.5 * Math.PI;
    plane2.position.set(0, -90, 0);
    group.add(plane2);

    let icosahedronGeometry = new THREE.BoxGeometry(100, 140, 100);
  
    let material = new THREE.TextureLoader().load('../images/products/r.jpg')


    var cubeMaterials = [                                                      
    new THREE.MeshBasicMaterial( { map: material } ),
    new THREE.MeshBasicMaterial( { map: material } ), 
    new THREE.MeshPhongMaterial({color :0x000000,  reflectivity : 0}),
    new THREE.MeshPhongMaterial({color :0x000000,  reflectivity : 0}),  
    new THREE.MeshBasicMaterial( { map: material } ),   
    new THREE.MeshBasicMaterial( { map: material } ),                           
                     ]
    let cube = new THREE.Mesh(icosahedronGeometry,  cubeMaterials);
    cube.position.set(0, 0, 0);
    group.add(cube);
 
    let ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
    spotLight.lookAt(cube);
    spotLight.castShadow = true;
    scene.add(spotLight);
    scene.add(group);


    let CubeWithTexture = {
      name: 'CubeWithTexture',
      scene: scene,
      camera: camera,
      sceneLength: 129000,
      onUpdate: function(framework){
        framework.analyserNode.getByteFrequencyData(framework.data);
        let lowerHalfArray = framework.data.slice(0, (framework.data.length/2) - 1);
        let upperHalfArray = framework.data.slice((framework.data.length/2) - 1, framework.data.length - 1);

        let overallAvg = avg(framework.data);
        let lowerMax = max(lowerHalfArray);
        let lowerAvg = avg(lowerHalfArray);
        let upperMax = max(upperHalfArray);
        let upperAvg = avg(upperHalfArray);

        let lowerMaxFr = lowerMax / (lowerHalfArray.length / 4);
        let lowerAvgFr = lowerAvg / lowerHalfArray.length;
        let upperMaxFr = upperMax / upperHalfArray.length;
        let upperAvgFr = upperAvg / upperHalfArray.length;

        makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 10));
        makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 17));
        extrapolateCube(cube, modulate(Math.pow(lowerMaxFr, 2), 0, 1, 0, 5), modulate(upperAvgFr, 0, 1, 0, 11));
        group.rotation.y += 0.005;
        // renderer.render(scene, camera);
        // if(!framework.breakAnimation){
        //   requestAnimationFrame(render);
        // }
        function extrapolateCube(mesh, bassFr, treFr) {
          mesh.geometry.vertices.forEach(function (vertex, i) {
              let time = window.performance.now();
              var amp = 2;
              
              vertex.normalize();
              var rf = 0.003;
              var distance = ( bassFr + 40) + noise3D(vertex.x + time *rf*8, vertex.y +  time*rf*7, vertex.z + time*rf*9) * amp * treFr;
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

    return CubeWithTexture
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
