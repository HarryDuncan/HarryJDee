import * as React from 'react'
import {useState} from 'react'
import CalloutWrapper from './../ui/calloutWrapper/CalloutWrapper';
import { PrimaryButton} from 'office-ui-fabric-react';
import {
  Modal,
  IconButton,
  IModalStyles,
  IIconProps,
  getTheme,
   FontWeights,
  mergeStyleSets
} from 'office-ui-fabric-react';
import { Stack, IStackTokens, IStackStyles  ,  ITextFieldStyles} from 'office-ui-fabric-react';
import ResendReceipt from './../ui/resendReceipt/ResendReceipt'
import {ReactComponent as Thanks} from './../ui/notification/notificationPages/thankyou.svg'

interface IDonationReceiptProps{
	isOpen : boolean;
  donationReceipt : any;
  campaignData : any;
  closeCallback : () => void;
}
 


const stackStyles: IStackStyles = {
  root: {
    height: '100%',
    width: '100%',
    flexGrow: '100',
  },
};
const theme = getTheme();

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
export const DonationReceipt: React.SFC<IDonationReceiptProps> = props => {
	

	const onDismiss = () => {
		props.closeCallback() 
	}
	if(props.donationReceipt['donor'] === undefined){
		return <div/>
	}else{
  
		 return(
		        <div>
		          <Modal
		            isOpen={props.isOpen}
		            onDismiss={onDismiss}
		            isBlocking={false}
		            containerClassName={contentStyles.main}
		          >
		           <div className={contentStyles.header}>
		            <IconButton
		                  styles={iconButtonStyles}
		                  iconProps={cancelIcon}
		                  ariaLabel="Close popup modal"
		                  onClick={onDismiss}
		                />
		          </div>
			          <Stack>
                  <Thanks className={'thanks-svg'} />
			             <div className={'donation-modal-section'}>
						          <h1 className={'campaign-subtitle'}>Thank you {props.donationReceipt['donor']['Name']} for your generous donation </h1>
					            <p className={'info-receipt'}>Your donation of AUD $ {props.donationReceipt['amount']} has gone to support the David Williams Fund</p>
                      <p className={'info-receipt'}>{props.campaignData['EmailContent']}</p>
                      <p className={'info-receipt'}>For more info see <a className={'info-link'} href="https://thorneharbour.org/news-events/news/5-ways-be-part-world-aids-day-2020/">Thorn Harbour Health</a></p>
                   </div>
  					      <div className='receipt-footer'>
  							     <p>A receipt will be sent to {props.donationReceipt['donor']['Email']}</p>
                     <ResendReceipt />
  						    </div>  
					       </Stack>
		          </Modal>
		        </div>
		    
		    )        
	}
                          
}




const contentStyles = mergeStyleSets({
  main : {
    height: document.documentElement.clientWidth <= 900 ? '100vh' : 'auto',
    width: document.documentElement.clientWidth <= 900 ? '100vw' : 'auto',
    maxHeight : document.documentElement.clientWidth <= 900 ? '100vh' : 'auto',
    maxWidth: document.documentElement.clientWidth <= 900 ? '100vw' : '50em',
  },
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  header: [
    
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});

 