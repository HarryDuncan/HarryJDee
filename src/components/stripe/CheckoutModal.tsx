import * as React from 'react';
import {useState} from 'react';
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
  Text,
  Label

} from 'office-ui-fabric-react';
import { CardElement, useStripe, useElements  } from "@stripe/react-stripe-js";
import { ITextFieldStyleProps, ITextFieldStyles, TextField } from 'office-ui-fabric-react/lib/TextField';
import { ILabelStyles, ILabelStyleProps } from 'office-ui-fabric-react/lib/Label';
import axios from "axios";
import './CheckoutStyles.scss'



interface ICheckoutModalProps{
  isOpen : boolean;

  totalPrice : number;
  checkoutData : object;
  onSuccessCallback : (paymentData : object, customerData : object , billingData : object) => void;
  outOfStockCallback : () => void;
  closeModalCallback : () => void;

  shipping: any[];
}


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

const cancelIcon: IIconProps = { iconName: 'Cancel' };



const stackTokens: IStackTokens = { childrenGap: document.documentElement.clientWidth <= 900 ? 0 : 10 };
export const CheckoutModal: React.FunctionComponent<ICheckoutModalProps> = (props) => {
  const [isModalOpen, toggleOpen ] = useState(false)
  const [formValid, toggleDisable] = useState(false)


  // Shipping details
  const [displayPayment, togglePayment] = useState(false)
  const [formData, updateData] = useState({ 'Name' : '',  'Email' : '', 'Address': '','City' : '', 'State' : '', 'ZIP' : '', 'Country' : ''})
  

  // Billing
  const [billingData, updateBilling] = useState({'Address': '','City' : '', 'State' : '', 'ZIP' : '', 'Country' : ''})
  const [billingValid, toggleBilling ] = useState(false)
  const [cardCompleted, toggleCardValid] = useState(false)

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const hideModal = () => {
    props.closeModalCallback()
    toggleOpen(false)
  }

  const _handleToken = (paymentData : any) => {
    props.onSuccessCallback(paymentData['paymentMethod'], formData, billingData)
  }

  

// Form data methods 
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
  const _setData = (ev: any , value? :string) => {
    if(value !== undefined){
        let updateForm :any = Object.assign({}, formData)
        updateForm[ev.target.ariaLabel] = value

        let billing : any = Object.assign({}, billingData)
        billing['Address'] = updateForm['Address']
        billing['City'] = updateForm['City']
        billing['State'] = updateForm['State']
        billing['ZIP'] = updateForm['ZIP']
        billing['Country'] = updateForm['Country']
        updateBilling(billing)
        updateData(updateForm)
        toggleDisable(validateForm(updateForm))
        toggleBilling(validateForm(billing))
    }
 
  }

  const _updateBillingData = (ev: any, value? : string) => {
     if(value !== undefined){
        let updatedBilling :any = Object.assign({}, billingData)
        updatedBilling[ev.target.ariaLabel] = value
        updateBilling(updatedBilling)
        toggleBilling(validateForm(updatedBilling))
    }
  }

  const _continueToPayment = () => {
    togglePayment(true)
  }

  // Payemnt methods
  const handleCardDetailsChange = (ev : any) => {
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
      address: {
        city: billingData['City'],
        line1: billingData['Address'],
        state: billingData['State'],
        postal_code: billingData['ZIP']
      }
    };

  
    setProcessingTo(true);
    const cardElement = elements.getElement("card");

      try {
        const { data: clientSecret } = await axios.post(`${process.env.REACT_APP_API_URL}/payment_intents`, {
          amount: props.totalPrice * 100,
          checkoutItems : props.checkoutData
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
        props.onSuccessCallback(paymentMethodReq['paymentMethod'], formData, billingData)
        hideModal()
      }
    }catch (err) {

      
      
      if(err.message === 'Request failed with status code 409'){
        setCheckoutError('An item in your cart is out of stock');
        props.outOfStockCallback()
      }else{
        setCheckoutError(err.message);
      }
      setProcessingTo(false);
      
    }
    

    }
  };

 
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onDismiss={hideModal}
        isBlocking={true}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.header}>
          <span >Checkout</span>
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
                  
                  <TextField  styles={getStyles}  required={true} ariaLabel={'Name'} label={'Full Name'} value={formData['Name']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_setData}/>
               
                  <TextField  styles={getStyles}  required={true}  ariaLabel={'Email'} label={'Email'} value={formData['Email']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_setData}/>
                 
                  <TextField styles={getStyles}  required={true} ariaLabel={'Address'} label={'Address'} value={formData['Address']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_setData}/>
                  
                  <TextField styles={getStyles}  required={true} ariaLabel={'City'} label={'City'} value={formData['City']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_setData}/>

                  <TextField styles={getStyles}  required={false} ariaLabel={'State'} label={'State'} value={formData['State']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_setData}/>
                
                  <TextField styles={getStyles}  required={true} ariaLabel={'ZIP'} label={'ZIP'} value={formData['ZIP']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_setData}/>
                
                  <TextField  styles={getStyles}  required={true}  ariaLabel={'Country'} label={'Country'} value={formData['Country']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_setData}/>
                 
                 
                  <PrimaryButton text={'Continue To Payment'} disabled={!formValid} onClick={_continueToPayment} />

                   <div>
                    <Text>By continuing you agree to Harry.J Dee's <Link>Terms and Conditions</Link></Text>
                  </div>
                </Stack>
            </div>
            
            :
           

             <div>
                <Stack tokens={stackTokens}>
        
                  <TextField styles={getStyles}  required={true} ariaLabel={'Address'} label={'Billing Address'} value={billingData['Address']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_updateBillingData}/>
                  
                  <TextField styles={getStyles}  required={true} ariaLabel={'City'} label={'City'} value={billingData['City']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_updateBillingData}/>
                
                  <TextField styles={getStyles}  required={true} ariaLabel={'State'} label={'State'} value={billingData['State']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_updateBillingData}/>
                
                  <TextField styles={getStyles}  required={true} ariaLabel={'ZIP'} label={'ZIP'} value={billingData['ZIP']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_updateBillingData}/>
                
                  <TextField  styles={getStyles}  required={true}  ariaLabel={'Country'} label={'Country'} value={billingData['Country']} underlined={document.documentElement.clientWidth <= 900  ? false : true} onChange={_updateBillingData}/>
                 
                   <div className={'card-element-container'}>
                    <Label styles={getLabelStyles} required={true}>Card Details</Label>
                      <CardElement
                      // @ts-ignore
                        options={cardElementOpts}
                        onChange={handleCardDetailsChange}
                      />
                    </div>
                 
                  <PrimaryButton text={isProcessing? "Processing Payment" : `Pay AUD $${props.totalPrice}`} disabled={!(billingValid && cardCompleted) ||  !stripe} onClick={_handleFormSubmit} />
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
                    <span >By continuing you agree to Harry.J Dee's <Link>Terms and Conditions</Link></span>
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
    minWidth: document.documentElement.clientWidth <= 900 ? 'auto' : '35em',
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
    root:  {
        width: document.documentElement.clientWidth <= 900 ? '100%' : '35%',
        minWidth: '70px',
        padding: '11px 0',
        color: 'black',
        overflow: 'hidden',
        fontSize: '15px',
        fontWeight: '600',
        letterSpacing: '0.2em',
      
        whiteSpace: 'nowrap'
   
    },
  };
}

