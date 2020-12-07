import * as React from 'react';
import {useState} from 'react'


export interface ISwipeHandlerProps {
	registerActions : (ActionType : string) => void;
 	childElement : JSX.Element;
 	hideActionCB : () => void;
}


export const SwipeHandler: React.FunctionComponent<ISwipeHandlerProps> = props => {


	const [x_coord , updateX] = useState(0)
	const [delta, updateDelta] = useState(0)

	const _handleTouchAction = (e: any) =>{
		updateX(e.touches[0].pageX)
		props.hideActionCB()

	}

	const _handleTouchEnd = (e: any) => {
		if(e.changedTouches[0].pageX > x_coord + 100){
			props.registerActions('Left Swipe')
		}else if(e.changedTouches[0].pageX < x_coord - 100){
			props.registerActions('Right Swipe')
		}
		updateX(0)

	}


	return (<div onTouchStart={_handleTouchAction} onTouchEnd={_handleTouchEnd} >{props.childElement}</div>)
}; 


