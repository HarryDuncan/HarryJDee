import React from 'react';
import MixesPage from './../components/mixes/MixesPage';
import Footer from './../components/ui/footer/Footer';
import MetaTags from 'react-meta-tags';
import './../App.css'
export const Mixes = () => {
window.scrollTo(0,0);
  return (
    <div className="Mixes">
    	<MetaTags>
            <title>Mixes</title>
            <meta id="meta-description" name="description" content="Mixes and visualizer produced by Harry J Dee" />
          </MetaTags>
    	<MixesPage />
    	<Footer />
    </div>
  );
}

export default Mixes;
