import * as THREE from "three";
import React, { Component } from "react";


let camera, scene, renderer;

let materials, current_material;

let light, pointLight, ambientLight;

let effect, resolution;

let effectController;

let time = 0;
let breakAnimation = false;
const clock = new THREE.Clock();
	
	
export function BlackTransition() {


		// CAMERA

		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.set( - 500, 500, 1500 );

		// SCENE

		scene = new THREE.Scene();
		scene.background = new THREE.Color(0xffffff );

		// LIGHTS

		light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 0.5, 0.5, 1 );
		scene.add( light );

		pointLight = new THREE.PointLight( 0xff3300 );
		pointLight.position.set( 0, 0, 100 );
		scene.add( pointLight );

		ambientLight = new THREE.AmbientLight(0xffffff, 0.2 );
		ambientLight.position.set( 0, 0, 100 );
		scene.add( ambientLight );
		let index = 0;
		// MATERIALS

		

		renderer = new THREE.WebGLRenderer();
		
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		

		// CONTROLS


	

	 let BlackTransition = {
	 	 name: 'BlackTransition',
	     scene: scene,
	     camera: camera,
	     tag : 'transition',
	     responsive : true,
	     sceneLength: 500,
	     onUpdate : function(framework){
	     		
	      	}
	}
	return BlackTransition


}


