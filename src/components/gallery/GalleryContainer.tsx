import * as React from 'react';
import GalleryPage from './paintingGallery/GalleryPage';
import DigitalSculpture from './digitalSculpture/DigitalSculpture';

interface IGalleryContainerProps{
	
}

export const GalleryContainer: React.FunctionComponent<IGalleryContainerProps> = props => {
	
	return (<div><GalleryPage/><DigitalSculpture/></div>)

}