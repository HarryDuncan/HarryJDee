import React from 'react';
import {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {getCampaignData} from './../../store/campaign/campaign.actions';
import DonationSection from './donation/DonationSection';
import {DonationReceipt} from './donation/DonationReceipt'
import { Stack, IStackTokens, IStackStyles  ,  ITextFieldStyles,Link} from 'office-ui-fabric-react';
import { closeDonationModal} from './../../store/campaign/campaign.actions'
import { Dropdown , IDropdownStyles, IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import {NoActiveCampaign} from './../../animations/staticScenes/NoActiveCampaign';
import {ContentContainer} from './campaignContent/ContentContainer';
// import {AidsDay} from './content';

import './activism.scss';



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



const ActivisimContainer: React.FunctionComponent<IActivisimProps> = props => {

	const [viewingCampaign, changeCampaign] = useState(props.activeCampaign)
	

	const _getOptions = () => {
		let optionArr : any[] = props.campaignData.map((item : any) =>  ( {'key' : item['ID'], 'text' : item['Name'], 'data' : {'EndDate' : item['EndDate']} }))
		return optionArr
	}

	const _campaignSelected = (event: any, option: any) => {
		let selectedCampaign = props.campaignData.filter((item : any)=> item['ID'] === option['key'])
		changeCampaign(selectedCampaign[0])
		
		
	}

	const _closeModal = () => {
		props.closeDonationModal()
	}

	useEffect(() => {
			props.getCampaignData()
		   
		}, []);
	




	let selectionOptions = _getOptions()

	// Returns the home page - if there are no campaings active
	if(viewingCampaign['Name'] === 'No Active Campaign' || viewingCampaign['Name'] === ''){
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
                            onChange={_campaignSelected}
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
				{viewingCampaign['ExternalDonation'] === 1?
					<div>
						<DonationReceipt isOpen={props.showModal} campaignData={viewingCampaign} closeCallback={_closeModal} donationReceipt={props.donationReceipt} />
						<DonationSection amount={viewingCampaign['Total']} campaign={viewingCampaign} contributionCount={viewingCampaign['ContributionCount']} />
					</div>
					:
					null
				}
				<ContentContainer campaignTitle={viewingCampaign['Component']} campaignData={viewingCampaign} />
			</div>
			
			);
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