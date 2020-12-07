import * as React from 'react'
import {useState} from 'react'
import {
  MessageBarButton,
  Link,
  Stack,
  StackItem,
  MessageBar,
  MessageBarType,
  IMessageBarStyles,
  ChoiceGroup,
  IStackProps,
} from 'office-ui-fabric-react';
import {ExternalLinkWidget} from './../externalLinkWidget/ExternalLinkWidget'

interface IHeroProps {
 message : string;
 dismissable? : boolean;
 showLinks?: boolean;
}
  
const HeroStyles : Partial<IMessageBarStyles>  = {
	icon : {'display' : 'none'},
	root : {
		'width' : '100%',
		
		'padding' : '0',
		'margin' : '0 auto',
		'marginTop' : '1em',
		'backgroundColor' : 'black',
		'color': 'white',

	},
	innerText : {
		'fontWeight' : 700,
		'fontSize' : '1.2em',
		'margin' : '0 auto',
    	'letterSpacing': '0.15em'
	}
}

const Hero: React.SFC<IHeroProps> = props => {

  // const [isCalloutVisible, toggleCallout] = useState(false)
 

    return(
    	<MessageBar

    	
    	styles={HeroStyles}
    		>
			   	{props.message}

			   	{props.showLinks?
			   		<ExternalLinkWidget colour={'white'} links={[{'url' :"https://www.instagram.com/harry.j.dee/"}, {'url' : "https://www.facebook.com/Harry-J-Dee-109766710909628"}]}/>
			   		:
			   		null
			   	}
  		</MessageBar>
            )

    
}


export default Hero;


