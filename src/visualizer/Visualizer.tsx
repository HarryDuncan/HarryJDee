import * as React from 'react';
import {useState} from 'react';
import { Stack} from 'office-ui-fabric-react';
import AudioPlayer from './controler/audioPlayer';
import { IconButton, IIconProps, initializeIcons } from 'office-ui-fabric-react';
import {connect} from 'react-redux';

export interface IVisualizerWrapperProps {
  audioContext : any;
  trackProps : any[];
  selectedTrack: any;
  hideNav : (fullScrn : boolean ) => void;
  exitCallback : () => void;
  isLight : boolean;
}

const quitIcon: IIconProps = { iconName: 'Cancel'  ,styles: {root: { fontSize: '26px' }}};
const lightQuit : IIconProps = {iconName :'Cancel', styles : {root : {color : 'white'}}}


const Visualizer: React.FunctionComponent<IVisualizerWrapperProps> = props => {
  
 const [isFullScreen, toggleFullScreen] = useState(false)
 const [isActive, toggleActive] = useState(true)


 const  _getTrackID = () => {
  	for(let i in props.trackProps){
  		if(props.trackProps[i]['Title'] === props.selectedTrack){
  			return Number(i)
  		}
  	}
    return 0
  }

  const exitTrack = () => {
    props.exitCallback()
  }

  const toggleVisSize = () => {
    props.hideNav(!isFullScreen)
    toggleFullScreen(!isFullScreen)
  }

  const toggleActiveScreen = (active: boolean) => {
    toggleActive(active)
  }
  if(!isFullScreen){
    toggleVisSize()
  }
  
  return (
    <div className={'fill'} >
      <Stack horizontal >
        <IconButton iconProps={props.isLight ? lightQuit : quitIcon } title="Quit" ariaLabel="Quit" onClick={exitTrack} className={'exit-icon' + (isActive ? ' ' : " hide-ico")}/>
      </Stack>
      <AudioPlayer isLight={props.isLight} audioContext={props.audioContext} audioFiles={props.trackProps} visualizerFullScreen={isFullScreen} activeCB={toggleActiveScreen} currentTrackId={_getTrackID()}/>
    </div>
  );
};


const mapStateToProps = (state : any) => ({
 isLight : state.app.isLight
});

const mapDispatchToProps = {
 
};

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer)

