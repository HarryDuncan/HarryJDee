import React, {useState, useEffect, useRef} from 'react';
import './CSSAnimationHookStyles.scss';
import {useOnScroll} from './onScroll/OnScroll';

//###################################################
// Used to animate components on mount
// ##################################################



interface IAnimationHookProps{
	// This is a variable that will trigger the change/ animation - must be false by default
	togglerVar : boolean;

	// The animation type
	animationType : string

	// If toggle type is on scroll -then animation will take place when intersecting
	isOnScroll? : boolean;
	maintain? : boolean;
}

export const CSSAnimationHook: React.FunctionComponent<IAnimationHookProps> = (props) => {

	// gets the classname so it does the correct animation 
	const getClassName = (animationType : string) =>{
		switch(animationType){
			case 'slideRight':
				return 'slide-right'
			case 'slideLeft':
				return'slide-left'
			default: 
				return 'fade-in'
		}
	}

	const itemRef = useRef(null);
	const [isSet, toggleSet] = useState(props.togglerVar)
	const [className, setClassName] = useState(getClassName(props.animationType))
	const [isIntersecting, setIntersecting] = useState(false)
	const [maintain, setMaintain] = useState(true)


	useEffect(() => {
		toggleSet(props.togglerVar)
	}, [props.togglerVar])


	

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
  
  	if(itemRef !== null && itemRef !== undefined && itemRef.current !== undefined && props.isOnScroll){  
  		// @ts-ignore
  		 observer.observe(itemRef.current)
  	}
   
   
  }, [itemRef.current])


  useEffect(() => {
  	
  	if(isIntersecting){
  		toggleSet(isIntersecting)
  	}
  	
  }, [isIntersecting])

	return (
			<div ref={itemRef} className={`${!isSet? "out-of-view " : className} hook-item`}>
			{props.children}
			</div>)
}