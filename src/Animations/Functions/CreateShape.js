import * as THREE from "three";
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries.js';
import { Curves } from 'three/examples/jsm/curves/CurveExtras.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export const Segment = (type, props) => {
  switch(type){
    case 'Cube':
      return createCube
    default:
        var extrudeSettings = {
              depth: 20,
              steps: 1,
              bevelEnabled: true,
              bevelThickness: 2,
              bevelSize: 4,
              bevelSegments: 1
            };


        var pts = [], count = 3;

        for ( var i = 0; i < count; i ++ ) {

          var l = 20;

          var a = 2 * i / count * Math.PI;

          pts.push( new THREE.Vector4( ( i - 4.5 ) * 50, THREE.MathUtils.randFloat( - 50, 50 ), THREE.MathUtils.randFloat( - 50, 50 ) ),( i - 4.5 ) * 50 );


        }
        var material = new THREE.MeshLambertMaterial(0x4287f5)
        var shape = new THREE.Shape( pts );
        var geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
        var mesh = new THREE.Mesh( geometry, material );

        mesh.position.set( 50, 100, 50 );
        return mesh
  }
}
  

const Cube = () => {
    var material = new THREE.MeshLambertMaterial(0x4287f5)
    var geometry = new THREE.ParametricBufferGeometry( ParametricGeometries.klein, 80, 80 );
    var object = new THREE.Mesh( geometry, material );
    object.position.set( 10, 10, 200 );
    object.scale.multiplyScalar( 5 );
    return object

}