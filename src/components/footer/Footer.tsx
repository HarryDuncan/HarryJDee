import React from 'react'
import './footerStyles.css'
import {ExternalLinkWidget} from './../ui/externalLinkWidget/ExternalLinkWidget'
import {Link} from 'office-ui-fabric-react';
import {connect} from 'react-redux';

interface IFooterProps{
	showNav : boolean;
}
const Footer: React.SFC<IFooterProps> = props => {
	if(!props.showNav){
		return <div/>
	}else{
		return(<div  className='footer-container'>
				<div className='footer-left'>
					<Link className={'footer-link'}>Get In Touch</Link>
					<Link className={'footer-link'}>Terms and Conditions</Link>
				</div>
					<div className='footer-center'>
						<ExternalLinkWidget links={[{url : 'https://www.instagram.com/harry.j.dee/'}, {url : 'https://www.soundcloud.com/harry-j-dee'}]} />	
						<p>© Harry J Dee All Rights Reserved</p>
					</div>
					<div className='footer-right'>
						<p>Harry J Dee acknowledges the traditional custodians of the lands on which he works, the Wurundjeri people of the Kulin Nation. We pay our respects to Elders past, present and emerging. Harry J Dee acknowledges that sovereignty has never been ceded</p>
					</div>
				</div>
				)
	}
} 



const mapStateToProps = (state : any) => ({
  showNav : state.app.showNav
});



export default connect(mapStateToProps, {})(Footer)

