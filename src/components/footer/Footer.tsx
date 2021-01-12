import React from 'react'
import './footerStyles.css'
import {ExternalLinkWidget} from './../ui/externalLinkWidget/ExternalLinkWidget'

const Footer: React.SFC<{}> = props => {
	if(window.innerWidth <= 900){
		return <div/>
	}else{
		return( <div className='page-footer'>
					<ExternalLinkWidget links={[{url : 'https://www.instagram.com/harry.j.dee/'}, {url : 'https://www.soundcloud.com/harry-j-dee'}]} />	
					<p>© Harry.J.Dee All Rights Reserved</p>
				</div>
				)
	}
} 

export default Footer

