import React, { useState } from 'react';
import { Mail, Send, Gift, Sparkles } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // TODO: Integrate with backend newsletter subscription
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-blue-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,197,253,0.15),transparent)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-16 h-16 bg-gradient-to-br from-sky-200/20 to-blue-200/20 rounded-full animate-float-${(i % 3) + 1}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-8 lg:p-12 animate-slide-up">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl shadow-lg">
                <Mail className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 animate-bounce">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Header */}
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Stay Beautiful & Informed
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive beauty tips, special offers, 
            and be the first to know about new products and network opportunities.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Gift, text: 'Exclusive Offers & Discounts' },
              { icon: Sparkles, text: 'Beauty Tips & Tutorials' },
              { icon: Send, text: 'Network Updates & Events' }
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-2 text-gray-700 animate-fade-in-delay"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <benefit.icon className="w-5 h-5 text-sky-500" />
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Subscription Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-white/30 backdrop-blur-sm border border-white/30 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-full -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 glow-effect"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="max-w-md mx-auto animate-fade-in">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold">Thank you for subscribing!</span>
                </div>
                <p className="text-green-600 text-sm mt-2">
                  Check your email for a welcome message and special discount code.
                </p>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-sm text-gray-500 mt-6">
            We respect your privacy. Unsubscribe at any time. No spam, just beauty!
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 mt-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[
                  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40",
                  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=40",
                  "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40"
                ].map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Subscriber ${index + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span className="text-sm">Join 25,000+ subscribers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;