import * as React from 'react'
import {useState} from 'react'
import {KYS} from './infoFiles/KYS'
import {Educated} from './infoFiles/Educated'
import {Stigma} from './infoFiles/Stigma'
// import CalloutWrapper from './../ui/calloutWrapper/CalloutWrapper';
import './aidsDay.scss'

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
    width: '100%',
    flexGrow: '100',
  },
};

export const InfoSection: React.SFC<{}> = props => {
	const [modalOpen, toggleOpen] = useState(false)
  const [section, changeSection] = useState('')

  const _toggle = (e : any) => {
    changeSection("Stand Up To Stigma")
    toggleOpen(!modalOpen)
  }
  const _toggleT = () =>{
    changeSection("Know Your Status")
    toggleOpen(!modalOpen)
  }
  const _toggleE = () => {
    changeSection("Get Educated")
    toggleOpen(!modalOpen)
  }
  const closeModal = () => {
    toggleOpen(false)
  }
		 return(
          <div className={'info-container'}>
          <Modal
                isOpen={modalOpen}
                onDismiss={closeModal}
                isBlocking={true}
                containerClassName={contentStyles.container}
              >
               <div className={contentStyles.header}>
               <h4 className={'info-container-title'}>{section}</h4>
                <IconButton
                      styles={iconButtonStyles}
                      iconProps={cancelIcon}
                      ariaLabel="Close popup modal"
                      onClick={closeModal}
                    />
              </div>
              <div>
              {section === 'Know Your Status'?
                <KYS/>
                : null
              }{
                section === 'Get Educated'?
                <Educated/>
                :
                null
              }{
                section === 'Stand Up To Stigma'?
                <Stigma/>
                :null
              }
              </div>
               
              </Modal>
		        
              <h1 className={'action-title'}>Other ways to help</h1>
              <p className={'sub-title'}>Click on the links below to see otherways you can help fight against HIV and HIV stigma</p>
    			     <Stack horizontal={document.documentElement.clientWidth <= 900 ? false : true}>
                  <div className={'info-section section-3'}>
                      <h2 className={'item-title'} onClick={_toggle}  >Stand Up To Stigma</h2>
                  </div>
                   <div className={'info-section info-section-2'}>
                     <h2 className={'item-title'} onClick={_toggleE} >Get Educated</h2>
                  </div>  
			             <div className={'info-section section-1'}>
						          <h2 className={'item-title'} onClick={_toggleT} >Know Your Status</h2>
					         </div>
  					     
                   
    					</Stack>
		         
		        </div>
		    
		    )        
                          
}


const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    height: document.documentElement.clientWidth <= 900 ? '100vh' : 'auto',
    width: document.documentElement.clientWidth <= 900 ? '100vw' : 'auto',
    maxHeight : document.documentElement.clientWidth <= 900 ? '100vh' : '90vh',
    maxWidth: document.documentElement.clientWidth <= 900 ? '100vw' : 'auto',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  header: [
 
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid white`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      textAlign : 'center',
      fontWeight: 400,
      paddingLeft: '4%',
      paddingRight: '4%',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

 