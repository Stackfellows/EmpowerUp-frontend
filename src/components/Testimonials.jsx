import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Diamond Member",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 5,
      text: "BeautyGlow has transformed not just my skin, but my entire business. In just 6 months, I've built a team of 50+ members and earned $15K monthly. The products are amazing and the support system is incredible!",
      earnings: "$15,000/month",
      teamSize: "50+ members"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "Platinum Leader",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 5,
      text: "I never thought I could run my own business until I found BeautyGlow. The training, the community, and the products themselves have exceeded all my expectations. I'm now financially independent!",
      earnings: "$22,000/month",
      teamSize: "80+ members"
    },
    {
      id: 3,
      name: "Jessica Chen",
      role: "Gold Achiever",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 5,
      text: "The quality of BeautyGlow products is unmatched. My customers love them and keep coming back. The business opportunity has allowed me to achieve my dreams of working from home.",
      earnings: "$8,500/month",
      teamSize: "30+ members"
    },
    {
      id: 4,
      name: "Amanda Taylor",
      role: "Ruby Member",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 5,
      text: "Starting with BeautyGlow was the best decision I ever made. The products work amazingly, and the income potential is real. I've been able to help so many people while building my own success.",
      earnings: "$12,000/month",
      teamSize: "45+ members"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.1),transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our successful network members who have transformed their lives
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Testimonial Content */}
              <div className="order-2 lg:order-1 animate-slide-in-left">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-12 h-12 text-sky-500/30" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                {/* Author Info */}
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sky-600 font-semibold text-lg">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {testimonials[currentTestimonial].earnings}
                    </div>
                    <div className="text-green-700 text-sm font-medium">
                      Monthly Earnings
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-sky-100 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {testimonials[currentTestimonial].teamSize}
                    </div>
                    <div className="text-blue-700 text-sm font-medium">
                      Team Size
                    </div>
                  </div>
                </div>
              </div>

              {/* Author Image */}
              <div className="order-1 lg:order-2 flex justify-center animate-slide-in-right">
                <div className="relative">
                  <div className="w-80 h-80 rounded-full overflow-hidden bg-gradient-to-br from-sky-200 to-blue-200 p-2">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-sky-400/20 to-blue-400/20 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 w-12'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { number: '4.9/5', label: 'Average Rating', icon: '⭐' },
            { number: '10,000+', label: 'Happy Members', icon: '👥' },
            { number: '98%', label: 'Satisfaction Rate', icon: '💯' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 animate-fade-in-delay"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-sky-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;