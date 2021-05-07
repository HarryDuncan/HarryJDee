import React, { useState, useEffect } from 'react';
import InteractiveParticle from './../../../../animations/interactive/InteractiveParticle'


interface IIndiaCovidProps{
	campaignData : any;
}

export const IndiaCovid : React.FunctionComponent<IIndiaCovidProps> = (props) => {

	useEffect(() => {
		console.log(props.campaignData)
	},[])

  return (
    <div>
	    <div className={'particle-container'}>
	     	<InteractiveParticle currentIndex={0} imgUrls={['../campaignAssets/indiaCovid/Varanasi.jpg','../campaignAssets/indiaCovid/Pushkar.jpg', '../campaignAssets/indiaCovid/Jaipur.jpg', '../campaignAssets/indiaCovid/Varanasi.jpg']} />
	    </div>
    </div>
  );
}

