import React from 'react';
import BioPage from './../components/bio/BioPage';
import Footer from './../components/footer/Footer';
import './../App.css'
export const Bio = () => {
  return (
    <div className="Container">
    	<BioPage />
    	<Footer />
    </div>
  );
}

export default Bio;
