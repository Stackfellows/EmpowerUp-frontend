import React from 'react';

const FloatingProducts = () => {
  const floatingProducts = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=200",
      position: "top-20 left-10",
      animation: "animate-float-slow"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/4041299/pexels-photo-4041299.jpeg?auto=compress&cs=tinysrgb&w=200",
      position: "top-40 right-20",
      animation: "animate-float-medium"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/4041298/pexels-photo-4041298.jpeg?auto=compress&cs=tinysrgb&w=200",
      position: "bottom-32 left-20",
      animation: "animate-float-fast"
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/4465619/pexels-photo-4465619.jpeg?auto=compress&cs=tinysrgb&w=200",
      position: "bottom-20 right-10",
      animation: "animate-float-slow"
    }
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