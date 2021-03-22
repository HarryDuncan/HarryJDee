import * as THREE from "three";

let camera, scene, renderer, stats, root;
let mouseX = 0, mouseY = 0;



export function CrazySpiral(framework) {

			let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;
			camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 15000 );
			camera.position.z = 500;

			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0xffffff );

			const geometry = new THREE.BoxGeometry( 100, 100, 100 );
			const material = new THREE.MeshNormalMaterial();

			root = new THREE.Mesh( geometry, material );
			root.position.x = 1000;
			scene.add( root );

				const amount = 200;
				let object, parent = root;

				for ( let i = 0; i < amount; i ++ ) {

					object = new THREE.Mesh( geometry, material );
					object.position.x = 100;

					parent.add( object );
					parent = object;

				}

				parent = root;

				for ( let i = 0; i < amount; i ++ ) {

					object = new THREE.Mesh( geometry, material );
					object.position.x = - 100;

					parent.add( object );
					parent = object;

				}

				parent = root;

				for ( let i = 0; i < amount; i ++ ) {

					object = new THREE.Mesh( geometry, material );
					object.position.y = - 100;

					parent.add( object );
					parent = object;

				}

				parent = root;

				for ( let i = 0; i < amount; i ++ ) {

					object = new THREE.Mesh( geometry, material );
					object.position.y = 100;

					parent.add( object );
					parent = object;

				}

				parent = root;

				for ( let i = 0; i < amount; i ++ ) {

					object = new THREE.Mesh( geometry, material );
					object.position.z = - 100;

					parent.add( object );
					parent = object;

				}

				parent = root;

				for ( let i = 0; i < amount; i ++ ) {

					object = new THREE.Mesh( geometry, material );
					object.position.z = 100;

					parent.add( object );
					parent = object;

				}


				//

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				

				

				//

				// document.addEventListener( 'mousemove', onDocumentMouseMove );

				// //

				// window.addEventListener( 'resize', onWindowResize );



			    let crazySpiral = {
			        name: 'crazySpiral',
			        responsive : false,
			        scene: scene,
			        camera: camera,
			        sceneLength: 8000,
			        onUpdate: function(framework) {
			        	const time = Date.now() * 0.001 + 10000;
						const rx = Math.sin( time * 0.7 ) * 0.2;
						const ry = Math.sin( time * 0.3 ) * 0.1;
						const rz = Math.sin( time * 0.2 ) * 0.1;

						framework.camera.position.x += ( mouseX - framework.camera.position.x ) * 0.05;
						framework.camera.position.y += ( - mouseY - framework.camera.position.y ) * 0.05;

						framework.camera.lookAt( scene.position );

						root.traverse( function ( object ) {

							object.rotation.x = rx;
							object.rotation.y = ry;
							object.rotation.z = rz;

						} );

					

			   
			        function onWindowResize() {
						windowHalfX = window.innerWidth / 2;
						windowHalfY = window.innerHeight / 2;

						camera.aspect = window.innerWidth / window.innerHeight;
						camera.updateProjectionMatrix();

						renderer.setSize( window.innerWidth, window.innerHeight );

					}

					function onDocumentMouseMove( event ) {

						mouseX = ( event.clientX - windowHalfX ) * 10;
						mouseY = ( event.clientY - windowHalfY ) * 10;

					}

				
				}
			}

		return crazySpiral
}
			

