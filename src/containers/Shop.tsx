import React from 'react';
import ShopPage from './../components/shop/ShopPage';
import Footer from './../components/navigation/footer/Footer';
import './../App.scss'
import MetaTags from 'react-meta-tags';


export const Shop = () => {
	window.scrollTo(0,0);
  return (
    <div className="Container">
    	<MetaTags>
            <title>Shop</title>
            <meta id="meta-description" name="description" content="Purchase limited edition prints by Harry J Dee" />
    	</MetaTags>
    <ShopPage />
    <Footer />
    </div>
  );
}

export default Shop;
