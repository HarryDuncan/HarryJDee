import React, { useState, useEffect } from 'react';
import InteractiveParticle from './../../../../animations/interactive/InteractiveParticle'
import './indiaCovid.scss';

interface IIndiaCovidProps{
	campaignData : any;
}

export const IndiaCovid : React.FunctionComponent<IIndiaCovidProps> = (props) => {

	const [index, setIndex] = useState(0)
	const imgs = ['../campaignAssets/indiaCovid/Varanasi.jpg','../campaignAssets/indiaCovid/Pushkar.jpg', '../campaignAssets/indiaCovid/Jaipur.jpg', '../campaignAssets/indiaCovid/Varanasi.jpg']
	useEffect(() => {
		console.log(props.campaignData)
		increment()
	},[])

	useEffect(() => {
		setTimeout(() =>{
			increment()
		},1000000000)
	}, [index])


 	const increment = () => {
 		
 		if(index < imgs.length - 1){
 			
 			let newIndex = index + 1
 			
 			setIndex(newIndex)
 		}else{
 			setIndex(0)
 		}
 		
 	}

  return (
    <div className={'india-covid-container'}>
	    <div className={'particle-container'}>
	    	<div className={'shape-container'}>
		    	<div className="shape" />
				<div className="shape " />
				<div className="shape " />
				<div className="shape " />
			</div>
			<div className={'particle-cradle'}>
	     		<InteractiveParticle key={`Particles ${index}`} currentIndex={index} imgUrls={imgs} />
	     	</div>
	    </div>
    </div>
  );
}

