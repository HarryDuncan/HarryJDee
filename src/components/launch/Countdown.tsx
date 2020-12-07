import React from 'react'
import { useState, useEffect } from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import { useId} from '@uifabric/react-hooks';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  ContextualMenu,
  Toggle,
  DefaultButton,
  Modal,
  IDragOptions,
  IconButton,
  IModalStyles,
  IIconProps,
  IStackStyles
} from 'office-ui-fabric-react';
import moment from 'moment-timezone';
import './LaunchStyles.css'
import {ExternalLinkWidget} from './../ui/externalLinkWidget/ExternalLinkWidget'
interface ICountdownProps{
  isOpen : boolean;
  closeCallback? : () => void;
  launchCallback : () => void;
}

const theme = getTheme();

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};



const stackStyles: IStackStyles = {
  root: {
   flexGrow: '100',
   justifyContent : 'center'
  },
};



export const Countdown: React.SFC<ICountdownProps>  = props => {

  const getTimeOnMount = () => {
      const then = moment.tz("2020-11-30T23:00:00Z", 'Australia/Sydney')
     
      const now = moment.utc().tz('Australia/Sydney');
      const countdown = then.diff(now);
      if(countdown <= 0){
        props.launchCallback()
      }
      let days =  Math.floor(Number(moment.duration(countdown).asSeconds() / 86400))
    
      let hours = Math.floor(Number((moment.duration(countdown).asSeconds() / 3600 ) - (days * 24)))
 
      let min  = Math.floor(Number((moment.duration(countdown).asSeconds() / 60 ) - (days * 1440) - (hours * 60)))
      let sec =  Math.floor(Number(moment.duration(countdown).asSeconds() - (days * 86400) - (hours* 3600) - (min * 60)))

      return {'days' : days, 'hours' : hours, 'minutes' : min, 'seconds' : sec} ;
    
  }


  const [isOpen, toggleOpen] = useState(props.isOpen)
  const titleId = useId('title');
  const [time, updateTime] = useState(getTimeOnMount());



  const onDismiss = () => {
    toggleOpen(false)
    if(props.closeCallback !== undefined){
       props.closeCallback()
    }
  }

    
    useEffect(()=>{
    let myInterval = setInterval(() => {
           updateTime(getTimeOnMount)
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

   

   return (
      <div>
        <Modal
          titleAriaId={titleId}
          isOpen={isOpen}
          onDismiss={onDismiss}
          isBlocking={false}
          
        >
         <div className={contentStyles.header}>
          <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={onDismiss}
              />
        </div>
         <div className={contentStyles.body}>
            <h1 className={'main-header'}>Harry J Dee Launching in</h1>
            <br/>
            { time['minutes'] <= 0 && time['seconds'] <= 0
                ? null
                // @ts-ignore
                : <h1 className={'counter'}>{time['days']} Days {time['hours']} Hours {time['minutes']} Minutes  {time['seconds']} Seconds</h1> 
            }
            <br/>
            <h2 className={'sub-header'}>1st December 10AM AEST</h2>
        </div>
        <div className={'footer'}>
          <p>Stay in the loop and follow below...</p>
          <ExternalLinkWidget links={[{url : 'https://www.instagram.com/harry.j.dee/'}]} colour='white' styles={stackStyles}/> 
        </div>
        </Modal>
      </div>
    );

};


const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  header: [
    
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
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



