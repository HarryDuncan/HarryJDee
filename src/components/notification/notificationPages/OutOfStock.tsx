import React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import {connect} from 'react-redux'
import { Stack, IStackTokens, IStackStyles  ,  ITextFieldStyles} from 'office-ui-fabric-react';

 interface IOutOfStockProps{
 	receiptObject: any;
 	cart : any;
 }

 interface IOutOfStockState{
 	missingItems : any[];
 }

const stackStyles: IStackStyles = {
  root: {
    height: '100%',
    width: '100%',
    flexGrow: '100',
  },
};

class OutOfStock extends React.Component<IOutOfStockProps, IOutOfStockState>{
	constructor(props : IOutOfStockProps){
		super(props)
		this.state = {
			missingItems : []
		}
	}

	// public getMissingObjects = () => {
	// 	let missingArray : any = this.state.missingItems
	// 	for(let i in this.props.receiptObject['Error']){
	// 		for(let t in this.props.cart){
	// 			console.log(this.props.cart[t])
	// 			if(this.props.cart[t]['ID'] === Number(this.props.receiptObject[i])){
	// 				missingArray.push(this.props.cart[t])
					
	// 				break;
	// 			}
	// 		}
	// 	}
	// 	this.setState({
	// 		missingItems : missingArray
	// 		})
	// }

	// public componentDidMount = () => {
	// 	this.getMissingObjects()
	// }

	
	public render(){
	
		return(
			<Stack styles={stackStyles} verticalAlign="space-between">
					<Stack.Item>
					<h1>Sorry we are out of stock</h1>
					</Stack.Item>
					<Stack.Item>
					<FocusZone>
						<div>
							<h3>Please removed items from your cart</h3>
							<h3>You have not been charged for your items</h3>
						</div>
						</FocusZone>
					</Stack.Item>
				</Stack>
				
					
				 
			)
			
	}
			

}


const mapStateToProps = (state: any) => ({
	receiptObject: state.shop.receiptObject,
	cart : state.shop.cart,
  	total : state.shop.total,
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(OutOfStock)