import * as React from 'react'
import {useState} from 'react'
import './../activism.css'
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

export const Stigma: React.SFC<{}> = props => {
	const [modalOpen, toggleOpen] = useState(false)


		 return(
          <div className={'info-content'}>
              <Stack styles={stackStyles} > 
						    <span>Stigma affects many people living with HIV today. This stigma can sometimes make people living with HIV feel shame, embarrassment or lack of self-worth or confidence and that can lead to issues around mental health and affect general wellbeing. </span><br/>
                <span>HIV stigma can come from being misinformed, uneducated and believing in myths and stereotypes of HIV and how it is contracted.</span>
                 <br/>
                <h2>Here are some ways you can stand up to stigma</h2>

                 <h3>Understand HIV:</h3>
                 <span>See the Get Educated section to learn the difference between HIV and AIDS, about being undetectable and the current landscape of HIV today</span>
                 <br/>

                <h3>Avoid Stereotyping:</h3>
                <span>People living with HIV are a diverse population and come from from all walks of life and all types of communities</span>
                <br/>

                <h3>Use Correct Language:</h3>
                <span>Avoid using language that is disempowering or perpetuates negative or misinformed stereotypes</span>
                <span>-When describing an HIV Positive Person or People Living With HIV don't use terms like <span className={'bad'}>AIDS Carrier, AIDS Patient, AIDS Sufferer, HIV Victim</span>.</span>
                <span>- Don't use the word AIDS to describe something that is bad</span>
                <span>-Avoid using the term "Clean" to refer to being HIV Negative</span>
                <br/>
                <h3>Show Empathy:</h3>
                <span>HIV is a chronic illness and people living with HIV should be treated with empathy and compassion. When people who are living with HIV have access to the appropriate support and medicine they can live full healthy lives</span>
                <a className={'inner-link'} href={'https://hivstillmatters.org/topics/stigma'} target={'_blank'}>Click Here For More Info</a>
                </Stack>
		        </div>
		    
		    )        
                          
}

 