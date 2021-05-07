import * as React from 'react';
import {Insta} from './Icons/Insta'
import {ReactComponent as SoundCloud} from './Icons/SoundCloud.svg'
import {ReactComponent as Youtube} from './Icons/Youtube.svg'
import './externalWidget.scss';

export interface ILinkImageProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  links : any
  colour? : string;
}

export const LinkImage: React.FunctionComponent<ILinkImageProps> = props => {

 
  const getImage = (links : any) :JSX.Element=> {
    let imgURL = ''
    if(links.url.indexOf('instagram.com') !== -1){
      return <Insta className={'icon-svg'} fill={props.colour}/>
  // } else if(links.url.indexOf('facebook.com') !== -1){
      //imgURL = 'Facebook-Logo'
    }else if(links.url.indexOf('youtube.com') !== -1){
      return <Youtube className={'icon-svg '  }/>
    }else if(links.url.indexOf('soundcloud.com') !== -1){
     return <SoundCloud className={'icon-svg ' }/>
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

  return (
   <a className={'external-icon ' } href={props.links.url} target='_blank'>{getImage(props.links)}</a>
  );
};