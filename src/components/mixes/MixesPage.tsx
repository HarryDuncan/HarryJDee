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
			return(
				<div className='page'>
					<div className={"mixes-section " + (this.state.isFullScreen ?  "" : "border")}>
					<Stack tokens={stackTokens}>	
						{!this.state.isPlaying?
							<div className={'mixes-header'} >
								<h1 className='mixes-title'>
									Listen to a mix with a visualizer.
								</h1>
								<p className={'warning-message'}>Visualizer may potentially trigger seizures for people with photosensitive epilepsy. Viewer discretion is advised.</p>
							</div>
							: null
						}
						
					
							{this.props.mixes.map(item => (<Stack.Item  align="stretch"><MixItem key={`${Number(item)} Mix Ittem`} hideNav={this.hideNavCB} exitTrackCallback={this.stopVisualizer} itemProps={item} hideMixItems={this.state.isPlaying} selectedCallback={this.playTrack} allTracks={this.props.mixes}/></Stack.Item>))}
						
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
