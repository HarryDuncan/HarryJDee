import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';


export function BackdropLights(framework) {
		let scene, renderer, camera;
		
			
		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.set( 0, 50, -205 );

		scene = new THREE.Scene();
		scene.background = new THREE.Color(0x050505);

		RectAreaLightUniformsLib.init();

		const geoKnot = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
		const matKnot = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0, metalness: 0 } );
		const meshKnot = new THREE.Mesh( geoKnot, matKnot );
		meshKnot.name = 'meshKnot';
		meshKnot.position.set( 0, 25, -20 );
		
		scene.add( meshKnot );


		const rectLight1 = new THREE.RectAreaLight( 0xff0000, 25, 20, 400);
		rectLight1.position.set( -25, 5, 0 );
		rectLight1.name = 'rect1'
		scene.add( rectLight1 );
		

		let helper1 = new RectAreaLightHelper( rectLight1 )
		helper1.position.set( -25, 5, 0 );
		helper1.name = 'helper1'
		scene.add( helper1 );


		const rectLight2 = new THREE.RectAreaLight( 0x00ff00, 10, 20, 400 );
		rectLight2.position.set( 0, 5, 0 );
		rectLight2.name = 'rect2'
		scene.add( rectLight2 );

		let helper2 = new RectAreaLightHelper( rectLight2 )
		helper2.position.set( 0, 5, 0 );
		helper2.name = 'helper2'
		scene.add( helper2 );
		

		const rectLight3 = new THREE.RectAreaLight( 0x0000ff, 15, 20, 400 );
		rectLight3.position.set( 25, 5, 0 );
		rectLight3.name = 'rect3'
		scene.add( rectLight3 );
		let helper3 = new RectAreaLightHelper( rectLight3 )
		helper3.position.set( 25, 5, 0 );
		helper3.name = 'helper3'
		scene.add( helper3 );



	

		const geoFloor = new THREE.BoxGeometry( 2000, 0.1, 2000 );
		const matStdFloor = new THREE.MeshStandardMaterial( { color: 0x808080, roughness: 0.1, metalness: 0 } );
		const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
		mshStdFloor.position.set(0, 0, 5 )
		scene.add( mshStdFloor );


		const geoWall =  new THREE.BoxGeometry( 2000, 2000, 0.1 );
		const matStdWall = new THREE.MeshStandardMaterial( { color: 0x808080, roughness: 0.1, metalness: 0 } );
		const mshStdWall = new THREE.Mesh( geoFloor, matStdFloor );
		mshStdFloor.position.set(0, 0,-5 )
		scene.add( mshStdFloor );
	
		
		


		const controls = new OrbitControls( camera, framework.renderer.domElement );
		controls.target.copy( meshKnot.position );
	

		let t = window.performance.now();
		
		let BackdropLights = {
		 	name: 'BackdropLight',
		    scene: scene,
		    camera: camera,
		    tag : 'generic',
		    backgroundDark : true,
		    responsive : true,
		    sceneTimer : window.performance.now(),
		    sceneLength: 19000,
	      	onUpdate : function(framework){

	      		const toggleOnBeat = (lightPattern) => {
	      			let index = 0
	      			const toggleMesh = (lightID) => {
		      			let mesh = scene.getObjectByName(lightID)
		      			if(mesh.visible ){
			      				mesh.visible = false
			      			}else{
			      				mesh.visible = true
			      			}
			      			
			      		}
		      			while(index !== lightPattern.length){
		      				toggleMesh(lightPattern[index])
		      				index ++
		      			}
	      		}
	      		const toggleMesh = (lightID) => {
	      			let mesh = scene.getObjectByName(lightID)
	      			if(mesh.visible ){
	      				mesh.visible = false
	      			}else{
	      				mesh.visible = true
	      			}
	      			
	      		}

	      		
				const mesh = scene.getObjectByName( 'meshKnot' );
				if(framework.streamData.frequencies.bassFr > 1.17 && window.performance.now() - t > 0.15 ){
					toggleOnBeat([ 'rect2', 'helper2'])
					mesh.rotation.y += 0.02;
					framework.sceneTimer = window.performance.now();
					t = window.performance.now()

				}
				mesh.rotation.y += 0.02;
				

	      	}
		}
		return BackdropLights
	}
		
