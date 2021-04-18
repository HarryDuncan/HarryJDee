import React, { useState } from 'react';
import InteractiveParticle from './../../../../animations/interactive/InteractiveParticle'

interface IAmazonProps{
	campaignData : any;
}

export const Amazon: React.FunctionComponent<IAmazonProps> = (props) => {
 
  return (
    <div>
     <InteractiveParticle />
    </div>
  );
}

