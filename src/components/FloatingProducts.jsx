import React from "react";

const FloatingProducts = () => {
  const product = [
    {
      id: 1,
      name: "Charcol Face Wash",
      price: 1550,
      originalPrice: "",
      discount: "23% OFF",
      image: "../src/Assets/1-Photoroom.png",
      rating: 4.8,
      reviews: 124,
      category: "Skincare",
      points: 1.5,
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
      points: 0.5,
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
      points: 1,
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
      points: 1.5,
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
      points: 1.5,
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
      points: 3,
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
      points: 1,
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
      points: 1.5,
    },
  ];

  const floatingProducts = [
    {
      id: 1,
      image: "../src/Assets/1-Photoroom.png",
      position: "top-20 left-10",
      animation: "animate-float-slow",
    },
    {
      id: 0,
      image:
        "https://images.pexels.com/photos/4041299/pexels-photo-4041299.jpeg?auto=compress&cs=tinysrgb&w=200",
      position: "top-40 right-20",
      animation: "animate-float-medium",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/4041298/pexels-photo-4041298.jpeg?auto=compress&cs=tinysrgb&w=200",
      position: "bottom-32 left-20",
      animation: "animate-float-fast",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/4465619/pexels-photo-4465619.jpeg?auto=compress&cs=tinysrgb&w=200",
      position: "bottom-20 right-10",
      animation: "animate-float-slow",
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingProducts.map((product) => (
        <div
          key={product.id}
          className={`absolute ${product.position} ${product.animation} opacity-20 hover:opacity-40 transition-opacity duration-300`}
        >
          <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
            <img
              src={product.image}
              alt={`Floating product ${product.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}

      {/* Additional decorative elements */}
      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-sky-200/20 to-blue-200/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full animate-bounce"></div>
    </div>
  );
};

export default FloatingProducts;
