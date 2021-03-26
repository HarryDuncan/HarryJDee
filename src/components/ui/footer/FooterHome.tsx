import React from 'react'
import {connect} from 'react-redux';
import {ExternalLinkWidget} from './../externalLinkWidget/ExternalLinkWidget'
import './footerStyles.css'

interface IFooterProps{
	showNav : boolean;
	inverse?: boolean;
}



const FooterHome: React.SFC<IFooterProps> = props => {
	if(!props.showNav){
		return <div/>
	}else{
		
		return(<div  className={props.inverse? 'footer-container-home-inverse' : 'footer-container-home' }>
					<div className='footer-center-home'>
						<ExternalLinkWidget links={[{url : 'https://www.instagram.com/harry.j.dee/'}, {url : 'https://www.soundcloud.com/harry-j-dee'}]} />	
						<p>© Harry J Dee All Rights Reserved</p>
					</div>
					<div className='footer-right-home'>
						<p>Harry J Dee acknowledges the traditional custodians of the lands on which he works, the Wurundjeri people of the Kulin Nation. We pay our respects to Elders past, present and emerging. Harry J Dee acknowledges that sovereignty has never been ceded</p>
					</div>
				</div>
				)
	}
} 



const mapStateToProps = (state : any) => ({
  showNav : state.app.showNav
});



export default connect(mapStateToProps, {})(FooterHome)

