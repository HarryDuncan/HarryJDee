import React from 'react';
import MixesPage from './../components/mixes/MixesPage';
import Footer from './../components/ui/footer/Footer';

import './../App.css'
export const Mixes = () => {
window.scrollTo(0,0);
  return (
    <div className="Mixes">
    	<MixesPage />
    	<Footer />
    </div>
  );
}

export default Mixes;
