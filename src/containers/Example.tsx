import React from 'react';
import {ExamplePage} from './../components/exampleDisplay/ExamplePage';

import './../App.scss'


export const Examples = () => {
	window.scrollTo(0,0);
  return (
    <div className="Container">
     	
    	<ExamplePage />
   
    </div>
  );
}

export default Examples;
 // <Footer />