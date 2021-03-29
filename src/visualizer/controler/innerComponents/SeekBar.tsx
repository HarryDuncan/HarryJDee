import React from 'react';
import {useState} from 'react';
import { Slider, ISliderStyles } from 'office-ui-fabric-react/lib/Slider';
import { DefaultButton,DirectionalHint, Callout, Link, getTheme, FontWeights, mergeStyleSets, Text } from 'office-ui-fabric-react';
import { IStackTokens, Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';


const SliderStyles : Partial<ISliderStyles> = {root : {margin : 0, width : '100%'}, container : {margin: 0}, valueLabel : {display : 'none'}};

interface ISeekProps{
  seekerVal: any;
  handleSeekSlider: any;
  handleSeek: any;
  width: number;
  currentAudioTime: number|string,
  duration: string|number
}

export const SeekBar : React.FunctionComponent<ISeekProps> = (props) => { 
 


  return (
    
     
      <div className="slide-container above-visualizer" >
       <div className="audio-player-time">
          {`${props.currentAudioTime}`}
        </div>
        <Slider
          max={100}
          value={props.seekerVal}
          onChange={props.handleSeekSlider}
          onChanged={props.handleSeek}
          styles={SliderStyles}
        
        />
        <div className="audio-player-time">
          {`${props.duration}`}
        </div>
       
         
      </div>

  )
}
