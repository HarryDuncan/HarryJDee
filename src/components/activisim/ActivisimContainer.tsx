import React from 'react';
import {connect} from "react-redux";
import {getCampaignData} from './../../store/campaign/campaign.actions';
import DonationSection from './DonationSection';
import { Stack, IStackTokens, IStackStyles  ,  ITextFieldStyles} from 'office-ui-fabric-react';
import {DisplayText} from './../ui/customTextField/DisplayText';
import {DonationReceipt} from './DonationReceipt'
import { closeDonationModal} from './../../store/campaign/campaign.actions'
import {AidsRibbon} from './../../Animations/StaticScenes/Aids';
import {InfoSection} from './InfoSection';
import './activism.css';



const stackStyles: IStackStyles = {
  root: {
   height : document.documentElement.clientWidth <= 900 ? 'fit-content' : '90vh',
   flexGrow: '100',
  },
};



const customStyles : Partial<ITextFieldStyles> = {
	root : {
		'margin' : 0,
		'padding' : 0,
		
	},
  field : {
    'fontWeight' : 500,
    'fontSize' : document.documentElement.clientWidth <= 900 ? '1.4em': '1.2em',
    'marginTop' : 0,
	'paddingTop' : 0,
	'lineHeight': '120%',
	'letterSpacing': '0.15em',
	'height' :'fit-content',
  }
}


const stackTokens: IStackTokens = { childrenGap: document.documentElement.clientWidth <= 900 ? '6em' : 0 };


interface IActivisimProps {
	getCampaignData : any;
	campaignData : any;
	activeCampaign : any;
	showModal :  boolean;
	donationReceipt : any;
	closeDonationModal : any;

}
class ActivisimContainer extends React.Component<IActivisimProps>{
	

	public componentDidMount = () => {
		this.props.getCampaignData()
	}
	
	public render(){
		return(
			<div className="page">
				<DonationReceipt isOpen={this.props.showModal} campaignData={this.props.activeCampaign} closeCallback={this._closeModal} donationReceipt={this.props.donationReceipt} />
				<div className='activism-section'>
					<Stack styles={stackStyles} tokens={stackTokens}>
						<Stack.Item align="stretch">
							<h1 className={'campaign-title'}>{this.props.activeCampaign['Name']} </h1>
						</Stack.Item>
						 <Stack.Item align="stretch" >
							<DisplayText customStyleObj={customStyles} text={this.props.activeCampaign['Supporting']}/>
						
							<InfoSection />
						</Stack.Item>
					</Stack>
					<div className={'action-section'}>
						<DonationSection amount={this.props.activeCampaign['Total']} campaign={this.props.activeCampaign} contributionCount={this.props.activeCampaign['ContributionCount']}  />
					</div>
				</div>
				<AidsRibbon/>
			</div>
			
		);
	}


	private _closeModal = () => {
		this.props.closeDonationModal()
	}
} 

const mapStateToProps = (state : any) => ({
	campaignData : state.campaigns.campaignData,
	activeCampaign : state.campaigns.activeCampaign,
	showModal : state.campaigns.showDonationReceipt,
	donationReceipt : state.campaigns.donationReceipt
});

const mapDispatchToProps = {
	getCampaignData,
	closeDonationModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivisimContainer)