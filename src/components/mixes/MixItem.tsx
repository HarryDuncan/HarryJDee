import * as React from 'react'
import {useState} from 'react'
import {Visualizer} from './../../visualizer';
import './mixes.css'
import moment from 'moment';
 
interface IMixItemProps {
      itemProps : any;
      selectedCallback: ()  => void;
      hideMixItems: boolean;
      allTracks : any[];
      exitTrackCallback : () => void;
      hideNav : (fullScrn : boolean) => void;
    }

const MixItem: React.FunctionComponent<IMixItemProps > = props => {
 
 const [isSelected, toggleSelected] = useState(false)

 const [hovered, toggleHovered] = useState(false)
const [audioCont, setAudioContext] = useState(null) 
  
  const isHovered = (e : any) => {
  	toggleHovered(true)
  }
  const notHovered = (e : any) => {
  	toggleHovered(false)
  }
  const sectionSelected = (e: any) => {
    let context;
    // @ts-ignore
    let AudioContext : any = window.AudioContext || window.webkitAudioContext;  
    if (AudioContext) {
        context = new AudioContext();
      }
    if(audioCont === null){
      setAudioContext(context)
    }
  	if(!isSelected){
  		props.selectedCallback()
  	}
  	toggleSelected(!isSelected)
  }


  const unselect = () => {
    toggleSelected(false)
    toggleHovered(false)
    props.exitTrackCallback()
    props.hideNav(false)
  }

  const hideNavCB = (fullScrn: boolean) => {
    props.hideNav(fullScrn)
  } 
// 

  	if(!isSelected && props.hideMixItems){
  		return <div/>
  	}else{

  		   return(
		    	<div>
		    	{isSelected? 
		    		  <Visualizer audioContext={audioCont} trackProps={props.allTracks} selectedTrack={props.itemProps.Title} hideNav={hideNavCB} exitCallback={unselect} />
		    			:
				      <div className={'mix-section'} >
				          <div className={'mix-details-div'}>
				          	<div className={'mix-item-header'} >
					          	<h1 className={'mix-item-title'}>{props.itemProps.Title}</h1>
                      <img className={'mix-cover'} src={`/hjdmix/${props.itemProps['Url']}.jpg`} />
					          	<div className={'btn-container'}>
					          		<img onClick={sectionSelected} onMouseOver={isHovered} onMouseLeave={notHovered} src={hovered? require('./../../visualizer/controler/assets/play-dark.png') : require('./../../visualizer/controler/assets/play-light.png')} />
					         	 </div>
					        </div>
				          	<p className={'mix-item-description'} >{props.itemProps.MixDescription}</p>
                    <p>Recorded: {moment(new Date(props.itemProps.PublishDate)).format('DD/MM/YYYY')}</p>
				          </div>
				          
				      </div>  
				} 
				</div>  
		    )
  	}
 
 
 }


export default MixItem
 