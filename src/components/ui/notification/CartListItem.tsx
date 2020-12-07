import * as React from 'react';
import {connect} from 'react-redux'
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import {Icon,  Stack, IStackTokens} from 'office-ui-fabric-react';
import './notificationStyles.scss';
import {removeItemFromCart} from './../../../store/shop/shop.actions'



interface ICartListItemProps{
  item : any;
  index : number|undefined;
  removeItemFromCart : any;
  itemType? : string;
}

interface ICartListItemState{

}


interface ICartClassObject {
  itemCell: string;
  itemImage: string;
  itemContent: string;
  itemName: string;
  itemIndex: string;
  chevron: string;
  sectionHeader : string;
  itemOriginal : string;
  itemNewVal : string;
}
 
const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;
 

const classNames: ICartClassObject = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      flexDirection : 'column',
      selectors: {
       '&:hover': { background: palette.neutralLight }
      }
    }
  ],
  itemImage: {
    flexShrink: 0
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1
  },
  itemData : {
    clear : 'both',
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      float : 'left',
      fontWeight : 400,
    }
  ],
  itemIndex: {
    fontSize: '17px',
    color: 'black',
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0
  },
  sectionHeader : {
      clear : 'both',
      fontWeight : 400,
      color: '#0084c2',
  },
  itemOriginal : {
     fontWeight : 600,
    color: '#051987',
  },
  itemNewVal : {
    fontWeight : 600,
    color: 'rgb(11, 106, 11)',
  }
 
});
const stackTokens: IStackTokens = { childrenGap: 10 };


class CartListItem extends React.Component<ICartListItemProps, ICartListItemState>{
  constructor(props : ICartListItemProps){
    super(props)
    this.state = {

    }
  }

  public render(){
    const isMobile = window.innerWidth <= 900;
    if(this.props.itemType === 'Receipt'){
      return(
                <div>
                    <div data-is-focusable={true}>
                      <div style={{width : isMobile? '100%': '60%',clear : 'both' , margin : '0 auto'}} className={'recipt-item-section'}>
                          <div style={{ float : 'right'}}>
                            <img className={'cart-preview-img'} src={'/images/'+ this.props.item['DataType'] + '/' + this.props.item['Url'] + '.jpg'} 
                            alt={this.props.item.Title} />
                          </div>
                        <Stack tokens={stackTokens}>
                          <div className={classNames.itemName} >{this.props.item.Title} <span> {this.props.item.type}</span></div>
                          <span className='item-price'> ${this.props.item.Price}</span>
                        </Stack>
                      </div>
                    </div>
                  </div>
        )
       
    }
    return(
       <div>
          <div data-is-focusable={true}>
            <div style={{width : '100%',clear : 'both' }} className={'cart-section'}>
                <div style={{ float : 'right'}}>
                  <img className={'cart-preview-img'} src={'/images/'+ this.props.item['DataType'] + '/' + this.props.item['Url'] + '.jpg'} 
                  alt={this.props.item.Title} />
                </div>
              <Stack tokens={stackTokens}>
                <div className={classNames.itemName} >{this.props.item.Title} <span> {this.props.item.type}</span></div>
                <span className='item-price'> ${this.props.item.Price}</span>
                <div className='remove-item' onClick={this._removeItem} >
                      <Icon iconName={'Delete'}  />
                </div>
              </Stack>
            </div>
          </div>
        </div>
      );
  }

  private _removeItem = () =>{
    this.props.removeItemFromCart(this.props.index)
  }
}


const mapStateToProps = (state : any) => ({
 
})

const mapDispatchToProps = {
  removeItemFromCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartListItem)

