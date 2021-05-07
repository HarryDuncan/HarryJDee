import React from 'react';
import {GalleryContainer} from './../components/gallery/GalleryContainer';
import Footer from './../components/navigation/footer/Footer';
import MetaTags from 'react-meta-tags';
import './../App.scss'
export const Gallery = () => {
	 window.scrollTo(0,0);
  return (
    <div className="Container">
    	<MetaTags>
            <title>Gallery</title>
            <meta id="meta-description" name="description" content="Art of Harry J Dee." />
          </MetaTags>
        <div className={'page'}>
    	   <GalleryContainer />
        </div>
    	<Footer />
    </div>
  );
}

export default Gallery;
