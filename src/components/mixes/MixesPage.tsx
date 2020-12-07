import React from 'react';
import {connect} from "react-redux";
import {getMixes, toggleNav} from './../../store/app/app.actions'
import {ExternalLinkWidget} from './../ui/externalLinkWidget/ExternalLinkWidget'
import { Stack, IStackTokens } from 'office-ui-fabric-react';
import {DisplayText} from './../ui/customTextField/DisplayText';
import {ReactComponent as SoundCloud} from './../ui/externalLinkWidget/Icons/SoundCloud.svg'

import MixItem from './MixItem';


interface IMixesProps {
	mixes : any[];
	toggleNav : any;
	getMixes : any;
}

interface IMixesState{
	isPlaying: boolean;
	isFullScreen : boolean;
}


const stackTokens: IStackTokens = { childrenGap: 40 };

class MixesPage extends React.Component<IMixesProps, IMixesState>{
	constructor(props: IMixesProps){
		super(props)
		this.state = {
			isPlaying : false,
			isFullScreen : false
		}
	}
	
	public componentDidMount = () => {
		if(this.props.mixes.length === 0){
			this.props.getMixes()
		}
	}

	public playTrack = () =>{
		this.setState({
			isPlaying : true
		})
	}

	public stopVisualizer = () => {
		this.setState({
			isPlaying : false
		})
	}


	public hideNavCB = (fullScreen: boolean) => {
		this.props.toggleNav(fullScreen)
		this.setState({
			isFullScreen : fullScreen
		})
	}
	render(){
		if(this.props.mixes.length === 0){
			return <div/>
		}else{
			// console.log(this.props.mixes)
			// let mixObj = [
			// {'title' : 'Red Room', 'src' : './mixes/EasyListening.wav', 'description' : 'Dreamy soundscapes and relaxing tunes.'},
			// {'title' : 'Groove Anthology', 'src' : './mixes/GrooveAnthology.wav', 'description' : 'A fun, eclectic and genre jumping mix.'},
			// // {'title' : 'Test', 'src' : './01.mp3', 'description' : 'A fun, eclectic and genre jumping mix.'}
			// ]
			return(
				<div className='page'>
					<div className={"mixes-section " + (this.state.isFullScreen ?  "" : "border")}>
					<Stack tokens={stackTokens}>	
						{!this.state.isPlaying?
							<div className={'mixes-header'} >
								<h1 className='mixes-title'>
									Press play to listen to a mix with a visualizer.
								</h1>
								<p className={'warning-message'}>Visualizer may potentially trigger seizures for people with photosensitive epilepsy. Viewer discretion is advised.</p>
							</div>
							: null
						}
						
					
							{this.props.mixes.map(item => (<Stack.Item  align="stretch"><MixItem key={`${Number(item)} Mix Ittem`} hideNav={this.hideNavCB} exitTrackCallback={this.stopVisualizer} itemProps={item} hideMixItems={this.state.isPlaying} selectedCallback={this.playTrack} allTracks={this.props.mixes}/></Stack.Item>))}
						

						{!this.state.isPlaying?
							<div className={'mixes-footer'} >
								<h1 className='mixes-subtitle'>
									Mixes and tracklists are available on SoundCloud.
									
								</h1>
								<a className={'scLink'} href="https://soundcloud.com/harry-j-dee" target="_blank"><SoundCloud className={'icon-svg-mix'}/></a>
								<p className={'disclamer-message'}>All tracks used were legally purchased. Please support artists and lables when acquiring music.</p>
							</div>
							: null
						}
					</Stack>
						
					</div>
					
				</div>
				);
		}
		
	}
	
} 

const mapStateToProps = (state : any) => ({
	mixes : state.app.mixes
});

const mapDispatchToProps = {
	getMixes,
	toggleNav
};

export default connect(mapStateToProps, mapDispatchToProps)(MixesPage)
