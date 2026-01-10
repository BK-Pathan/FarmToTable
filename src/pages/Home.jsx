import React from 'react';
import Banner from '../components/Banner';
import WhatWeOffer from '../components/WhatWeOffer';
import BestSellers from '../components/BestSellers';
import Advantages from '../components/Advantages';
import Testimonials from '../components/Testimonials';
import Subscribe from '../components/Subscribe';
import Blog from '../components/Blog';
import ComingSoon from '../components/ComingSoon';

export default function Home({ addToCart }) {  // <-- yahan accept karo
  return (
    <main>
      <Banner />
       <Advantages />
      {/* <WhatWeOffer /> */}
      <BestSellers addToCart={addToCart} /> 
        <ComingSoon/>
      <Testimonials />

    </main>
  );
}
