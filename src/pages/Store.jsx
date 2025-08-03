import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Store = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (!token || !storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const getDiscountPercentage = (designation) => {
    switch (designation) {
      case 'Silver': return 8;
      case 'Gold': return 15;
      case 'Platinum': return 20;
      case 'Diamond': return 35 ;
      case 'Bronze': return 3;
      default: return 0;
    }
  };

  const discount = getDiscountPercentage(user?.designation);

  // const categories = ['All', 'Skincare', 'Cleansers', 'Moisturizers', 'Serums', 'Masks', 'Anti-Aging', 'Bath & Body'];

    const products = [
    {
      id: 1,
      name: "Charcol Face Wash",
      price:1550,
      originalPrice: 1550,
      // discount: "23% OFF",
      image: "../src/Assets/1-Photoroom.png",
      rating: 4.8,
      reviews: 124,
      // category: "Skincare",
      points :"1.5 P" 
    },
    {
      id: 2,
      name: "Brightening Clay Mask",
      price: 500,
      originalPrice: "500",
      // discount: "25% OFF",
      image: "../src/Assets/2-Photoroom.png",
      rating: 4.9,
      reviews: 89,
      // category: "Masks",
      points: "0.5 P"
    },
    {
      id: 3,
      name: "Lightening Face Scrub",
      price: 1050,
      originalPrice: 1050,
      // discount: "30% OFF",
      image: "../src/Assets/3-Photoroom.png",
      rating: 4.7,
      reviews: 67,
      points:1
      // category: "Bath & Body"
    },
    {
      id: 4,
      name: "24K Gold Face Scrub",
      price: 1450,
      originalPrice: 1450,
      // discount: "24% OFF",
      image: "../src/Assets/4-Photoroom.png",
      rating: 4.8,
      reviews: 156,
      // category: "Anti-Aging",
       points: "1.5 P"
    },
    {
      id: 5,
      name: "Bright Beauty Face Wash",
      price: 1500,
      originalPrice:1500,
      // discount: "24% OFF",
      image: "../src/Assets/5-Photoroom.png",
      rating: 4.6,
      reviews: 203,
      category: "Cleansers",
       points: "1.5 P"
    },
    {
      id: 6,
      name: "Whitening Delight Soap",
      price: 3500,
      originalPrice: 3500,
      // discount: "24% OFF",
      image: "../src/Assets/7-Photoroom.png",  
      rating: 4.9,
      reviews: 98,
      // category: "Lips",
       points: "3 P"
    },
    {
      id: 7,
      name: "Refreshing Scrub Soap",
      price: 1050,
      originalPrice: 1050,
      // discount: "24% OFF",
      image: "../src/Assets/8-Photoroom.png",  
      rating: 4.9,
      reviews: 98,
      // category: "Lips",
       points: "1 P"
    },
    {
      id: 8,
      name: "Shine & Strong Shampoo",
      price: 1750,
      originalPrice: 1750,
      // discount: "24% OFF",
      image: "../src/Assets/product-shampoo-Photoroom.png",  
      rating: 4.9,
      reviews: 98,
      // category: "Lips",
       points:"1.5 P"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return b.featured ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
       

        {/* Product List */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
          {sortedProducts.map((product, index) => {
            const finalPrice = product.price - (product.price * discount / 100);
            return (
              <div
                key={product.id}
                className="group relative bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-3xl aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full  transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Discount Badge */}
                  {/* <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    {discount > 0 ? `-Rs{discount}%` : null}
                  </div> */}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                    {product.category}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110">
                        <Heart className="w-5 h-5 text-white" />
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </Link>
                      <button className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110 glow-effect">
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-sky-600 transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-sky-600">
                        Rs{finalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        Rs{product.originalPrice}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-sky-600">
                      P{product.points}
                    </span>
                      <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 glow-effect">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Store;
