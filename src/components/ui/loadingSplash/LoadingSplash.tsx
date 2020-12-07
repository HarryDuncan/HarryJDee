import React, { FunctionComponent, useState } from 'react';
import './LoadingSplashStyles.scss';
import {ReactComponent as SplashShadow } from './LogoShadow.svg'
import {ReactComponent as SplashWhite} from './white.svg'
interface ILoadingSplashProps {
	show : boolean;
}


const LoadingSplash:FunctionComponent<ILoadingSplashProps> = (props : any ) => {
	if(props.show){
		return (
  		<div className={'splash-container'}>
  			<div className={'splash-overlay'}/ >
  			<div className={'splash-overlay-1'}>
  				// <SplashWhite className={'splash-img'}/>
  			</div>
 			<SplashShadow className={'splash-img'}/>
  		</div>
  		)	
	}else{
		return (
	  		<div/>
  		)	
	}
  
}


export default LoadingSplash;