import * as React from 'react';
import {TextField, ITextFieldStyles, Label, DefaultButton} from 'office-ui-fabric-react'
import { Stack, IStackTokens } from 'office-ui-fabric-react';
import {CustomIconButton} from './../customIconButton/CustomIconButton'

import {Insta} from './Icons/Insta'
import {ReactComponent as SoundCloud} from './Icons/SoundCloud.svg'
import {ReactComponent as Youtube} from './Icons/Youtube.svg'

export interface IEditLinkItemProps {
  links : any;
  index : number;
  removeCallback : (index : number) => void;
  updateCallback : (index : number, newURL : string)  => void;
}



const stackTokens: IStackTokens = { childrenGap: 40 };

const textStyles: Partial<ITextFieldStyles> = { root: { width: 300 } };

export const EditLinkItem: React.FunctionComponent<IEditLinkItemProps> = props => {

  const getImage = (links : any) :JSX.Element=> {
  	let imgURL = ''
  	if(links.url.indexOf('instagram.com') !== -1){
  		return <Insta className={'icon-svg'}/>
  // } else if(links.url.indexOf('facebook.com') !== -1){
  		//imgURL = 'Facebook-Logo'
  	}else if(links.url.indexOf('youtube.com') !== -1){
  		return <Youtube className={'icon-svg'}/>
  	}else if(links.url.indexOf('soundcloud.com') !== -1){
  	 return <SoundCloud className={'icon-svg'}/>
  	}
  	if(imgURL === ''){
  		if(links.img !== undefined){
  			return <img src={`/images/external/${links.img}.png`} alt={props.links['url']} />
  		}else{
  			return <div/>
  		}
  	}else{
  		return <img src={`/images/external/${imgURL}.png`} alt={props.links['url']} />
  	}
  }

  const _removeLink = () => {
    props.removeCallback(props.index)
  }

  const _updateLink = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
 
    if(newValue !== undefined){
      props.updateCallback(props.index, newValue)
    }
    
  }
  return (
    <Stack horizontal tokens={stackTokens}>
      {getImage}
      <TextField styles={textStyles} value={props.links.url} underlined onChange={_updateLink}/>
      <CustomIconButton type={'Cancel'} callback={_removeLink}/>
    </Stack>
  );
};