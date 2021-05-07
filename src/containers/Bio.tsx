import React from 'react';
import BioPage from './../components/bio/BioPage';
import Footer from './../components/navigation/footer/Footer';
import MetaTags from 'react-meta-tags';
import './../App.scss'


export const Bio = () => {
	window.scrollTo(0,0);
  return (
    <div className="Container">
     	<MetaTags>
            <title>Bio</title>
            <meta id="meta-description" name="description" content="Lean more about Harry J Dee. Harry. J .Dee is a kiwi artist based in Melbourne. From a young age Harry dabbled in painting, drawing and sculpture." />
          </MetaTags>
    	<BioPage />
    	<Footer />
    </div>
  );
}

export default Bio;
