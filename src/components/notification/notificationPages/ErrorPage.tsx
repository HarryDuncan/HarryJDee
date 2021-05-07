import React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import {connect} from 'react-redux'


 interface IErrorProps{
 
 }

 interface IErrorState{
 
 }


class ErrorPage extends React.Component<IErrorProps, IErrorState>{
	constructor(props : IErrorProps){
		super(props)
		this.state = {
			
		}
	}


	
	public render(){
		return(
				<FocusZone>
					<h1>Error Occured</h1>
				 </FocusZone>
			)
			
	}
			
}


const mapStateToProps = (state: any) => ({
	
})

const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage)