import React from 'react';
import {connect} from "react-redux";
import {NavLinks} from './../../ui/customNavLinks/NavLinks'
import SettingsPageInner from './SettingsPageInner'
import {formatRawData, siteSettings} from './../../../data'

interface ISettingsPageState {
	settingData :any;
	section : string;
}
interface ISettingsPageProps {
	siteSettings : any;

}
class SettingsPage extends React.Component<ISettingsPageProps, ISettingsPageState>{
	constructor(props: ISettingsPageProps){
	super(props)
		this.state = {
			settingData : formatRawData(this.props.siteSettings, siteSettings),
			section : 'Site Settings'
		}
	}

	// public componentDidMount = () => {
	// 	this.props.initializeContentEditor(this.props.type)
	// }
	


	public render(){
			return(
			<div className='content-page'>
			<div className='side-nav'>
				<NavLinks navType={'Settings'} onClickCallback={this.changeSelection} navItems={['General Settings','Pages','Store','Accounts']}/>
			</div>
				<div className='setting-editor'>
					<SettingsPageInner key={this.state.section} type={this.state.section} data={this.state.settingData}/>
				</div>
			</div>
			);
		}

	private changeSelection = (arg: string) => {
		this.setState({
			section : arg,
			settingData : formatRawData(this.props.siteSettings, siteSettings)
		})
	}
		
} 

const mapStateToProps = (state: any) => ({
 	siteSettings : state.app.settings,
 	
})
 
const mapDispatchToProps = {
	
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
