import React from 'react';
import ShopPage from './../components/shop/ShopPage';
import Footer from './../components/ui/footer/Footer';
import './../App.css'
export const Shop = () => {
	window.scrollTo(0,0);
  return (
    <div className="Container">
    <ShopPage />
    <Footer />
    </div>
  );
}

export default Shop;
