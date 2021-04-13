import * as React from 'react'
import { Dropdown , IDropdownStyles, IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';
import CalloutWrapper from './../ui/calloutWrapper/CalloutWrapper';
import { PrimaryButton } from 'office-ui-fabric-react'
import { SpinButton, ISpinButtonStyles } from 'office-ui-fabric-react/lib/SpinButton';
import {useState} from 'react'
 
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdownItem : {
    width : '200%  !important',
    display : 'flex',
  },
  
  dropdown: {
                 width: '90%' , clear: 'both', margin: '0%',
                },
 
};
 
interface IDropDownDivProps {
      productData : any;
      addToCartCB : any;
}
               
 const styles: Partial<ISpinButtonStyles> = {
  root: {
    margin : '3%',
    width: '80px',
  },
};
 
const ProductDetailsDiv: React.SFC<IDropDownDivProps> = props => {
    
  const [itemQuantity, updateQuantity] = useState(1)
      // @ts-ignore
    const _createOptions = ():IDropdownOption[]  => {
      if(props.productData.HasVariations){
        
        let items = JSON.parse(props.productData['Variations'])
        let options : IDropdownOption[] = [{key: 0, text : `Please Select`}]
        for(let i in items['value']){
          let newObj : any = {}
          newObj['key'] = Number(i) + 1
          newObj['text'] = items['value'][i]['itemTitle']
          newObj['data'] = {'Price' : items['value'][i]['price'], 'Stock' : items['value'][i]['stock']}
          if(Number(items['value'][i]['stock']) === 0){
            newObj['disabled'] = true
          }
          options.push(newObj)
          }
        return options
      }else{
        return []
      }
    
    }
  const _updateQuantity = (value : any) => {
      let newQaunt = Number(itemQuantity) + 1
      if(newQaunt > props.productData['Stock'] || newQaunt < props.productData['Stock']){
        updateQuantity(itemQuantity)
      }else{
        updateQuantity(newQaunt)
      }
      
  }
    const _incrementQuantity = (value : any) => {
      let newQaunt = Number(itemQuantity) + 1
      if(newQaunt > props.productData['Stock'] ){
        updateQuantity(itemQuantity)
      }else{
        updateQuantity(newQaunt)
      }
  }

  const decrementQuantiy = (value : any) => {
    let newQaunt = Number(itemQuantity) -1

    if(newQaunt < 1){
        updateQuantity(itemQuantity)
      }else{
        updateQuantity(newQaunt)
      }
  }



  const onRenderOption = (option: IDropdownOption|undefined): JSX.Element => {
    if(option === undefined){
      return <div/>
    }else if(option.data === undefined){
       return(
        <div>
         <span>{option.text}</span>
        </div>
      );
    }else{
      console.log(option['data']['Stock'])
      return(
        <div style={{width : '400px', display : 'flex', flexDirection : 'row'}}>
         <span>{option.text} </span><span className={Number(option['data']['Stock']) === 0 ? 'sold-out' : 'price-txt'}> AUD ${option.data['Price']}</span>{Number(option['data']['Stock']) < 11 && Number(option['data']['Stock']) > 0 ? <span className={'stock-txt'}>{option.data.Stock} left</span> : <div>{Number(option['data']['Stock']) === 0 ? <span className={'stock-txt'}>Sold Out</span> : <div/> }</div>}
        </div>
      );
    }
    
  };

  const _setDisabled = ():boolean => {
    if(props.productData.HasVariations){
       return true
    }else{
       return false
    }
   
  }

  const _addToCart = () => {
    if(!addedToCart){
      let c = 0
      while(c < itemQuantity ){
       props.addToCartCB(fieldValue)
       c++
      }
      toggleAdded(true)
      toggleDisabled(true)
      setValue({})
      setTimeout(() => {
        toggleAdded(false)
        if(!props.productData.HasVariations){
         toggleDisabled(false)
       }
      },2500)
    }
  }



  const hasStock = () => {
    if(props.productData.HasVariations){
      let variationData = JSON.parse(props.productData['Variations'])
      for(let i in variationData['value']){
        if(Number(variationData['value'][i]['stock']) !== 0){
          return false
        }
      }
      return true
    }else{
      if(props.productData['Stock'] !== undefined && props.productData['Stock'] <= 0){
        return true
      }else{
        return false
      }
    }
  }

  const [checkoutDisabled, toggleDisabled] = useState(_setDisabled)
  const [isCalloutVisible, toggleCallout] = useState(false)
  const [fieldValue, setValue]  =  useState({})
  const [selectionOptions, changeOptions] = useState(_createOptions)
  const [addedToCart, toggleAdded] = useState(false)

  const _changed = (event: any, option: any): void => {
      if(option.key !== 0){
        setValue(option)
        toggleDisabled(false)
      }else{
        toggleDisabled(true)
      }
      
    }
    return(
      <div>
        <SpinButton styles={styles} onValidate={_updateQuantity} onIncrement={_incrementQuantity} onDecrement={decrementQuantiy} key={`item ${itemQuantity}`} defaultValue={String(itemQuantity)} label={'Quantity'} min={1}  max={Number(props.productData['Stock'])} step={1} />
        {props.productData.HasVariations || props.productData.HasVariations === 1?
           <CalloutWrapper
              childComponent = {
                                <Dropdown
                                    key={`${addedToCart} DD`}
                                    options={selectionOptions}
                                    onChange={_changed}
                                    onRenderOption={onRenderOption}
                                   />
                                  }
              label={`Size`}
              required={true}
              description={undefined}/>

            :
             <div style={{width : '400px', display : 'flex', flexDirection : 'row'}}>
              
                
               <span className={Number(props.productData['Stock']) === 0 ? 'sold-out' : 'price-txt-normal'}>AUD ${props.productData['Price']}</span>{Number(props.productData['Stock']) < 11 &&  Number(props.productData['Stock']) > 0 ? <span className={'stock-txt'}>{Number(props.productData['Stock'])} left</span> : <div>{Number(props.productData['Stock']) === 0 ? <span className={'stock-txt'}>Sold Out</span> : <div/> }</div>}
              </div>
            
        }
        <div className='panel-footer'>
          {
            hasStock() ?

            <div/>
              :

              
              <PrimaryButton onClick={_addToCart} disabled={checkoutDisabled} >
              {addedToCart ? 'Added To Cart' : 'Add To Cart'}
              </PrimaryButton>
          }
          
        </div> 
      </div>     
    )
 


                               
}


export default ProductDetailsDiv
 