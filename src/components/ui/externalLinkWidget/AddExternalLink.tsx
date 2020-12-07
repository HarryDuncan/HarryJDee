import * as React from 'react';
import {ImageUpload} from './../imageUpload/ImageUpload';
import {useState} from 'react'
import {TextField, Label, DefaultButton} from 'office-ui-fabric-react'
import { Stack, IStackTokens } from 'office-ui-fabric-react';

export interface IAddExternalLinkProps {
  callback : (newLinkObj : any) => void;
}

const stackTokens: IStackTokens = { childrenGap: 40 };

export const AddExternalLink: React.FunctionComponent<IAddExternalLinkProps> = props => {


  const [linkObj, updateLink] = useState({'url' : ''})
  const [addDisabled, toggleDisable] = useState(true)

  const _updateLinkText =  (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    if(newValue !== undefined){
        let newObj : any = Object.assign({},linkObj)
        newObj['url'] = newValue
        toggleDisable(false)
        updateLink(newObj)
    }
  }


  const _imageUploaded = (imageObject : any) => {
    let newObj : any = Object.assign({}, linkObj)
    newObj['img'] = imageObject
    updateLink(newObj)
  }

  const _addLink = () =>{
    props.callback(linkObj)
    updateLink({'url' : ''})
  }
  	
  return (
    <Stack tokens={stackTokens}>
      		<TextField label={'Add New External Link'}  underlined onChange={_updateLinkText}/>
          <ImageUpload onUpload={_imageUploaded} defaultValue={null}/>
      		<DefaultButton text={'Add'}  disabled={addDisabled} onClick={_addLink} />
    </Stack>
  );
}; 