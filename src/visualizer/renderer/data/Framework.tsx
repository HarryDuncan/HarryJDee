import {dataPoints} from './dataPoints'
import Metronome from '../functions/audioFunctions/Metronome'
let framework = {
        initialized : false,
        isPlaying : false,
        paused: false,
        audioStartOffset: 0,
        audioStartTime: 0,
       
        responsiveVisualizerIndex : 0,
        nonResponsiveVisualizerIndex : 0,
        cameraPaused: false,
        automaticSwitchingOn: true,
        breakAnimation  : false,

        //Audio context 
        source : null,
        audioBuffer: null,
        data : null,
        analyserNode : null,

        // Three JS part of the framework
        renderer : null,
        camera: null,
        scene : null,

        // If background is dark change logo to light version
        bgDark : false,

        // Data Points For Audio 
        streamData : dataPoints,
        metro : Metronome,

        sceneTimer : null,
        sceneData : {},


    }

export default framework