import * as React from 'react';

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
  IIconProps,
} from 'office-ui-fabric-react';

const cancelIcon: IIconProps = { iconName: 'Cancel' };
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  header: [
    // tslint:disable-next-line:deprecation
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
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
const toggleStyles = { root: { marginBottom: '20px' } };
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


interface IModalProps {
  innerComponent : any;
  modalTitle : string;
  isOpen : boolean;
  modalIcon?: JSX.Element;
  dragOptions? : any;
  isDraggable? : boolean;
  showModalCallback? : any;
  onDismissCallback?: any;
}
interface IModalState {
  isOpen : boolean;
 
}

export class CustomModal extends React.Component<IModalProps, IModalState>{
 constructor(props : IModalProps){
  super(props)
  this.state = {
    isOpen : this.props.isOpen
  }
 }


 public render(){
  return (
      <div>
        {this.props.modalIcon? this.props.modalIcon : <div/>}
        <Modal
          titleAriaId={this.props.modalTitle}
          isOpen={this.state.isOpen}
          onDismiss={this.onDismissModal}
          isBlocking={false}
          containerClassName={contentStyles.container}
          dragOptions={this.props.isDraggable ? this.props.dragOptions : undefined}
        >
          <div className={contentStyles.header}>
            <span>{this.props.modalTitle}</span>
            <IconButton
              styles={iconButtonStyles}
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={this.onDismissModal}
            />
          </div>
          <div className={contentStyles.body}>
            {this.props.innerComponent}
          </div>
        </Modal>
      </div>
    );
 }


 private showModal = () => {
  if(this.props.showModalCallback !== undefined){
    this.props.showModalCallback()
  }else{
    this.setState({
      isOpen : true
    })
  }
 }
 private onDismissModal = () => {
    if(this.props.onDismissCallback !== undefined){
      this.props.onDismissCallback()
    }
    this.setState({
      isOpen : false
    })
 }


};


