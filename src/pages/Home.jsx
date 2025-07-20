import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import NetworkStats from '../components/NetworkStats';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import FloatingProducts from '../components/FloatingProducts';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <FloatingProducts />
      <Hero />
      <FeaturedProducts />
      <NetworkStats />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;