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
      case 'Silver': return 3;
      case 'Gold': return 5;
      case 'Platinum': return 8;
      case 'Diamond': return 11;
      case 'Bronze': return 0;
      default: return 0;
    }
  };

  const discount = getDiscountPercentage(user?.designation);

  const categories = ['All', 'Skincare', 'Cleansers', 'Moisturizers', 'Serums', 'Masks', 'Anti-Aging', 'Bath & Body'];

  const products = [
    {
      id: 1,
      name: "Vitamin C Brightening Serum",
      price: 45.99,
      originalPrice: 59.99,
      category: "Serums",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 124,
      description: "Powerful vitamin C serum for brighter, more radiant skin",
      featured: true
    },
    {
      id: 1,
      name: "Vitamin C Brightening Serum",
      price: 45.99,
      originalPrice: 59.99,
      category: "Serums",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 124,
      description: "Powerful vitamin C serum for brighter, more radiant skin",
      featured: true
    },
    // (other products remain same, with price as numbers, not strings)
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    {discount > 0 ? `-${discount}%` : null}
                  </div>

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
                        ${finalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-red-500 transition-colors duration-300 hover:scale-110">
                        <Heart className="w-5 h-5" />
                      </button>
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
