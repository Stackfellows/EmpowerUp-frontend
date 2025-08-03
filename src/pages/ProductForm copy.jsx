import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, CreditCard, User, Mail, Phone, MapPin,
  Calendar, UserCheck, Lock, ArrowLeft, Check, Star
} from 'lucide-react';

const products = [
  {
    id: '1',
    name: "Vitamin C Brightening Serum",
    price: 45.99,
    originalPrice: 59.99,
    discount: "23% OFF",
    image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviews: 124,
    description: "Powerful vitamin C serum for brighter, more radiant skin with natural ingredients.",
    benefits: [
      "Brightens and evens skin tone",
      "Reduces dark spots and hyperpigmentation",
      "Boosts collagen production",
      "Provides antioxidant protection",
      "Suitable for all skin types"
    ]
  },
  {
    id: '2',
    name: "Hydrating Aloe Vera Gel",
    price: 25.00,
    originalPrice: 35.00,
    discount: "29% OFF",
    image: "https://images.pexels.com/photos/6621453/pexels-photo-6621453.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5,
    reviews: 95,
    description: "Soothing gel to calm irritated skin and provide deep hydration.",
    benefits: [
      "Cools and soothes skin",
      "Great after-sun treatment",
      "Prevents dryness and flaking",
      "No added fragrances",
      "Non-greasy finish"
    ]
  },
  {
    id: '3',
    name: "Retinol Night Repair Cream",
    price: 49.99,
    originalPrice: 65.00,
    discount: "23% OFF",
    image: "https://images.pexels.com/photos/4041403/pexels-photo-4041403.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    reviews: 88,
    description: "Night cream with retinol to reduce fine lines and wrinkles.",
    benefits: [
      "Improves skin texture",
      "Reduces fine lines",
      "Boosts cell turnover",
      "Hydrating and nourishing",
      "Dermatologist approved"
    ]
  },
  {
    id: '4',
    name: "Green Tea Face Cleanser",
    price: 19.99,
    originalPrice: 29.99,
    discount: "33% OFF",
    image: "https://images.pexels.com/photos/6621467/pexels-photo-6621467.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.4,
    reviews: 112,
    description: "Gentle cleanser with green tea extract for daily use.",
    benefits: [
      "Removes impurities",
      "Balances oil production",
      "Non-stripping formula",
      "Antioxidant-rich",
      "Suitable for sensitive skin"
    ]
  },
  {
    id: '5',
    name: "Hyaluronic Acid Moisturizer",
    price: 34.50,
    originalPrice: 45.00,
    discount: "23% OFF",
    image: "https://images.pexels.com/photos/8372896/pexels-photo-8372896.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    reviews: 133,
    description: "Deep hydration moisturizer for plump and glowing skin.",
    benefits: [
      "Hydrates all day",
      "Plumps fine lines",
      "Locks in moisture",
      "Non-comedogenic",
      "Fragrance free"
    ]
  },
  {
    id: '6',
    name: "Charcoal Detox Face Mask",
    price: 28.00,
    originalPrice: 39.00,
    discount: "28% OFF",
    image: "https://images.pexels.com/photos/6621465/pexels-photo-6621465.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.3,
    reviews: 99,
    description: "Deep cleansing mask with charcoal and clay for clearer skin.",
    benefits: [
      "Draws out impurities",
      "Minimizes pores",
      "Oil control",
      "Leaves skin smooth",
      "Great for weekly detox"
    ]
  },
  {
    id: '7',
    name: "SPF 50 Sunscreen Lotion",
    price: 22.99,
    originalPrice: 29.99,
    discount: "23% OFF",
    image: "https://images.pexels.com/photos/13286145/pexels-photo-13286145.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviews: 201,
    description: "Broad-spectrum SPF 50 for daily sun protection.",
    benefits: [
      "Blocks UVA & UVB",
      "Water-resistant",
      "Non-greasy formula",
      "No white cast",
      "Perfect for all skin"
    ]
  },
  {
    id: '8',
    name: "Rose Water Toner",
    price: 18.75,
    originalPrice: 25.00,
    discount: "25% OFF",
    image: "https://images.pexels.com/photos/9659898/pexels-photo-9659898.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    reviews: 150,
    description: "Refreshing toner with rose water for hydrated and balanced skin.",
    benefits: [
      "Soothes irritation",
      "Hydrates instantly",
      "Tightens pores",
      "100% natural rose water",
      "No alcohol or parabens"
    ]
  }
];

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);

  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    quantity: 1,
    packageType: 'single'
  });

  if (!product) {
    return (
      <div className="min-h-screen pt-20 text-center text-red-600">
        Product not found. Please go back and select a valid product.
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Data:', {
      product: product,
      customerInfo: formData,
      total: calculateTotal()
    });
    alert('Order placed successfully! You will receive a confirmation email shortly.');
    navigate('/profile');
  };

  const calculateTotal = () => {
    const subtotal = product.price * formData.quantity;
    return subtotal;
  };
 return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-sky-600 hover:text-sky-800 mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Information */}
          <div className="animate-slide-in-left">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-8 sticky top-24">
              {/* Product Image */}
              <div className="relative mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discount}
                </div>
              </div>

              {/* Product Details */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl font-bold text-sky-600">${product.price}</span>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                </div>

                <p className="text-gray-600 mb-6">{product.description}</p>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Benefits:</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({formData.quantity}x)</span>
                    <span>${(product.price * formData.quantity).toFixed(2)}</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${(product.price * formData.quantity * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{product.price * formData.quantity > 50 ? 'FREE' : '$9.99'}</span>
                  </div> */}
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-gray-800 text-lg">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registration & Payment Form */}
          <div className="animate-slide-in-right">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Complete Your Order
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <User className="w-5 h-5 mr-2 text-sky-600" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Complete Name (as on National ID)"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="province"
                        placeholder="Province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <UserCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="uplineName"
                        placeholder="Upline/Referral Name"
                        value={formData.uplineName}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="email"
                        name="uplineEmail"
                        placeholder="Upline/Referral Email"
                        value={formData.uplineEmail}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative md:col-span-2">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="cnic"
                        placeholder="CNIC Number"
                        value={formData.cnic}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Create Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                </div> */}

                {/* Payment Information Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-sky-600" />
                    Payment Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative md:col-span-2">
                      <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="relative md:col-span-2">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      <input
                        type="text"
                        name="cardName"
                        placeholder="Name on Card"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2 text-sky-600" />
                    Quantity
                  </h3>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, quantity: Math.max(1, formData.quantity - 1)})}
                      className="w-10 h-10 bg-white/20 border border-white/30 rounded-full flex items-center justify-center text-gray-700 hover:bg-white/30 transition-all duration-300"
                    >
                      -
                    </button>
                    <span className="text-2xl font-semibold text-gray-800 w-12 text-center">
                      {formData.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, quantity: formData.quantity + 1})}
                      className="w-10 h-10 bg-white/20 border border-white/30 rounded-full flex items-center justify-center text-gray-700 hover:bg-white/30 transition-all duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-200/30">
                  <p className="text-sm text-gray-600">
                    By placing this order, you agree to our Terms of Service and Privacy Policy. 
                    Your information will be used for order processing and network marketing purposes.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 glow-effect text-lg"
                >
                  Complete Order - ${calculateTotal().toFixed(2)}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ✅ Keep the rest of your JSX layout same (unchanged)
  // Just use `product.name`, `product.image`, `product.description`, etc.
  // Everything will now dynamically adjust based on the `id`

  // return (
  //   // Your JSX code starting from:
  //   // <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
  //   // and continuing exactly as you have it
  // );
};

export default ProductForm;
