import * as THREE from "three";
import React, { Component } from "react";
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
import { ToonShader1, ToonShader2, ToonShaderHatching, ToonShaderDotted } from 'three/examples/jsm/shaders/ToonShader.js';
import {tinyColor} from 'tinycolor2';


let camera, scene, renderer;

let materials, current_material;

let light, pointLight, ambientLight;

let effect, resolution;

let effectController;

let time = 0;
let breakAnimation = false;
const clock = new THREE.Clock();
	
	
export function ArtLavaLamp(framework) {


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

		// MATERIALS

		function createShaderMaterial( shader, light, ambientLight ) {

					const u = THREE.UniformsUtils.clone( shader.uniforms );

					const vs = shader.vertexShader;
					const fs = shader.fragmentShader;

					const material = new THREE.ShaderMaterial( { uniforms: u, vertexShader: vs, fragmentShader: fs } );

					material.uniforms[ "uDirLightPos" ].value = light.position;
					material.uniforms[ "uDirLightColor" ].value = light.color;

					material.uniforms[ "uAmbientLightColor" ].value = ambientLight.color;

					return material;

				}

		function generateMaterials() {

					// environment map

					const path = "../images/textures/cube/";
					const format = '.jpg';
					const urls = [
						path + 'px' + format, path + 'nx' + format,
						path + 'py' + format, path + 'ny' + format,
						path + 'pz' + format, path + 'nz' + format
					];

					const cubeTextureLoader = new THREE.CubeTextureLoader();

					const reflectionCube = cubeTextureLoader.load( urls );
					const refractionCube = cubeTextureLoader.load( urls );
					refractionCube.mapping = THREE.CubeRefractionMapping;

					const materials = {

						"chrome": {
							m: new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube } ),
							h: 0, s: 0, l: 1
						},

						"liquid": {
							m: new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: refractionCube, refractionRatio: 0.85 } ),
							h: 0, s: 0, l: 1
						},

						"shiny": {
							m: new THREE.MeshStandardMaterial( { color:  0x050505, envMap: reflectionCube, roughness: 0.1, metalness: 1.0 } ),
							h: 0, s: 0.8, l: 1
						},

						"matte": {
							m: new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x111111, shininess: 1 } ),
							h: 0, s: 0, l: 1
						},


						"plastic": {
							m: new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x888888, shininess: 250 } ),
							h: 0.6, s: 0.8, l: 0.1
						},

						

					};

					return materials;

				}
		materials = generateMaterials();
		
		current_material = "chrome";

		resolution = 55;

		effect = new MarchingCubes( resolution, materials[ current_material ].m, true, true );
		effect.position.set( 0, 0, 0 );
		effect.scale.set( 700, 700, 700 );

		effect.enableUvs = false;
		effect.enableColors = false;

		scene.add( effect );

		// RENDERER

		renderer = new THREE.WebGLRenderer();
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		

		// CONTROLS


		const controls = new OrbitControls( camera, renderer.domElement );
		controls.minDistance = 500;
		controls.maxDistance = 5000;

		effectController = {
				material: "shiny",

				speed: 1.0,
				numBlobs: 10,
				resolution: 58,
				isolation: 80,

				floor: false,
				wallx: false,
				wallz: false,

				hue: 0.45,
				saturation: 0.1,
				lightness: 0.5,

				lhue: 0.04,
				lsaturation: 1.0,
				llightness: 0.5,

				lx: 0.5,
				ly: 0.5,
				lz: 1.0,

				dummy: function () {}

			};
	

	 let ArtLavaLamp = {
	 	 name: 'MagicBlobs',
	     scene: scene,
	     camera: camera,
	     tag : 'generic',
	     responsive : true,
	     sceneLength: 7000,
	     onUpdate : function(framework){
	      		const delta = clock.getDelta();
				time += delta * effectController.speed * 0.3;
			
				if ( effectController.resolution !== resolution ) {

					resolution = effectController.resolution;
					effect.init( Math.floor( resolution ) );

				}

				if ( effectController.isolation !== effect.isolation ) {
					effect.isolation = effectController.isolation;

				}



				updateCubes( effect, time, effectController.numBlobs, effectController.floor, effectController.wallx, effectController.wallz );


				// materials

				if ( effect.material instanceof THREE.ShaderMaterial ) {

					effect.material.uniforms[ "uBaseColor" ].value.setHSL( effectController.hue, effectController.saturation, effectController.lightness );
					} else {
			
					effect.material.color.setHSL( effectController.hue, effectController.saturation, effectController.lightness );
					}

					light.position.set( effectController.lx, effectController.ly, effectController.lz );
					light.position.normalize();

					pointLight.color.setHSL( effectController.lhue, effectController.lsaturation, effectController.llightness );

					
				//

				function onWindowResize() {

					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();

					renderer.setSize( window.innerWidth, window.innerHeight );

				}

				

				


				// this controls content of marching cubes voxel field

				function updateCubes( object, time, numblobs, floor, wallx, wallz ) {

					object.reset();

					// fill the field with some metaballs

					const rainbow = [
						new THREE.Color( 0xff0000 ),
						new THREE.Color( 0xff7f00 ),
						new THREE.Color( 0xffff00 ),
						new THREE.Color( 0x00ff00 ),
						new THREE.Color( 0x0000ff ),
						new THREE.Color( 0x4b0082 ),
						new THREE.Color( 0x9400d3 )
					];
					const subtract = 12;
					const strength = 1.2 / ( ( Math.sqrt( numblobs ) - 1 ) / 4 + 1 );

					for ( let i = 0; i < numblobs; i ++ ) {

						const ballx = Math.sin( i + 1.26 * time * ( 1.03 + 0.5 * Math.cos( 0.21 * i ) ) ) * 0.27 + 0.5;
						const bally = Math.tan( (i * 1.77) + time ) * 0.27 + 0.5; // dip into the floor
						const ballz = Math.cos( i + 1.32 * time * 0.1 * Math.sin( ( 0.92 + 0.53 * i ) ) ) * 0.27 + 0.5;


						
						object.addBall( ballx, bally, ballz, strength, subtract );


					}

					if ( floor ) object.addPlaneY( 2, 12 );
					if ( wallz ) object.addPlaneZ( 2, 12 );
					if ( wallx ) object.addPlaneX( 2, 12 );

				}
	      	}
	}
	return ArtLavaLamp


}


