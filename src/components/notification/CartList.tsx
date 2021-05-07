import * as React from 'react';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import {Icon} from 'office-ui-fabric-react';
import CartListItem from './CartListItem';

export interface ICartProps {
  items: any[];
}
 
export interface ICartState {
  filterText?: string;
  items?: any[];
}

 
 
 
export class CartList extends React.Component<ICartProps, ICartState> {
  
  constructor(props: ICartProps) {
    super(props);
    this.state = {
      filterText: '',
      items: this.props.items
    };
  }
 
  public render(): JSX.Element {
    const { items = [] } = this.state;
     if(items.length === 0){
      return (
           <FocusZone direction={FocusZoneDirection.vertical}>
            <h3 className={'empty-cart'} >No Items in Cart</h3>
          </FocusZone>
        )
    }
    return (
        <List items={items} onRenderCell={this._onRenderCell} />
    );
  }
 
 
  private _onRenderCell(item: any, index: number | undefined): JSX.Element {
      return (
        <div style={{clear : 'both'}}>
         <CartListItem item={item} index={index}/>
        </div>
      );
    }

 
}