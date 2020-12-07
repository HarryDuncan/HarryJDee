import {useState} from 'react'
import * as React from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import Receipt from './notificationPages/ReceiptPage';
import OutOfStock from './notificationPages/OutOfStock';
import ErrorPage from './notificationPages/ErrorPage';
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
} from 'office-ui-fabric-react';


interface IPanelProps{
  isOpen : boolean;
  showType: string;
  closeCallback? : () => void;
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



export const NotificationModal: React.SFC<IPanelProps>  = props => {
  const [isOpen, toggleOpen] = useState(props.isOpen)
  const titleId = useId('title');


  const renderInner = () => {
    switch(props.showType){
      case 'Out Of Stock':
         return <OutOfStock/>;
      default:
        return <Receipt/>
    }
   


  }


  const onDismiss = () => {
    toggleOpen(false)
    if(props.closeCallback !== undefined){
       props.closeCallback()
    }
  }

   return (
      <div>
        <Modal
          titleAriaId={titleId}
          isOpen={isOpen}
          onDismiss={onDismiss}
          isBlocking={false}
          containerClassName={contentStyles.main}
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
            {renderInner()}
        </div>
        </Modal>
      </div>
    );

};


const contentStyles = mergeStyleSets({
 
  main: {
    height: document.documentElement.clientWidth <= 900 ? '100vh' : 'auto',
    width: document.documentElement.clientWidth <= 900 ? '100vw' : 'auto',
    maxHeight : document.documentElement.clientWidth <= 900 ? '100vh' : 'auto',
    maxWidth: document.documentElement.clientWidth <= 900 ? '100vw' : 'auto',
    padding : document.documentElement.clientWidth <= 900 ? '2%' : '0%',
  },
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    
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
