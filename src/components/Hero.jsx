import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const products = [
    {
      id: 1,
      name: "Glowing Face Wash",
      price: "$29.99",
      originalPrice: "$39.99",
      discount: "25% OFF",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.8
    },
    {
      id: 2,
      name: "Luxury Soap Set",
      price: "$24.99",
      originalPrice: "$34.99",
      discount: "30% OFF",
      image: "https://images.pexels.com/photos/4041299/pexels-photo-4041299.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.9
    },
    {
      id: 3,
      name: "Moisturizing Cream",
      price: "$34.99",
      originalPrice: "$49.99",
      discount: "30% OFF",
      image: "https://images.pexels.com/photos/4041298/pexels-photo-4041298.jpeg?auto=compress&cs=tinysrgb&w=500",
      rating: 4.7
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [products.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-blue-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-20 h-20 bg-gradient-to-br from-sky-200/30 to-blue-200/30 rounded-full backdrop-blur-sm animate-float-${i + 1}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                Empower
              </span>
              <br />
              <span className="text-gray-800 animate-fade-in-delay">Your Beauty</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl animate-fade-in-delay-2">
              Discover premium beauty products that enhance your natural radiance. 
              Join our network and build your beauty empire while earning rewards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-delay-3">
              <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 glow-effect">
                Start Your Journey
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 animate-fade-in-delay-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-600">10K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-600">500+</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-600">98%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Carousel */}
          <div className="relative animate-slide-in-right">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main Product Card */}
              <div className="relative overflow-hidden rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={products[currentSlide].image}
                    alt={products[currentSlide].name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                    {products[currentSlide].discount}
                  </div>

                  {/* Heart Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110">
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(products[currentSlide].rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({products[currentSlide].rating})
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {products[currentSlide].name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-sky-600">
                        {products[currentSlide].price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {products[currentSlide].originalPrice}
                      </span>
                    </div>
                    
                    <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 glow-effect">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 -translate-x-12 p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-x-12 p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;