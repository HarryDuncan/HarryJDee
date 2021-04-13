import React from 'react';
import ActivisimContainer from './../components/activisim/ActivisimContainer';
import FooterHome from './../components/ui/footer/FooterHome';
import './../App.css'
import MetaTags from 'react-meta-tags';

export const Activism = () => {
  window.scrollTo(0,0);

  return (
    <div className="Container">
         <MetaTags>
            <title>Activism</title>
            <meta id="meta-description" name="description" content="This is where Harry J Dee combines art and activisim to raise funds and awareness for various causes." />
           
          </MetaTags>
    	<ActivisimContainer />
    	<FooterHome />
    </div>
  );
}

export default Activism
