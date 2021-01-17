import React from 'react';
import {connect} from 'react-redux'
// import {ExternalLinkWidget} from './../ui/externalLinkWidget/ExternalLinkWidget'
import { Stack, IStackTokens, IStackStyles  ,  ITextFieldStyles} from 'office-ui-fabric-react';
import CartListItem from './../CartListItem';
import { List } from 'office-ui-fabric-react/lib/List';
import './../notificationStyles.scss';
import {ReactComponent as Thanks} from './thankyou.svg'
import {Insta} from './../../externalLinkWidget/Icons/Insta'
import ResendReceipt from './../../resendReceipt/ResendReceipt';

 interface IReceiptProps{
 	receiptObject : any;
 	activeCampaign : any;
 }

 interface IReceiptState{
 
 }


const stackStyles: IStackStyles = {
  root: {
    height: '100%',
    width: '100%',
    flexGrow: '100',
    margin: '0 auto',
  },
  inner : {
  	width : '100%'
  }
};


class Receipt extends React.Component<IReceiptProps, IReceiptState>{
	constructor(props : IReceiptProps){
		super(props)
		this.state = {
			
		}
	}


	public returnReceipt = () =>{
		 return (
        	<List items={this.props.receiptObject['items']} onRenderCell={this._onRenderCell} />
    		);
	}


	
	public render(){
		 	return(
		 		<div className={'receipt-wrapper'} >
					<Stack styles={stackStyles} verticalAlign="space-between">
						<Stack.Item align="stretch">
							
								<Thanks className={'thanks-svg'} />
							
						</Stack.Item>
					<Stack.Item align="stretch">
						<div className={'content-inner'}>
							{this.props.receiptObject['contribution'] !== undefined && this.props.receiptObject['contribution'] !== null?
								<h2 style={{clear :'both' , margin : '0 auto'}} >Your Purchase just raised ${this.props.receiptObject['contribution']} AUD for the {this.props.activeCampaign['Name']} campaign</h2>
								:
								null
							}
						</div>
					</Stack.Item>
					<Stack.Item align="stretch">
						<div className={'order-summary'}>
							<h3>Order Summary</h3>
							<div className={'receipt-summary-container'}>
								{this.returnReceipt()}
							</div>
							<h4 style={{clear :'both'}} >Total: ${this.props.receiptObject['total']} AUD </h4>
						</div>
					</Stack.Item  >
					<Stack.Item grow={3} align="stretch">
						<div className='receipt-footer'>
							<p>A receipt will be sent to {this.props.receiptObject['email']}</p>
							<ResendReceipt />
						</div>
					</Stack.Item>
				</Stack>
			</div>
			)
			
	}

	private _onRenderCell(item: any, index: number | undefined): JSX.Element {
      return (
        <div style={{clear : 'both'}}>
         <CartListItem item={item} itemType={'Receipt'} index={index}/>
        </div>
      );
    }

}




const mapStateToProps = (state: any) => ({
	receiptObject: state.shop.receiptObject,
	activeCampaign : state.campaigns.activeCampaign
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt)