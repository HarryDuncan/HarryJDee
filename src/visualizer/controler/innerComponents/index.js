import React from 'react';

import {default as Play} from './play';
import {default as Rewind} from './rewind';
import {default as Forward} from './forward';
import {default as Loop} from './loop';
import {default as Name} from './name';


import {default as CustomArrange} from './customArrange'

export function renderPlay(position) {
  return <Play
    position={position}
    playing={this.state.playing}
    handlePause={this.handlePause}
    handlePlay={this.handlePlay}
    handleHoverOver={this.handleHoverOver}
    handleHoverOut={this.handleHoverOut}
    renderPlayIcon={this.renderPlayIcon}
    iconSize={this.state.iconSize}/>
}

export function renderRewind() {
  return <Rewind
    handleHoverOver={this.handleHoverOver}
    handleHoverOut={this.handleHoverOut}
    handleRewind={this.handleRewind}
    rewindHover={this.state.rewindHover}
    rewindHoverIcon={this.state.rewindHoverIcon}
    rewindIcon={this.state.rewindIcon}
    iconSize={this.state.iconSize}/>
}

export function renderForward() {
  return <Forward
    handleHoverOver={this.handleHoverOver}
    handleHoverOut={this.handleHoverOut}
    endPlay={this.endPlay}
    forwardHover={this.state.forwardHover}
    forwardHoverIcon={this.state.forwardHoverIcon}
    forwardIcon={this.state.forwardIcon}
    iconSize={this.state.iconSize}/>
}

export function renderLoop() {
  return <Loop
    handleHoverOver={this.handleHoverOver}
    handleHoverOut={this.handleHoverOut}
    handleLoop={this.handleLoop}
    loopHover={this.state.loopHover}
    loop={this.state.loop}
    loopIcon={this.state.loopIcon}
    loopEngagedIcon={this.state.loopEngagedIcon}
    iconSize={this.state.iconSize}/>
}

export function renderName() {
  return <Name
    hideSeeking={this.props.hideSeeking}
    setNameDisplayRef={this.setNameDisplayRef}
    scrollMarquee={this.state.scrollMarquee}
    scrollMarqueeFunc={this.scrollMarquee}
    scrollStyle={this.state.scrollStyle}
    artist={this.props.audioFiles[this.state.currentTrackIdx].artist}
    title={this.props.audioFiles[this.state.currentTrackIdx].title}
    width={this.state.nameWidth}/>
}







export function renderCustomArrange() {
  return <CustomArrange
    order={this.props.rearrange}
    setStyle={this.setStyle}
    setAudio={this.setAudio}
    componentObj={this.componentObj}/>
}