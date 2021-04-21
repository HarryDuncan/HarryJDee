import WebGLView from './webgl/WebGLView';
import GUIView from './gui/GUIView';
import React, { Component } from "react";



export default class InteractiveParticle extends Component {

	componentDidMount(){
		this.initWebGL();
		
		this.addListeners();
		this.animate();
		this.resize();
	}

	initWebGL() {
		this.webgl = new WebGLView(this);
		this.container.appendChild(this.webgl.renderer.domElement);
	}

	

	addListeners() {
		this.handlerAnimate = this.animate.bind(this);

		window.addEventListener('resize', this.resize.bind(this));
		window.addEventListener('keyup', this.keyup.bind(this));
		
		const el = this.webgl.renderer.domElement;
		
	}

	animate() {
		this.update();
		this.draw();

		this.raf = requestAnimationFrame(this.handlerAnimate);
	}

	// ---------------------------------------------------------------------------------------------
	// PUBLIC
	// ---------------------------------------------------------------------------------------------

	update() {
		
		if (this.webgl) this.webgl.update();
		if (this.gui) this.gui.update();
	}

	draw() {
		if (this.webgl) this.webgl.draw();
	}

	// ---------------------------------------------------------------------------------------------
	// EVENT HANDLERS
	// ---------------------------------------------------------------------------------------------

	resize() {
		if (this.webgl) this.webgl.resize();
	}

	keyup(e) {
		// g
		if (e.keyCode == 71) { if (this.gui) this.gui.toggle(); }
	}

	click(e) {
		this.webgl.next();
	}


	 render() {
	
	    return (
	        <div className={'container'} 
	          ref={thisNode => this.container=thisNode}>
	        
	      </div>  
	    )
  	}
}