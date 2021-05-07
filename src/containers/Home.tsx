import React from 'react';
import {HomePage} from '../components/home/HomePage';
import MetaTags from 'react-meta-tags';
import FooterHome from './../components/navigation/footer/FooterHome';


import './../App.scss'
export const Home = (props : any) => {
  return (
         <div className="divWrapper">
	         <MetaTags>
	            <title>Harry J Dee</title>
	            <meta id="meta-description" name="description" content="Harry J Dee an innovative artist, DJ and creative techologist. Working to merge art, music and technology to break the frontiers of experience." />
	    	</MetaTags>
            <HomePage/>
             <FooterHome />
         </div>

  );
}
