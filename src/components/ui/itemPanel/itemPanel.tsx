import * as React from 'react';
import { Panel ,  PanelType, IPanelStyles} from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';
import {dataScaffold} from './../../../data';
import ViewItem from './ViewItem'

interface IPanelProps{
  isOpen : boolean;
  item: any;
  isEditor? : boolean;
  panelType?: string;
  closeCallback? : () => void;
}

interface IPanelState{
  isOpen : boolean
  disabled : boolean
}

const panelStyles : Partial <IPanelStyles> ={
  root : {
    'width' : '100vw',
    'marginTop' : document.documentElement.clientWidth <= 1100?  '0vh' : '4.5em',
  },
  main : {
    'width' : '100vw',
    'overflow' :'hidden',
    'boxShadow' : 'none',
  },
  closeButton : {
    'fontSize': '0.2em',
    'fontWeight': 700,
    'color': 'black',
  },
  commands : {
    'marginTop' : '5px',
  },
  header : {
    'paddingTop' : '-5px',
    'marginLeft': 'auto',
    'marginRight': 'auto',
  },
  headerText : {
    'fontSize' : '1em',
    'fontWeight' : 300
  }
}

const editorPanelStyles : Partial <IPanelStyles> ={
   root : {
    'width' : '100vw',
  },
  main : {
    'width' : '100vw',
    'overflow' :'hidden',
  },
  header : {
    'paddingTop' : '-5px',
    'marginLeft': 'auto',
    'marginRight': 'auto',
  },
  headerText : {
    'fontSize' : '28px',
    'fontWeight' : 300
  }
}


export class ItemPanel extends React.Component<IPanelProps, IPanelState>{
  constructor(props : IPanelProps){
    super(props)
    this.state ={
      isOpen : false,
      disabled : true
    }
  }

  public onDismiss = () => {
    this.setState({
      isOpen : false
    })
   if(this.props.closeCallback){
       this.props.closeCallback()
    }
  }

  public onValidate = () => {
    this.setState({
      disabled : !this.state.disabled
    })
  }

  public render(){
     return (
      <div>
        <Panel
          headerText={this.props.isEditor? this.props.item['Title'] : ''}
          isOpen={this.props.isOpen}
          onDismiss={this.onDismiss}
          type={PanelType.custom}
          customWidth={this.props.isEditor? '45vw':'100vw' }
          isLightDismiss={true}
          styles={this.props.isEditor? editorPanelStyles :  panelStyles}
          isFooterAtBottom={this.props.isEditor}
          closeButtonAriaLabel="Close">
          <ViewItem ItemObject={this.props.item} type={this.props.panelType}  closePanel={this.onDismiss} isEditor={this.props.isEditor} isValid={this.onValidate} />
        </Panel>
      </div>
    );
  }
 
};
