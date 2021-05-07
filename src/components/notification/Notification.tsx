import * as React from 'react';
import {Icon, DefaultButton, Callout, Link, getTheme, FontWeights, mergeStyleSets, getId } from 'office-ui-fabric-react';
import {connect} from 'react-redux'
import {PrimaryButton} from 'office-ui-fabric-react';
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements, Elements  } from "@stripe/react-stripe-js";
import { Redirect} from "react-router-dom";

import {CartList} from './CartList'
import {removeItemFromCart, checkout, updateInventory} from 'store/shop/shop.actions'
import {CheckoutModal} from 'components/stripe/CheckoutModal'




// Themed styles for the example.
const theme = getTheme();
const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'block',
    position : 'absolute',
    right: '0px',
    cursor : 'pointer',
    margin: '0 0 0 100px',
    minWidth: 80,
    fontSize:'1.5em',
    maxHeight: 32,
    zIndex: 99999,
  },
   buttonAreaMobile: {
    verticalAlign: 'top',
    display: 'block',
    position : 'absolute',
    top: '0.8em',
    right: '3.5em',
    cursor : 'pointer',
    fontSize:'1.5em',
    maxHeight: 32,
    zIndex: 900,
  },
  callout: {
    width: 300,

  },
  header: {
    padding: '18px 24px 12px',
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      fontWeight:600,
    },
  ],
  inner: {
    height: '100%',
    padding: '0 24px 20px',
  },
  actions: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    whiteSpace: 'nowrap',
    clear : 'both',
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary,
    },
  ],
});

interface ICartNotificationProps {
  cart : any[];
  customClassName : string;
  removeItemFromCart : any;
  updateInventory : any;
  checkout : any;
  total : number;
  hideCart : boolean;
  redirectCallback : () => void;
  shippingData : any;
  isMobile? : boolean;
}
interface ICartNotificationState {
  isCalloutVisible?: boolean;
  shouldRedirect : boolean;
  checkoutOpen : boolean;
}

class CartNotification extends React.Component<ICartNotificationProps, ICartNotificationState> {
  constructor(props : ICartNotificationProps){
  super(props)
     this.state = {
      isCalloutVisible: false,
      shouldRedirect: false,
      checkoutOpen : false
    };
  }
  

  private _menuButtonElement = React.createRef<HTMLDivElement>();
  private _labelId: string = getId('callout-label');
  private _descriptionId: string = getId('callout-description');

  public render(): JSX.Element {
    const { isCalloutVisible } = this.state;
    const stripePromise = loadStripe(String(process.env.REACT_APP_PUBLISHABLE_KEY));

    return (
      <div  >
        <div onClick={this._onShowMenuClicked} className={this.props.cart.length === 0 ? 'hide' : this.props.isMobile? styles.buttonAreaMobile : styles.buttonArea} ref={this._menuButtonElement}>
          <Icon iconName={'Shop'} className={this.props.customClassName + " shop-cart-icon"} />
          <div className={this.props.cart.length === 0 ? 'hide' : 'item-number'}>
            <span key={`${this.props.cart.length} CartList`} className={this.props.customClassName} >{this.props.cart.length}</span>
          </div>
        </div>
        {this.state.isCalloutVisible && this.props.cart.length > 0 && !this.props.hideCart &&(
          <Callout
            className={styles.callout}
            ariaLabelledBy={this._labelId}
            ariaDescribedBy={this._descriptionId}
            role="alertdialog"
            gapSpace={0}
            target={this._menuButtonElement.current}
            onDismiss={this._onCalloutDismiss}
            setInitialFocus={false}>
            <div className={styles.header}>
            
            </div>
            <div className={styles.inner}>
              <CartList key={`${this.props.cart.length} CartList Items`} items={this.props.cart}  />
              <div className={styles.actions}>
              <div style={{clear : 'both'}}>
                <span className={'total-txt'}>Total: ${this.props.total} AUD</span>
                <br/>
                <span className={'shipping'}>Free Shipping Worldwide</span>
              </div>
               <PrimaryButton onClick={this._showCheckout} text={'Checkout'} />
              </div>
            </div>
          </Callout>
        )}
        {this.state.shouldRedirect?  <Redirect to="/" push/> : <div/>}
         <Elements stripe={stripePromise}>
           <CheckoutModal
              key={`CheckoutModal ${String(this.state.checkoutOpen)}`}
              isOpen={this.state.checkoutOpen}
              totalPrice={this.props.total}
              checkoutData={this.props.cart}
              onSuccessCallback={this._handleToken}
              outOfStockCallback={this._outOfStock}
              closeModalCallback={this._closeCheckout}
              shipping={this.props.shippingData}
             />
        </Elements>
      </div>
    );
  }

  private _closeCheckout = () => {
    this.setState({
      checkoutOpen : false
    })
  }

  private _showCheckout = () => {
    this.setState({
      checkoutOpen : true
    })
  }
  private _outOfStock = () => {
    this.setState({
      shouldRedirect : true,
    })
    this.props.redirectCallback()
    this.props.updateInventory(true)
  }
  private _handleToken = (token : any, customerData : any, billingData : any) => {
    this.setState({
      shouldRedirect : true,
    })
    this.props.redirectCallback()
    this.props.checkout(token, {'name' : token['id'], 'price' : this.props.total, 'currency' : "AUD" }, customerData,  billingData)
  }

  private _onShowMenuClicked = (): void => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible,
    });
  };

  private _onCalloutDismiss = (): void => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  
}


const mapStateToProps = (state : any) => ({
  cart : state.shop.cart,
  total : state.shop.total,
  hideCart : state.shop.hideCart,
  shippingData : state.shop.shippingData
})

const mapDispatchToProps = {
removeItemFromCart,
checkout,
updateInventory
}

export default connect(mapStateToProps, mapDispatchToProps)(CartNotification)
