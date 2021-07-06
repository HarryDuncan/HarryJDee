import React, { useState } from 'react';
import {AidsRibbon} from './../../../../animations/staticScenes/activisimItems/AidsRibbon';
import { Stack, IStackTokens, IStackStyles  ,  ITextFieldStyles,Link} from 'office-ui-fabric-react';
import {DisplayText} from './../../../ui/customTextField/DisplayText';
import {InfoSection} from './InfoSection';


const stackStyles: IStackStyles = {
  root: {
   height : document.documentElement.clientWidth <= 900 ? 'fit-content' : '90vh',
   flexGrow: '100'
  
  },
};



const stackTokens: IStackTokens = { childrenGap: document.documentElement.clientWidth <= 900 ? '2em' : 0 };


const customStyles : Partial<ITextFieldStyles> = {
  root : {
    'margin' : 0,
    'padding' : 0,
    
  },
  field : {
    'fontWeight' : 500,
    'fontSize' : document.documentElement.clientWidth <= 900 ? '1.4em': '1.2em',
    'marginTop' : 0,
  'paddingTop' : 0,
  'lineHeight': '120%',
  'letterSpacing': '0.15em',
  'height' :'fit-content',
  }
}

interface IAidsDayProps{
  campaignData : any;
}



export const AidsDay: React.FunctionComponent<IAidsDayProps> = (props) => {
 


  return (
      <div className="page">
          <div className='activism-container'>
           
            <div className='activism-section'>
              <Stack styles={stackStyles} tokens={stackTokens}>
                <Stack.Item align="stretch">
                  <h1 className={'campaign-title'}>{props.campaignData['Name']} </h1>
                </Stack.Item>
                 <Stack.Item align="stretch" >
                  <DisplayText customStyleObj={customStyles} text={props.campaignData['Supporting']}/>
                  <InfoSection />
                </Stack.Item>
              </Stack>
            </div>
           
          </div>
        </div>
  );
}


    

 // <div className={'activism-menu'}>
             
 //                         <div className={'thanks-to'}>
 //                          <p className={'thanks-text'}>This campaign is closed.<br/>Special thanks to
 //                          <a className={'thanks-link'} href={'https://www.barbapresents.com/'} target={'_blank'}>Barba Presents</a> and 
 //                          <a className={'thanks-link'} href={'https://thorneharbour.org'} target={'_blank'}>Thorne Harbour Health</a>
 //                          </p>
 //                         </div>
 //                         <div className={'dd-container'}>
 //                           <Dropdown
 //                                placeHolder="View Previous Campaigns"
 //                                options={selectionOptions}
 //                                onChange={this._campaignSelected}
 //                                onRenderOption={onRenderOption}
 //                                />
 //                         </div>
 //            </div>