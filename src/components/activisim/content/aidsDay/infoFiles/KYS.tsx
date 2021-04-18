import * as React from 'react'
import {useState} from 'react'

import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  PrimaryButton,
  Modal,
  IconButton,
  IIconProps,
  Stack,
  IStackTokens,
  Link,
  IButtonStyles,
  IStackStyles ,
  Text,
  Label,
 
} from 'office-ui-fabric-react';
import './../aidsDay.scss'
import {InfoCallout} from './InfoCallout';

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const stackStyles: IStackStyles = {
  root: {
    height: '100%',
    width: '92%',
    flexGrow: '100',
    margin: '4%',
    marginTop: '0%',
  },
};

export const KYS: React.SFC<{}> = props => {
	const [modalOpen, toggleOpen] = useState(false)

  const unAidsData = <div><span>Based on 2019 data from <a className={'inner-link'} target={'_blank'} href={"https://www.unaids.org/en/resources/fact-sheet"}>UNAIDS</a></span></div>

		 return(
          <div className={'info-content'}>
    			   <Stack styles={stackStyles} > 
						    <span>Knowing your status is an important part in preventing the spread of HIV</span><br/>
                <span>An estimated 38 million people are living with HIV globally. {<InfoCallout innerComponent={unAidsData} id={'id2'} linkText={"7.1 million don't know they have it"} />}</span>
					     <span>The only way to know your status is to get tested</span>
               <br/>
               <h3>Who Should get tested?</h3>
              
                <span>Anyone who shares injecting equipment is potentially at risk of contracting HIV and should get tested.</span>
                <br/>
                 <span>Everyone who engages in condomless penetrative sex and does not utilise biomedical prevention interventions, such as PrEP, is potentially at risk of contracting HIV and should get tested.</span>
                <br/>
                <span>If you are a guy who has sex with other guys and you’ve had at least one partner in the past three months, then you should be getting tested once every three months.</span>
                <br/>
                <a className={'inner-link'} target={'_blank'} href={'https://www.thedramadownunder.info/'}>Find A Clinic Near You</a>
              </Stack>
		        </div>
		    
		    )        
                          
}

 