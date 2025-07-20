import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProductForm from './pages/ProductForm';
import Packages from './pages/Packages';
import './styles/animations.css';
import Payment from './pages/Payment.jsx';

import Footer from './Footer.tsx';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductForm />} />
        </Routes>
       
       
        <Footer/>
         
      </div>
    </Router>
  );
}

export default App;