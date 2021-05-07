import * as React from 'react'
import {useState} from 'react'
import { Dropdown , IDropdownStyles, IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import CalloutWrapper from './../../ui/calloutWrapper/CalloutWrapper';
import { PrimaryButton} from 'office-ui-fabric-react';
import DonationModal from './../../stripe/DonationModal';
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements, Elements  } from "@stripe/react-stripe-js";

interface IDonationSectionProps{
  amount : number;
  contributionCount : number;
  campaign : any;
}

 
const DonationSection: React.SFC<IDonationSectionProps> = props => {
	const [donationModalKey, toggleKey] = useState(false)
	const stripePromise = loadStripe(String(process.env.REACT_APP_PUBLISHABLE_KEY));

	const _donationSuccess = () => {
		
		toggleKey(!donationModalKey)
	}

    return(
      <div className={'donation-section'}>
	      <h1 className={'campaign-subtitle'}>Thanks to {props.contributionCount} generous donors we have raised... </h1>
	       <h1 className={'campaign-total'}>AUD ${props.amount}</h1>
	       {props.campaign['Status'] === 'Active'?
	       	<Elements stripe={stripePromise}>
        		<DonationModal key={`Donation Modal Key ${donationModalKey}`} onSuccessCallback={_donationSuccess} />
        	</Elements>
        	: 
        	null
	   		}
	       
      </div>     
    )
 


                               
}


export default DonationSection
 