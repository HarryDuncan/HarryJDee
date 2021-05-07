import * as React from 'react';
import {useState} from 'react';
import {connect} from 'react-redux'
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  PrimaryButton,
  Modal,
  IconButton,
  IIconProps,
  Stack,
  IStackTokens,
  Link,
  IButtonStyles,
  Text,
  Label
} from 'office-ui-fabric-react';
import { CardElement, useStripe, useElements  } from "@stripe/react-stripe-js";
import { ITextFieldStyleProps, ITextFieldStyles, TextField } from 'office-ui-fabric-react/lib/TextField';
import { ILabelStyles, ILabelStyleProps } from 'office-ui-fabric-react/lib/Label';
import {donationReceived} from 'store/campaign/campaign.actions';
import axios from "axios";
import './CheckoutStyles.scss'


const cancelIcon: IIconProps = { iconName: 'Cancel' };

  const iframeStyles = {
    base: {
      color: "#black",
      fontSize: "16px",
      borderBottom: '1px solid black',
      iconColor: "#fff",
      "::placeholder": {
        color: "black"

      }
    },
    invalid: {
      iconColor: "#a4262c",
      color: "#a4262c"
    },
    complete: {
      iconColor: "#0b6a0b"
    }
  };


  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };


const buttonStyles : Partial<IButtonStyles> = {
  root : {
   
    backgroundColor: 'rgb(214, 34, 29)',
    border : 'rgb(214, 34, 29)',
    height : '3em',
  },
  rootHovered:{
    backgroundColor : 'rgb(156, 11, 6)',
      border : 'rgb(214, 34, 29)',
  },
  label : { 
    color : 'white',
    
    fontSize : '1.6em'
   }

}

const stackTokens: IStackTokens = { childrenGap: 10 };

interface IDonationModalProps {
  donationReceived : any;
  activeCampaign : any;
  onSuccessCallback : () => void;
}

const DonationModal: React.FunctionComponent<IDonationModalProps> = (props) => {
  const [isModalOpen, toggleModal] = useState(false);
  const [displayPayment, togglePayment] = useState(false)

  const [donationAmount, setAmount] = useState(0)
  const [formData, updateData] = useState({'Name' : '',  'Email' : ''})
  const [formValid, toggleDisable] = useState(false)


  const [cardValid, toggleCardValid] = useState(false)


  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();





const _setAmount = (ev : any, value? : string) => {
  if(value !== undefined && !isNaN(Number(value))){
    setAmount(Number(value))
  }
}


const showModal = () => {
    toggleModal(true)
  }

const hideModal = () => {
    toggleModal(false)
  }

const _setData = (ev: any , value? :string) => {
    if(value !== undefined){
        let updateForm :any = Object.assign({}, formData)
        updateForm[ev.target.ariaLabel] = value
        updateData(updateForm)
        toggleDisable(validateForm(updateForm))
    }
  }

const _continueToPayment = (data: any) => {
    togglePayment(true)
  }

const validateForm = (formObj : any) => {
    let formObjArray = Object.keys(formObj)
    for(let i in formObjArray){
      if(formObj[formObjArray[i]] === ''){
        return false
      }
    }
    if(formObj['Email'] !== undefined && formObj['Email'].indexOf('@') === -1){
      return false
    }
    return true
  }

  // Payment methods
  const handleCardDetailsChange = (ev : any) => {
    console.log(ev)
    if(ev.complete){
      toggleCardValid(true)
    }else{
      toggleCardValid(false)
    }
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError(true);
  };


  // Handling checkout
  const _handleFormSubmit = async(ev: any) => {
    ev.preventDefault();
    if(elements !== null && stripe !== null){

    // Makes billing details obj 
    const billingDetails = {
      name: formData['Name'],
      email: formData['Email'],
      
    };

  
    setProcessingTo(true);
    const cardElement = elements.getElement("card");

      try {
        const { data: clientSecret } = await axios.post(`${process.env.REACT_APP_API_URL}/payment_intents`, {
          amount: donationAmount * 100,
          checkoutItems : [],
          donation : true 
        });


          // @ts-ignore
          const paymentMethodReq = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: billingDetails
          });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessingTo(false);
        return;
      }
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessingTo(false);
        return;
      }else{
        props.onSuccessCallback()
        props.donationReceived(paymentMethodReq['paymentMethod'], formData, donationAmount)
      }
      
    } catch (err) {
      setProcessingTo(false);
      setCheckoutError(err.message);
    }
    

    }
  };


  return (
    <div>
      <PrimaryButton styles={buttonStyles} onClick={showModal} text="Donate Today" />
      <Modal
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isModeless={false}
        containerClassName={contentStyles.container}
        key={`Donation Modal ${isModalOpen}`}
      >
        <div className={contentStyles.header} >
          <span>Donate to {props.activeCampaign['Name']}</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={hideModal}
          />
        </div>
           <div className={contentStyles.body}>
            {!displayPayment?
                 <div>
                  <Stack tokens={stackTokens}>
                    
                    <TextField  styles={getStyles}  description="Donations made here are not eligible for tax credit" required={true} ariaLabel={'Amount'} label={'Amount (AUD) $'} value={String(donationAmount)} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_setAmount}/>

                    <TextField  styles={getStyles}  required={true} ariaLabel={'Name'} label={'Full Name'} value={formData['Name']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_setData}/>
                 
                    <TextField  styles={getStyles}  required={true}  ariaLabel={'Email'} label={'Email'} value={formData['Email']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_setData}/>
                   
                    <PrimaryButton text={'Continue To Payment'} disabled={!formValid} onClick={_continueToPayment} />

                     <div>
                      <Text>By continuing you agree to Harry.J Dee's <a className={'tcLink'}href='https://harryjdee.com/TermsAndConditions' target='_blank'>Terms and Conditions</a></Text>
                    </div>
                  </Stack>
              </div>
              
              :
             

               <div>
                  <Stack tokens={stackTokens}>
                     <div className={'card-element-container'}>
                      <Label styles={getLabelStyles} required={true}>Card Details</Label>
                        <CardElement
                        // @ts-ignore
                          options={cardElementOpts}
                          onChange={handleCardDetailsChange}
                        />
                      </div>
                   
                    <PrimaryButton text={isProcessing? "Processing Payment" : `Donate AUD $${donationAmount}`} disabled={!cardValid ||  !stripe} onClick={_handleFormSubmit} />
                    {isProcessing?
                        <div className={'checkout-footer-item'}>
                          <span className={'sub-text'}>Please do not reload the page</span>
                        </div>
                      : 
                      null
                    }
                   
                    <div className={'stripe-div'}>
                      <Text>Secure Payments Powered By</Text>
                      <a href={'https://stripe.com/'} target={'_blank'}>
                        <img className={'img-log'} src={'/images/icons/stripe-logo.png'}/>
                      </a>
                    </div>
                    <div className={'checkout-footer-item'}>
                      <span >Harry.J Dee never stores your card details</span>
                    </div>
                     <div className={'checkout-footer-item'}>
                      <span >By continuing you agree to Harry.J Dee's <a className={'tcLink'}href='https://harryjdee.com/TermsAndConditions' target='_blank'>Terms and Conditions</a></span>
                    </div>
                  </Stack>
                </div>
              }
              </div>
      </Modal>
    </div>
  );
};
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    height: document.documentElement.clientWidth <= 900 ? '100vh' : 'auto',
    width: document.documentElement.clientWidth <= 900 ? '100vw' : 'auto',
    maxHeight : document.documentElement.clientWidth <= 900 ? '100vh' : 'auto',
    maxWidth: document.documentElement.clientWidth <= 900 ? '100vw' : 'auto',
    padding : document.documentElement.clientWidth <= 900 ? '2%' : '0%',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  header: [
 
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid white`,
      color: theme.palette.neutralPrimary,
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
const toggleStyles = { root: { marginBottom: '20px' } };
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




function getStyles(props: ITextFieldStyleProps): Partial<ITextFieldStyles> {
  const { required } = props;
  return {
    
    subComponentStyles: {
      label: getLabelStyles,
    },
  };
}

function getLabelStyles(props: ILabelStyleProps): ILabelStyles {
  const { required } = props;
  return {
    root: required && {
        width: document.documentElement.clientWidth <= 900 ? '100%' :'35%',
        minWidth: '70px',
        padding: '11px 0',
        color: 'black',
        overflow: 'hidden',
        fontSize: '15px',
        fontWeight: '700',
        letterSpacing: '0.2em',
      
        whiteSpace: 'nowrap'
   
    },
  };
}


const mapStateToProps = (state : any) => ({
 
  activeCampaign : state.campaigns.activeCampaign
});

const mapDispatchToProps = {
 donationReceived
};

export default connect(mapStateToProps, mapDispatchToProps)(DonationModal)








