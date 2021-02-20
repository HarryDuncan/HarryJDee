import React from 'react';
import {connect} from "react-redux";
import {getCampaignData} from './../../store/campaign/campaign.actions';
import DonationSection from './DonationSection';
import { Stack, IStackTokens, IStackStyles  ,  ITextFieldStyles,Link} from 'office-ui-fabric-react';
import {DisplayText} from './../ui/customTextField/DisplayText';
import {DonationReceipt} from './DonationReceipt'
import { closeDonationModal} from './../../store/campaign/campaign.actions'
import {AidsRibbon} from './../../animations/staticScenes/activisimItems/AidsRibbon';
import {InfoSection} from './InfoSection';
import { Dropdown , IDropdownStyles, IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import {NoActiveCampaign} from './../../animations/staticScenes/NoActiveCampaign';
import './activism.css';



const stackStyles: IStackStyles = {
  root: {
   height : document.documentElement.clientWidth <= 900 ? 'fit-content' : '90vh',
   flexGrow: '100'
  
  },
};


const dropdownStyles: Partial<IDropdownStyles> = {
  dropdownItem : {
    width : '80%  !important',
    display : 'flex',
  },
  
  dropdown: {
                 width: '80%' , clear: 'both', margin: '0 auto',
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


const stackTokens: IStackTokens = { childrenGap: document.documentElement.clientWidth <= 900 ? '2em' : 0 };


interface IActivisimProps {
	getCampaignData : any;
	campaignData : any;
	activeCampaign : any;
	showModal :  boolean;
	donationReceipt : any;
	closeDonationModal : any;
}


interface IActivisimState{
	viewingCampaign: any;
}

 const onRenderOption = (option: IDropdownOption|undefined): JSX.Element => {
    if(option === undefined){
      return <div/>
    }else if(option.data === undefined){
       return(
        <div>
         <span>{option.text}</span>
        </div>
      );
    }else{
      return(
        <div style={{width : '400px', display : 'flex', flexDirection : 'row'}}>
         <span className={'dropdown-main-title'}>{option.text}</span>
        </div>
      );
    }
    
  };



class ActivisimContainer extends React.Component<IActivisimProps, IActivisimState>{
	constructor(props : IActivisimProps){
	super(props);
	   this.state ={
	    viewingCampaign : this.props.activeCampaign
	   }
  	}
	public componentDidMount = () => {
		this.props.getCampaignData()
	}

	public _getOptions = () => {
		let optionArr : any[] = this.props.campaignData.map((item : any) =>  ( {'key' : item['ID'], 'text' : item['Name'], 'data' : {'EndDate' : item['EndDate']} }))
		return optionArr
	}


	
	public render(){
		let selectionOptions = this._getOptions()
		if(this.state.viewingCampaign['Name'] === 'No Active Campaign' || this.state.viewingCampaign['Name'] === ''){
			return(
				<div className="page">
					<NoActiveCampaign />
					<div className='activism-container inactive-campaign no-border'>
						<div className={'inactive-background'}/>
						<div className={'inactive-content'}>
							<h1>Harry J Dee Activisim</h1>
							<p>
								Harry J Dee creates work and runs campaigns to generate awareness and support for various causes.
								By Selling prints, pieces, collecting donations and creating content to inform and empower.
							</p>

							<p>There are currently no active campaigns at the moment</p>
							

							 <Dropdown
					 			
	                            options={selectionOptions}
	                            onChange={this._campaignSelected}
	                            onRenderOption={onRenderOption}
	                            styles={dropdownStyles}
	                            placeHolder="View Previous Campaigns"
	                             />
	                    </div>

					</div>
					
				</div>
				);
		}else{
			return(
				<div className="page">
					<DonationReceipt isOpen={this.props.showModal} campaignData={this.state.viewingCampaign} closeCallback={this._closeModal} donationReceipt={this.props.donationReceipt} />
					<div className='activism-container'>
						<div className={'activism-menu'}>
						 
                         <div className={'thanks-to'}>
                         	<p className={'thanks-text'}>This campaign is closed.<br/>Special thanks to
                         	<a className={'thanks-link'} href={'https://www.barbapresents.com/'} target={'_blank'}>Barba Presents</a> and 
                         	<a className={'thanks-link'} href={'https://thorneharbour.org'} target={'_blank'}>Thorne Harbour Health</a>
                         	</p>
                         </div>
                         <div className={'dd-container'}>
	                         <Dropdown
						 			placeHolder="View Previous Campaigns"
		                            options={selectionOptions}
		                            onChange={this._campaignSelected}
		                            onRenderOption={onRenderOption}
	                             	/>
                         </div>
						</div>
						<div className='activism-section'>
							<Stack styles={stackStyles} tokens={stackTokens}>
								<Stack.Item align="stretch">
									<h1 className={'campaign-title'}>{this.state.viewingCampaign['Name']} </h1>
								</Stack.Item>
								 <Stack.Item align="stretch" >
									<DisplayText customStyleObj={customStyles} text={this.state.viewingCampaign['Supporting']}/>
									<InfoSection />
								</Stack.Item>
							</Stack>
							<div className={'action-section'}>
								<DonationSection amount={this.state.viewingCampaign['Total']} campaign={this.state.viewingCampaign} contributionCount={this.state.viewingCampaign['ContributionCount']}  />
							</div>
						</div>
						<AidsRibbon/>
					</div>
				</div>
				);
		}
		
	}

	private _campaignSelected = (event: any, option: any) => {
		let selectedCampaign = this.props.campaignData.filter((item : any)=> item['ID'] === option['key'])
		this.setState({
			viewingCampaign : selectedCampaign[0]
		})
		
	}

	private _closeModal = () => {
		this.props.closeDonationModal()
	}
} 

const mapStateToProps = (state : any) => ({
	campaignData : state.campaigns.campaignArray,
	activeCampaign : state.campaigns.activeCampaign,
	showModal : state.campaigns.showDonationReceipt,
	donationReceipt : state.campaigns.donationReceipt
});

const mapDispatchToProps = {
	getCampaignData,
	closeDonationModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivisimContainer)