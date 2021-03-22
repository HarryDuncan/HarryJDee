import React from 'react';
import {HomePage} from '../components/home/HomePage';
import MetaTags from 'react-meta-tags';

import './../App.css'
export const Home = (props : any) => {
  return (
         <div className="divWrapper">
	         <MetaTags>
	            <title>Harry J Dee</title>
	            <meta id="meta-description" name="description" content="Harry J Dee" />
	    	</MetaTags>
            <HomePage/>
            
         </div>

  );
}
