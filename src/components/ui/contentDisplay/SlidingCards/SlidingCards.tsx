import React, { useState } from 'react';
import './SlidingCards.scss';

interface IContentCard{
	title : string;
	content : string;
	action?: boolean;
}

interface ISlidingCardsProps{

	// THe contents of a card
	cardContents : IContentCard[];
}

export const SlidingCards: React.FunctionComponent<ISlidingCardsProps> = (props) => {
	const [currentCardIndex, updateIndex] = useState(0)
	return (
	    <div>
	    	{props.cardContents.map((item, index) => (
	    		 <div className={(index !== currentCardIndex ? 'hidden ' : '') + 'card-container'}>
		    		<h1>{item['title']}</h1>
		    		<p>{item['content']}</p>
		    		{
		    			item['action']?
		    			<div>hii</div>
		    			:
		    			null
		    		}
		    	</div>
	    	))}
	    </div>
	  );
}

