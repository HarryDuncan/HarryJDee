import * as React from 'react';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import {formatRawData, orderDetails} from './../../../data'
import {FormPageSection} from './../../ui/formComponent/FormComponent';
import {validateData} from './../../../utilities/utilityFunctions';
import {useState} from 'react';

export interface IOrderDetailsProps {
  orderData : any;
  shipOrderCallback : (data: any) => void;
  
}

const stackTokens: IStackTokens = { childrenGap: 40 };

export const OrderDetails: React.FunctionComponent<IOrderDetailsProps> = props => {
  
  const [shippedDisabled, toggleDisabled] = useState(true)
  const [orderData, updateOrder] = useState(formatRawData(props.orderData, orderDetails))
  let orderDataArray = Object.keys(orderData)


  const _updateData = (fieldName : string, value : any) => {
    let updatedField : any = Object.assign({}, orderData[fieldName]);
    updatedField['value'] = value
    updateOrder({...orderData, [fieldName] : updatedField })
    toggleDisabled(!validateData(orderData))
  }

  const _shipOrder = () => {
    props.shipOrderCallback(orderData)
  }

 console.log(props.orderData)
  return (
    <div>
      <div>
          {orderDataArray.map((item => <FormPageSection fieldName={item} fieldItem={orderData[item]} callback={_updateData} key={`Order Field ${item}`}/> ) ) }
      </div>
      <br/>
    <Stack horizontal tokens={stackTokens}>
      <a href={`mailto:${props.orderData['CustomerEmail']}`}><DefaultButton text="Contact Customer" allowDisabledFocus  /></a>
      <DefaultButton text="Refund" onClick={_alertClicked} allowDisabledFocus  />
      <PrimaryButton text="Mark as Shipped" onClick={_shipOrder} allowDisabledFocus disabled={shippedDisabled} />
    </Stack>
  </div>
  );
};



function _alertClicked(): void {
  alert('Clicked');
}