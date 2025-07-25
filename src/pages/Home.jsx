import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import NetworkStats from "../components/NetworkStats";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import FloatingProducts from "../components/FloatingProducts";
import UserProfile from "../components/UserProfile";
import AdminDashboard from "../components/AdminDashboard";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <FloatingProducts />
      <Hero />
      <FeaturedProducts />
      <NetworkStats />
      <Testimonials />
      <Newsletter />
      <UserProfile />
      <AdminDashboard />
    </div>
  );
};

export default Home;
