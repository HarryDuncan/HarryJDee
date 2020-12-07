import * as React from 'react';
import {useState} from 'react';
import './swipe.css';
import {ReactComponent as Left} from './Left.svg'
import {ReactComponent as Right} from './Right.svg'

export interface ISwipeSignalProps {
	show : boolean;
}




export const SwipeSignal: React.FunctionComponent<ISwipeSignalProps> = props => {

	if(!props.show){
		return (<div/>)
	}else{
		return (
			<div className={'swipe-signal'}>
				<div className={'swipe-signal-wrapper'}> 
					<Left className='swipe-left-svg' />
						<p>Swipe to change</p>
					<Right className='swipe-left-svg'/>
				</div>
			</div>)
	}
	
}; 