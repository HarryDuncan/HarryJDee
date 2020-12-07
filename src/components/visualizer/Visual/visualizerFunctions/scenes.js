import * as THREE from "three";
import {fragmentShading} from './../../shaders/my-frag.js'
import {vertexShading} from './../../shaders/my-vert.js'
import {fractionate, modulate, avg, max} from './functions.js';
import { makeNoise3D , makeNoise2D} from "open-simplex-noise";

const noise2D = makeNoise2D(2342342)
const noise3D = makeNoise3D(424342)


export const createBallAndPlane = (framework) => {

   //  var texture = new THREE.TextureLoader().load( '../art/mujertriqui.jpg' );
  //   console.log(texture)
   //  var material = new THREE.MeshBasicMaterial( { map: texture } );
    var group = new THREE.Group();
    var planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
    var planeMaterial =  new THREE.MeshLambertMaterial({
        color: 0x6904ce,
        side: THREE.DoubleSide,
        wireframe: true
    });
    
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 90, 0);
    group.add(plane);
    

    var icosahedronMaterial = new THREE.ShaderMaterial({
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

    var plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
    plane2.rotation.x = -0.5 * Math.PI;
    plane2.position.set(0, -90, 0);
    group.add(plane2);

    var icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
  

    var ball = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    ball.position.set(0, 0, 0);
    group.add(ball);
 
    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    framework.scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
    spotLight.lookAt(ball);
    spotLight.castShadow = true;
    framework.scene.add(spotLight);
    framework.scene.add(group);


    framework.domElementNode.appendChild( framework.renderer.domElement );
    framework.renderer.render( framework.scene, framework.camera );

    

    render()
    function render() {

      framework.analyserNode.getByteFrequencyData(framework.audioBuffer);

  
      let lowerHalfArray = framework.audioBuffer.slice(0, (framework.audioBuffer.length/2) - 1);
      let upperHalfArray = framework.audioBuffer.slice((framework.audioBuffer.length/2) - 1, framework.audioBuffer.length - 1);

      let overallAvg = avg(framework.audioBuffer);
      var lowerMax = max(lowerHalfArray);
      var lowerAvg = avg(lowerHalfArray);
      var upperMax = max(upperHalfArray);
      var upperAvg = avg(upperHalfArray);

      var lowerMaxFr = lowerMax / lowerHalfArray.length;
      var lowerAvgFr = lowerAvg / lowerHalfArray.length;
      var upperMaxFr = upperMax / upperHalfArray.length;
      var upperAvgFr = upperAvg / upperHalfArray.length;
// 
     makeRoughGround(plane, modulate(upperAvgFr, 0, 1, 0.5, 10));
     makeRoughGround(plane2, modulate(lowerMaxFr, 0, 1, 0.5, 17));
      
    makeRoughBall(ball, modulate(Math.pow(lowerMaxFr, 2), 0, 1, 0, 29), modulate(upperAvgFr, 0, 1, 0, 16));

      group.rotation.y += 0.0005;
      framework.renderer.render(framework.scene, framework.camera);
      
      if(!framework.breakAnimation){
        requestAnimationFrame(render);
      }
    }

   

    function makeRoughBall(mesh, bassFr, treFr) {
        mesh.geometry.vertices.forEach(function (vertex, i) {
            var offset = mesh.geometry.parameters.radius;
            var amp = 3;
            var time = window.performance.now();
            vertex.normalize();
            var rf = 0.0003;
            var distance = (offset + bassFr ) + noise3D(vertex.x + time *rf*7, vertex.y +  time*rf*8, vertex.z + time*rf*9) * amp * treFr;
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


