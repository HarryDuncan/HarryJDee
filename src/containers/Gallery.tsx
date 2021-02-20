import React from 'react';
import GalleryPage from './../components/gallery/GalleryPage';
import Footer from './../components/ui/footer/Footer';
import MetaTags from 'react-meta-tags';
import './../App.css'
export const Gallery = () => {
	 window.scrollTo(0,0);
  return (
    <div className="Container">
    	<MetaTags>
            <title>Bio</title>
            <meta id="meta-description" name="description" content="Art of Harry J Dee." />
          </MetaTags>
    	<GalleryPage />
    	<Footer />
    </div>
  );
}

export default Gallery;
