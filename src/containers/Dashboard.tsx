import React from 'react';
import LoginPage from './../components/dashboard/LoginPage'
import {DashboardPage} from './../components/dashboard/Dashboard'
import {connect} from 'react-redux'
import './../App.css'
interface IDashboardProps{
	loggedIn : boolean;
}
interface IDashboardState{

}
class Dashboard extends React.Component<IDashboardProps, IDashboardState>{
  constructor(props : IDashboardProps){
  	super(props)
  	this.state = {

  	}
  }
  	public render() {
	  	if(!this.props.loggedIn){
	  		return(
	  			  <div className="Container">
		    		<LoginPage />
		    	</div>
		    	)
	  	}else{
	  		return (
		    	<div className="Container">
		    		<DashboardPage />
		    	</div>
	  		);
	  	}
	}
}

const mapStateToProps = (state : any ) => ({
	loggedIn : state.dashboard.loggedIn 
})

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
