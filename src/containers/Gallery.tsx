import React from 'react';
import GalleryPage from './../components/gallery/GalleryPage';
import Footer from './../components/footer/Footer';
import './../App.css'
export const Gallery = () => {
  return (
    <div className="Container">
    	<GalleryPage />
    	<Footer />
    </div>
  );
}

export default Gallery;
