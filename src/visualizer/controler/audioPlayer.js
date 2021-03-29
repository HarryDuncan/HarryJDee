import React, { Component } from "react";
import icons from './assets/index';
//Functions that render dumb components
import {
  renderPlay,
  renderRewind,
  renderForward,
  renderLoop,
  renderName,
  
 
  renderCustomArrange
} from "./innerComponents/index";

import {Volume} from './innerComponents/Volume'
import {SeekBar} from './innerComponents/SeekBar'

import IdleTimer from 'react-idle-timer'
//methods
import functions from "./functions/index";
//style sheet
import "./audioPlayerStyle.scss";
import {connect} from 'react-redux';
//prop types
import { audioPlayerPropTypes } from "./spec/propTypes";



class AudioPlayer extends Component {
  constructor(props) {
    super(props);
   
    this.rewindTimeout = null;
    this.seekingInterval = null;
    this.nameDisplay = null;

    this.state = {
                  showClassName : "active-audio",
                  currentTrackIdx : this.props.currentTrackId,
                  seekerVal : "0",
                  volume : "75",
                  playing : false,
                  paused : false,
                  muted : false,
                  volumePreMute : "75",
                  duration : "0:00",
                  currentAudioTime : "0:00",
                  recentlyRewound : false,
                  loaded : false,
                  loop : false,
                  playHover : false,
                  playStarted : false,
                  muteHover : false,
                  forwardHover : false,
                  rewindHover : false,
                  loopHover : false,
                  playIcon : icons.playIcon,
                  playHoverIcon : icons.playHoverIcon,
                  pauseIcon : icons.pauseIcon,
                  pauseHoverIcon : icons.pauseHoverIcon,
                  volumeIcon : icons.volumeIcon,
                  volumeEngagedIcon : icons.volumeEngaged,
                  muteIcon : icons.muteIcon,
                  muteEngagedIcon : icons.muteEngagedIcon,
                  forwardIcon : icons.forwardIcon,
                  forwardHoverIcon : icons.forwardHoverIcon,
                  rewindIcon : icons.rewindIcon,
                  rewindHoverIcon : icons.rewindHoverIcon,
                  loopIcon : icons.loopIcon,
                  loopEngagedIcon : icons.loopEngagedIcon,
                  nameWidth : "22%",
                  sliderClass : "slider",
                  fontFamily : "sans-serif",
                  fontWeight : "100",
                  fontSize : "small",
                  fontColor : "black",
                  playerWidth : "20rem",
                  iconSize : "1rem",
                  hideSeeking : false,
                  scrollMarquee : false,
                  scrollDifference : 0,
                  scrollTime : 0,
                  scrollStyle : {
                    marginLeft : "0"
                  }
  }
    //reference object for rendering inner components
    this.componentObj = {
      play: renderPlay.bind(this),
      rewind: renderRewind.bind(this),
      forward: renderForward.bind(this),
      loop: renderLoop.bind(this),
      name: renderName.bind(this),
      
    };

    //binding methods
    this.mountComponent = functions.mountComponent.bind(this);
    this.setScrollSize = functions.setScrollSize.bind(this);
    this.setNameDisplayRef = functions.setNameDisplayRef.bind(this);
    this.setOpts = functions.setOpts.bind(this);
    this.setStyle = functions.setStyle.bind(this);
    this.setAudio = functions.setAudio.bind(this);
    this.setPercentages = functions.setPercentages.bind(this);
    this.startPlay = functions.startPlay.bind(this);
    this.endPlay = functions.endPlay.bind(this);
    this.handlePlay = functions.handlePlay.bind(this);
    this.handlePause = functions.handlePause.bind(this);
    this.handleProgress = functions.handleProgress.bind(this);
    this.handleSeekSlider = functions.handleSeekSlider.bind(this);
    this.handleSeek = functions.handleSeek.bind(this);
    this.setTime = functions.setTime.bind(this);
    this.secondsToClock = functions.secondsToClock.bind(this);
    this.loadDuration = functions.loadDuration.bind(this);
    this.handleVolume = functions.handleVolume.bind(this);
    this.handleMute = functions.handleMute.bind(this);
    this.handleRewind = functions.handleRewind.bind(this);
    this.handleHoverOver = functions.handleHoverOver.bind(this);
    this.handleHoverOut = functions.handleHoverOut.bind(this);
    this.scrollMarquee = functions.scrollMarquee.bind(this);
    this.renderPlayIcon = functions.renderPlayIcon.bind(this);
    this.renderMuteIcon = functions.renderMuteIcon.bind(this);
    this.handleLoop = functions.handleLoop.bind(this);
    this.renderCustomArrange = renderCustomArrange.bind(this);

    this.handleOnAction = this.handleOnAction.bind(this)
    this.handleOnActive = this.handleOnActive.bind(this)
    this.handleOnIdle = this.handleOnIdle.bind(this)
  }

  componentDidMount() {
    this.mountComponent();
    this.handlePlay()
  }


  handleOnActive(){
    this.props.activeCB(true)
    document.exitPointerLock();
    this.setState({
      showClassName : 'active-audio'
    })
  }

  handleOnAction(){
    this.props.activeCB(true)
    document.exitPointerLock();
    this.setState({
      showClassName : 'active-audio'
    })
  }

  handleOnIdle(){
    this.props.activeCB(false)
    let el = document.getElementById('vizualizer-full')
    el.webkitRequestFullScreen()
    console.log('asdsd')
    this.setState({
      showClassName : 'idle-audio'
    })
  }
  render() {
    let title = this.props.audioFiles[this.state.currentTrackIdx].Title;
    const isMobile = window.innerWidth <= 900;
    return (
        <div className={"audio-player "} style={this.setStyle()}>
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          timeout={1000 * 6000 * 0.081}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
        {this.setAudio(this.props.audioContext)}
         {isMobile ? 
          <div className={this.state.showClassName}>
            <div className={"wrapper " + (this.props.isLight? 'light-screen' : '')}>
              {this.props.hideRewind ? null : this.componentObj.rewind()}
               {this.componentObj.play("first")}
              {/* Forward */}
              {this.props.hideForward ? null : this.componentObj.forward()}
            </div>
            
                       
            <SeekBar seekerVal={this.state.seekerVal} handleSeekSlider={this.handleSeekSlider} handleSeek={this.handleSeek} currentAudioTime={this.state.currentAudioTime} duration={this.state.duration} />
          
          
          

            <div className={'mobile-bottom-wrapper'}>
              <Volume renderMuteIcon={this.renderMuteIcon} handleVolume={this.handleVolume}  volume={this.state.volume}/>
              {this.componentObj.name()}
            </div>

          </div>
          :
            <div className={this.state.showClassName}>
            <div className={"wrapper " + (this.props.isLight? 'light-screen' : '')}>
              {this.props.hideRewind ? null : this.componentObj.rewind()}
               {this.componentObj.play("first")}
              {/* Forward */}
              {this.props.hideForward ? null : this.componentObj.forward()}
            </div>
            
            <SeekBar seekerVal={this.state.seekerVal} handleSeekSlider={this.handleSeekSlider} handleSeek={this.handleSeek} currentAudioTime={this.state.currentAudioTime} duration={this.state.duration} />
          
            {this.props.hideName ? null : this.componentObj.name()}
            <Volume renderMuteIcon={this.renderMuteIcon} handleVolume={this.handleVolume}  volume={this.state.volume}/>

          </div>
         }
        </div>
      );
  }
}

AudioPlayer.propTypes = audioPlayerPropTypes;

const mapDispatchToProps = {

}
const mapStateToProps  = (state) => ({
  isLight : state.app.isLight
})

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer)
