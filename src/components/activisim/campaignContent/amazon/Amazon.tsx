import React, { useState } from 'react';
import InteractiveParticle from './../../../../animations/interactive/InteractiveParticle'
import {SlidingCards} from './slidingCards/SlidingCards';
import './amazon.scss';

interface IAmazonProps{
	campaignData : any;
}

export const amazonCampaign = [
	{
		title : "Support Amazon Watch",
		content : "Amazon Watch has protected the rainforest and advanced the rights of Indigenous peoples in the Amazon Basin. Partnering with Indigenous and environmental organizations in campaigns for human rights, corporate accountability, and the preservation of the Amazon's ecological systems."
	},
	{
		title : 'Stopping Amazon Destruction',
		'content' : 'blah blah blah'
	},
	{
		title : 'Support Indigenous-led climate solutions',
		'content' : 'blah blah blah'
	},
	{
		title : 'Support climate justice',
		'content' : 'blah blah blah'
	},
	{
		title : 'Donate Today',
		'content' : 'blah blah blah'
	}
	
	]
export const Amazon: React.FunctionComponent<IAmazonProps> = (props) => {

  return (
    <div>
	    <div className={'particle-container'}>
	    	<SlidingCards cardContents={amazonCampaign} />
	     	<InteractiveParticle />
	    }
	    </div>
    </div>
  );
}

