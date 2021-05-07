import * as React from 'react'
import {useState} from 'react'
import './../aidsDay.scss'
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
  Label
} from 'office-ui-fabric-react';
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

export const Educated: React.SFC<{}> = props => {
	const [modalOpen, toggleOpen] = useState(false)


	const protect = <div><h4>Protect Yourself</h4><a className={'inner-link'} href={"https://what-works.org"} target={"_blank"}>For More resources...</a></div>
 




  return(
          <div className={'info-content'}>
              <Stack styles={stackStyles} > 
               <span>Being armed with knowledge is one of the best ways to combat stigma, overcome stereotypes and make informed choices when it comes to protection and treatment.</span>
                <br/>
               <h3>Don't confuse HIV and AIDS</h3>
               <span>HIV and AIDS are not the same thing. HIV stands for Human Immunodeficiency Virus and is transmitted between people when the blood of an HIV positive person enters the bloodstream of an HIV negative person.</span>
               <span>HIV can be be passed on through semen as well if there are high enough levels of the virus present. HIV weakens a person's immune system and makes them susceptible to infection.</span>
               <span>AIDS stands for autoimmune deficiency syndrome and is a diagnoses if an HIV positive person has more than one AIDS-related illness. It is rare these days in Australia for people to reach an AIDS diagnosis because of the anti-retroviral treatment available.</span>
      
               <br/>
                <h3>Undetectable Viral Load:</h3>
                <span>An undetectable viral load (UVL) is where anti-retroviral treatment (ART) has lowered the amount of HIV present in the blood that it cannot be detected by standard blood tests. People living with HIV (PLHIV) who have an undetectable viral load cannot pass on HIV and this is an extremely effective method of preventing HIV</span>
                <span>Read about the 2016 PARTNER study for more information.</span>
                <br/>
                <h3>HIV Today:</h3>
                <span>Whilst there is no cure or vaccine for HIV, anti-retroviral treatment is extremely effective when adhered to, allowing people to live long and healthy lives and it is rare for it to progress to AIDS in Australia.</span>
                <span>Nowadays there are more tools than ever before to prevent against HIV available.</span>
                <a className={'inner-link'} href={"https://what-works.org"} target={"_blank"}>Click here for more info</a>
                </Stack>
		        </div>
		    
		    )        
                          
}

 