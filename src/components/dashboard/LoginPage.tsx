import React from 'react';
import { DefaultButton, TextField} from 'office-ui-fabric-react'
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import './DashboardStyles.scss';
import {connect} from "react-redux";
import {login} from './../../store/dashboard/dashboard.actions';


interface IHomeState {
	userName : string;
	password : string;
	twoFactorAuth : Number;
}
interface IHomeProps {
	login : any;
	isLoggingIn : boolean;
	loginFailMessage : boolean;
}

const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 350 } }
  };


class LoginPage extends React.Component<IHomeProps, IHomeState>{
	constructor(props: IHomeProps){
	super(props)
		this.state = {
			userName : '',
			password : '',
			twoFactorAuth : 0,
		}
	}


	public render(){
		const isMobile = window.innerWidth <= 900;
		if(isMobile){
			return(
			<div className="section">
				<h3> Not ready for mobile </h3>
			</div>
				)
		}else{
			return(
			<div className="loginSection">
				<div className={this.props.isLoggingIn ? "" : "hidden"} >
				 <ProgressIndicator />
				</div>
			  <Stack {...columnProps}>
			 
			  <h1 style={{'float': 'left', 'margin' : 0}}>Login</h1>
				<TextField label="User Name"  onChange={this.setName} underlined />
        		<TextField label="Password" underlined onKeyDown={(e) => this.onKeyPressed(e)} onChange={this.setPassword} type='password' />
        		<TextField label="Two Factor" mask="999999" underlined onKeyDown={(e) => this.onKeyPressed(e)} onChange={this.setTwoFactor} />
        		<DefaultButton text='Login' onClick={this.attemptLogin} />
        		<div key={`LoginDiv ${this.props.loginFailMessage}`}className={this.props.loginFailMessage && !this.props.isLoggingIn ? 'errorMessage' : 'hidden'}><p>Incorrect login details</p></div>
        	</Stack>
			</div>
			);
		}
		
	}

	

	private onKeyPressed = (e : any) =>{
		if(e.key === 'Enter' ||e.key === 'Tab'){
			this.props.login({'name' : this.state.userName, 'pass': this.state.password, 'twoFactor' : this.state.twoFactorAuth})
		}
	}

	private setTwoFactor = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
		this.setState({
  				twoFactorAuth : Number(newValue)
  			})
	}

  	private setPassword = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
  			this.setState({
  				password : String(newValue)
  			})
  	}

  	private setName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
  		this.setState({
  				userName : String(newValue)
  			})
  	}

  	private attemptLogin = (event: any) => {
  		this.props.login({'name' : this.state.userName, 'pass': this.state.password, 'twoFactor' : this.state.twoFactorAuth})
  	}

} 

const mapStateToProps = (state : any) => ({
	loginFailMessage : state.dashboard.loggedInFailMessage,
	isLoggingIn : state.dashboard.isLoggingIn
});

const mapDispatchToProps = {
	login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
