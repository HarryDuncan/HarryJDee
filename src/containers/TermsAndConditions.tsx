import React from 'react';
import {TAndC} from './../components/TAndC/TAndC';
import Footer from './../components/navigation/footer/Footer';
import './../App.scss'

export const TermsAndConditions = () => {
  return (
    <div className="Container">
    	<TAndC/>
    	<Footer />
    </div>
  );
}

export default TermsAndConditions;
