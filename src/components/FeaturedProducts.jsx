import React from 'react';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Charcol Face Wash",
      price:1550,
      originalPrice: "",
      discount: "23% OFF",
      image: "../src/Assets/1-Photoroom.png",
      rating: 4.8,
      reviews: 124,
      category: "Skincare",
      points :1.5 
    },
    {
      id: 2,
      name: "Brightening Clay Mask",
      price: 500,
      originalPrice: "",
      discount: "25% OFF",
      image: "../src/Assets/2-Photoroom.png",
      rating: 4.9,
      reviews: 89,
      category: "Masks",
      points: 0.5
    },
    {
      id: 3,
      name: "Lightening Face Scrub",
      price: 1050,
      originalPrice: "$49.99",
      discount: "30% OFF",
      image: "../src/Assets/3-Photoroom.png",
      rating: 4.7,
      reviews: 67,
    points:1
    },
    {
      id: 4,
      name: "24K Gold Face Scrub",
      price: 1450,
      originalPrice: "$69.99",
      discount: "24% OFF",
      image: "../src/Assets/4-Photoroom.png",
      rating: 4.8,
      reviews: 156,
      category: "Anti-Aging",
       points: 1.5
    },
    {
      id: 5,
      name: "Bright Beauty Face Wash",
      price: 1400,
      originalPrice: "$32.99",
      discount: "24% OFF",
      image: "../src/Assets/5-Photoroom.png",
      rating: 4.6,
      reviews: 203,
      category: "Cleansers",
       points: 1.5
    },
    {
      id: 6,
      name: "Whitening Delight Soap",
      price: 3500,
      originalPrice: "$24.99",
      discount: "24% OFF",
      image: "../src/Assets/7-Photoroom.png",  
      rating: 4.9,
      reviews: 98,
      category: "Lips",
       points: 3
    },
    {
      id: 7,
      name: "Refreshing Scrub Soap",
      price: 1050,
      originalPrice: "$24.99",
      discount: "24% OFF",
      image: "../src/Assets/8-Photoroom.png",  
      rating: 4.9,
      reviews: 98,
      category: "Lips",
       points: 1
    },
    {
      id: 8,
      name: "Shine & Strong Shampoo",
      price: 1750,
      originalPrice: "$24.99",
      discount: "24% OFF",
      image: "../src/Assets/product-shampoo-Photoroom.png",  
      rating: 4.9,
      reviews: 98,
      category: "Lips",
       points:1.5 
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular beauty products that deliver exceptional results
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
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
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                  {product.discount}
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
                     Rs{product.price}
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
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16 animate-fade-in-delay">
          <Link
            to="/store"
            className="inline-flex items-center bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 glow-effect"
          >
            View All Products
            <Eye className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;