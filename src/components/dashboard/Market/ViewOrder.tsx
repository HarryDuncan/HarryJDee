import * as React from 'react';
import { Panel ,  PanelType, IPanelStyles} from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';
// import {dataScaffold} from './../../../DataModels/dataModels'
import {OrderDetails} from './OrderDetails'
import {connect} from 'react-redux';
import {updateOrder} from './../../../store/dashboard/dashboard.actions'

interface IPanelProps{
  isOpen : boolean;
  item: any;
  updateOrder: any;
  closeCallback? : () => void;
}

interface IPanelState{
  isOpen : boolean
  disabled : boolean
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


class ViewOrder extends React.Component<IPanelProps, IPanelState>{
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
          headerText={`Order: ${this.props.item['ID']}`}
          isOpen={this.props.isOpen}
          onDismiss={this.onDismiss}
          type={PanelType.custom}
          customWidth={'45vw'}
          isLightDismiss={true}
          styles={editorPanelStyles}
          isFooterAtBottom={true}
          closeButtonAriaLabel="Close">
          <OrderDetails orderData={this.props.item} shipOrderCallback={this._shipOrder} />
        </Panel>
      </div>
    );
  }
 


  private _ActionCallback = (success: boolean) => {
    if(success){
      this.onDismiss()
    }else{
      alert('Error Occured')
    }
  }

  private _shipOrder = (data : any) => {
    this.props.updateOrder(data,  'Fufilled', this._ActionCallback)
  } 
};



const mapStateToProps = (state: any) => ({

})
 
const mapDispatchToProps = {
  updateOrder
};

export default connect(mapStateToProps, mapDispatchToProps)( ViewOrder );
