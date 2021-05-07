import React, { useState } from 'react';
import {IndiaCovid} from './indiaCovid/IndiaCovid';
import {Amazon} from './amazon/Amazon';
import {AidsDay} from './aidsDay/AidsDay';

interface IContentContainerProps{
	campaignTitle : string;
	campaignData : any;
}

// Container for rednering the custom campaing content

export const ContentContainer : React.FunctionComponent<IContentContainerProps> = (props) => {

	const _returnContent = () => {
		switch(props.campaignTitle){
			case 'IndiaCovid':
				return <IndiaCovid campaignData={props.campaignData} />
			case 'Amazon':
				return <Amazon campaignData={props.campaignData}/>
			default: 
			case 'Aids Day':
				return <AidsDay campaignData={props.campaignData}/>
		}
	}

  return (
    <div>
	  {
	  	_returnContent()
	  }
    </div>
  );
}

