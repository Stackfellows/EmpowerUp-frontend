import React from 'react';
import { Check, Star, Users, Gift, Crown, Diamond } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
  const navigate = useNavigate();

  // Ensure these IDs match the 'id' property in your backend packages array
  const packages = [
    {
      id: 'starter',
      name: "Starter Kit",
      icon: Gift,
      color: "from-green-500 to-emerald-600",
      price: "$299",
      originalPrice: "$399",
      discount: "25% OFF",
      level: "Bronze Member",
      commission: "15%",
      bonus: "$50",
      products: 8,
      value: "$500+",
      features: [
        "8 Premium Beauty Products",
        "Complete Starter Training",
        "Marketing Materials Included",
        "15% Commission on Sales",
        "$50 Welcome Bonus",
        "Bronze Member Status",
        "Basic Support Package",
        "Mobile App Access"
      ],
      popular: false
    },
    {
      id: 'business',
      name: "Business Builder",
      icon: Crown,
      color: "from-sky-500 to-blue-600",
      price: "$599",
      originalPrice: "$799",
      discount: "25% OFF",
      level: "Silver Member",
      commission: "20%",
      bonus: "$100",
      products: 15,
      value: "$1000+",
      features: [
        "15 Premium Beauty Products",
        "Advanced Business Training",
        "Professional Marketing Kit",
        "20% Commission on Sales",
        "$100 Welcome Bonus",
        "Silver Member Status",
        "Priority Support",
        "Team Building Tools",
        "Monthly Webinars",
        "Exclusive Product Previews"
      ],
      popular: true
    },
    {
      id: 'empire',
      name: "Empire Package",
      icon: Diamond,
      color: "from-purple-500 to-pink-600",
      price: "$999",
      originalPrice: "$1299",
      discount: "23% OFF",
      level: "Gold Member",
      commission: "25%",
      bonus: "$200",
      products: 25,
      value: "$1800+",
      features: [
        "25 Premium Beauty Products",
        "Master-Level Training Program",
        "Complete Marketing Arsenal",
        "25% Commission on Sales",
        "$200 Welcome Bonus",
        "Gold Member Status",
        "VIP Support & Coaching",
        "Advanced Team Tools",
        "Weekly 1-on-1 Coaching",
        "Exclusive Events Access",
        "Custom Business Website",
        "Leadership Development"
      ],
      popular: false
    },
    {
        id: 'ultimate',
        name: "Ultimate Pro",
        icon: Crown,
        color: "from-yellow-500 to-orange-600",
        price: "$1999",
        originalPrice: "$2499",
        discount: "20% OFF",
        level: "Platinum Member",
        commission: "30%",
        bonus: "$500",
        products: 40,
        value: "$3000+",
        features: [
            "40 Premium Beauty Products",
            "Elite Leadership Training",
            "Full Marketing Suite",
            "30% Commission on Sales",
            "$500 Welcome Bonus",
            "Platinum Member Status",
            "Dedicated Personal Coach",
            "Global Expansion Tools",
            "Annual Retreat Access",
            "Personalized Branding Support",
            "Advanced Analytics Dashboard"
        ],
        popular: false
    }
  ];

  const handleJoinPackage = (packageId) => {
    console.log(`User selected package ${packageId}. Redirecting to payment.`);
    // Navigate to the payment page and pass the packageId as state
    navigate('/payment', { state: { packageId: packageId } });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Network Packages
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose your path to success. Each package includes premium products, training, 
            and everything you need to build your beauty business empire.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Users, number: '15,000+', label: 'Active Members' },
              { icon: Star, number: '4.9/5', label: 'Success Rate' },
              { icon: Gift, number: '$2.8M+', label: 'Total Earnings' }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="inline-flex p-3 bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl mb-3">
                  <stat.icon className="w-6 h-6 text-sky-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up ${
                pkg.popular ? 'ring-2 ring-sky-500 scale-105 lg:scale-110' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Discount Badge */}
              <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                {pkg.discount}
              </div>

              <div className="p-8">
                {/* Package Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${pkg.color} rounded-2xl shadow-lg mb-4`}>
                    <pkg.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className={`text-lg font-semibold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                    {pkg.level}
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className={`text-4xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                      {pkg.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {pkg.originalPrice}
                    </span>
                  </div>
                  <div className="text-gray-600">One-time investment</div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 rounded-2xl p-4 text-center">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                      {pkg.commission}
                    </div>
                    <div className="text-sm text-gray-600">Commission</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 text-center">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                      {pkg.products}
                    </div>
                    <div className="text-sm text-gray-600">Products</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 text-center">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                      {pkg.bonus}
                    </div>
                    <div className="text-sm text-gray-600">Bonus</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 text-center">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                      {pkg.value}
                    </div>
                    <div className="text-sm text-gray-600">Value</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-5 h-5 bg-gradient-to-r ${pkg.color} rounded-full flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleJoinPackage(pkg.id)}
                  className={`w-full bg-gradient-to-r ${pkg.color} text-white py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 glow-effect`}
                >
                
                  Join {pkg.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8 lg:p-12 animate-slide-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Why Choose Our Network?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Star,
                title: "Premium Products",
                description: "High-quality beauty products that customers love and trust"
              },
              {
                icon: Users,
                title: "Strong Community",
                description: "Join a supportive network of successful entrepreneurs"
              },
              {
                icon: Gift,
                title: "Generous Rewards",
                description: "Competitive commissions and exciting bonus opportunities"
              },
              {
                icon: Crown,
                title: "Proven System",
                description: "Time-tested business model with comprehensive training"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center animate-fade-in-delay" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="inline-flex p-4 bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl mb-4">
                  <benefit.icon className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center animate-fade-in-delay">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Have Questions?</h3>
          <p className="text-gray-600 mb-8">
            Our team is here to help you choose the perfect package for your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 glow-effect">
              Schedule Consultation
            </button>
            <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300">
              View FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
