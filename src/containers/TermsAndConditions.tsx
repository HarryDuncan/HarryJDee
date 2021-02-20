import React from 'react';
import {TAndC} from './../components/TAndC/TAndC';
import Footer from './../components/ui/footer/Footer';


import './../App.css'
export const TermsAndConditions = () => {
  return (
    <div className="Container">
    	<TAndC/>
    	<Footer />
    </div>
  );
}

export default TermsAndConditions;
