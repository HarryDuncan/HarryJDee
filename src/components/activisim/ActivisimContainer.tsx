import React from 'react';
import {connect} from "react-redux";
import {getCampaignData} from './../../store/campaign/campaign.actions';
import DonationSection from './donation/DonationSection';
import {DonationReceipt} from './donation/DonationReceipt'
import { Stack, IStackTokens, IStackStyles  ,  ITextFieldStyles,Link} from 'office-ui-fabric-react';
import { closeDonationModal} from './../../store/campaign/campaign.actions'
import { Dropdown , IDropdownStyles, IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import {NoActiveCampaign} from './../../animations/staticScenes/NoActiveCampaign';
// import {AidsDay} from './content';

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
				<div className="page activisim-page">
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
			let componentStr = `./content/${this.state.viewingCampaign['Component'].toLowerCase()}/${this.state.viewingCampaign['Component']}`
			const CampaignComponent = React.lazy(() => import('./content/amazon'));
			return(
				<React.Suspense fallback={<div/>}>
					<div className="page">
						<DonationReceipt isOpen={this.props.showModal} campaignData={this.state.viewingCampaign} closeCallback={this._closeModal} donationReceipt={this.props.donationReceipt} />
						<DonationSection amount={this.state.viewingCampaign['Total']} campaign={this.state.viewingCampaign} contributionCount={this.state.viewingCampaign['ContributionCount']} />
						<CampaignComponent campaignData={this.state.viewingCampaign}/>
					</div>
				</React.Suspense>
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