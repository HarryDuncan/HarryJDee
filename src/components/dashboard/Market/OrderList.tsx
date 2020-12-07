import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import AdvancedDetailsList from './../../detailsList/AdvancedDetails';
import {getOrders} from './../../../store/dashboard/dashboard.actions'
import {connect} from "react-redux";
import ViewOrder from './ViewOrder';
import {Stack, IStackTokens , DefaultButton } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import moment from 'moment'
 import './Market.css';


const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const orderTypes = [
  { key: 'All', text: 'All' },
  { key: 'Pending', text: 'Pending' },
  { key: 'Fufilled', text: 'Fufilled' },
  { key: 'Canceled', text: 'Canceled' }
];



interface IOrderListState {
 isOpen : boolean;
 selectedItem : object;
 selectedFilter : string;
}

interface IOrderListProps {
  getOrders : any;
  orders : any[];
}



const stackTokens: IStackTokens = { childrenGap: 40 };

class OrderList extends React.Component<IOrderListProps , IOrderListState> {
  constructor(props: IOrderListProps) {
    super(props);
    this.state = {
      isOpen : false,
      selectedFilter : 'All',
      selectedItem : {},
    }
      
  }


  public componentDidMount = () =>{
    this.props.getOrders()
  }


public _onChange = (event: React.FormEvent<HTMLDivElement>, item: any): void => {
    this.setState({
      selectedFilter : item.key
    })
  };

public _filterItems = (itemArray : any[]) => {
  if(this.state.selectedFilter === 'All'){
    return itemArray 
  }else{
    return itemArray.filter(item => item.OrderStat === this.state.selectedFilter)
  }
  
}

public render(): JSX.Element {
  const queueColumns = [
          {
            key: 'ID',
                name: 'ID',
                fieldName: 'RefID',
                minWidth: 110,
                maxWidth: 160,
                data: 'number',
                isPadded: true,
                onRender  : (item: any) => {
                  return <span>Order: {item['ID']}</span>
                }
          },
          {
            key: 'CustomerName',
                name: 'Customer Name',
                fieldName: 'CustomerName',
                minWidth: 210,
                maxWidth: 350,
                data: 'string',
              
          },
          {
            key: 'CustomerEmail',
                name: 'Customer Email',
                fieldName: 'CustomerEmail',
                minWidth: 210,
                maxWidth: 350,
                data: 'string',
          },
          {
            key: 'Purchased',
                name: 'Time Received',
                fieldName: 'Purchased',
                minWidth: 210,
                maxWidth: 350,
                onRender  : (item: any) => {
                  let date = new Date(item['Purchased'])
                  return <span>{moment(date).format('DD/MM/YYYY HH:mm')}</span>
                }
          },
          {
            key: 'Status',
                name: 'Status',
                fieldName: 'OrderStat',
                minWidth: 210,
                maxWidth: 350,
                data: 'string',
          }
        ]
    return (
      <div>
      <Stack horizontal tokens={stackTokens}>
        <Dropdown
          selectedKey={this.state.selectedFilter}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={this._onChange}
          placeholder="Select an option"
          options={orderTypes}
          styles={dropdownStyles}
        />
        <DefaultButton text={'Refresh'} onClick={this._refresh} />
        <DefaultButton text={'Export'} />
      </Stack>
        <div className={'queue-wrapper'}>
          <AdvancedDetailsList key={`${this.props.orders.length} ${this.state.selectedFilter} ${this.state.isOpen} OrderList`}  isLoading={false} selectionMode={'multiple'}  onSelectionChanged={this._openOrder} items={this._filterItems(this.props.orders)} columns={queueColumns} />
        </div>
        <ViewOrder isOpen={this.state.isOpen} closeCallback={this._closePanel} item={this.state.selectedItem} />
      </div>
    );
  }


  private _refresh = ()=> {
    this.props.getOrders()
  }

  private _closePanel = () => {
    this.setState({
      isOpen : false
    })
   } 

  private _openOrder = (item : any ) => {
    if(item.length > 0){
        this.setState({
          isOpen : true,
          selectedItem : item[0]
        })
    }
  }

}




const mapStateToProps = (state: any) => ({
  orders : state.dashboard.ordersArray,
})
 
const mapDispatchToProps = {
 getOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);

