import React from 'react';
import { Heart, Users, Award, Sparkles, Target, Globe, TrendingUp, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description: "We never compromise on the quality of our products or service to our community."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our success is built on the success of our members and their thriving businesses."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from product development to customer service."
    },
    {
      icon: Shield,
      title: "Trust & Integrity",
      description: "We build lasting relationships based on trust, transparency, and ethical business practices."
    }
  ];

  const achievements = [
    { number: "50K+", label: "Happy Customers", icon: "👥" },
    { number: "500+", label: "Premium Products", icon: "✨" },
    { number: "98%", label: "Satisfaction Rate", icon: "💯" },
    { number: "15K+", label: "Network Members", icon: "🌟" },
    { number: "$5M+", label: "Member Earnings", icon: "💰" },
    { number: "25+", label: "Countries", icon: "🌍" }
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Former beauty industry executive with 15+ years of experience in product development and network marketing."
    },
    {
      name: "Michael Chen",
      role: "Head of Product Development",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Cosmetic chemist and formulation expert with a passion for creating effective, natural beauty solutions."
    },
    {
      name: "Jessica Rodriguez",
      role: "Community Director",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Network marketing specialist focused on empowering entrepreneurs and building strong communities."
    },
    {
      name: "David Thompson",
      role: "Chief Technology Officer",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Tech innovator dedicated to creating seamless digital experiences for our global network."
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              About BeautyGlow
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Empowering beauty entrepreneurs worldwide with premium products and 
            proven business opportunities since 2018.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-slide-in-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                BeautyGlow was born from a simple belief: everyone deserves access to 
                premium beauty products and the opportunity to build their own successful business.
              </p>
              <p>
                Founded in 2018 by beauty industry veterans, we recognized the gap between 
                high-quality skincare products and accessible business opportunities. We set out 
                to create a platform that would bridge this gap, offering both exceptional 
                products and a proven path to financial independence.
              </p>
              <p>
                Today, we're proud to be a global community of over 15,000 entrepreneurs who 
                have not only transformed their own lives but have helped thousands of customers 
                achieve their beauty goals. Our network spans 25+ countries, proving that 
                beauty and business success know no boundaries.
              </p>
            </div>
          </div>
          
          <div className="relative animate-slide-in-right">
            <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-3xl p-8">
              <img
                src="https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Beauty products"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="text-3xl font-bold text-sky-600 mb-1">7 Years</div>
                <div className="text-gray-700 font-medium">of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8 animate-slide-up">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              To empower individuals worldwide with premium beauty products and proven business 
              opportunities, creating a global community of successful entrepreneurs who inspire 
              confidence and transform lives through beauty and business.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mr-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              To become the world's most trusted beauty and business platform, where everyone 
              has access to exceptional products and the tools to build their dream lifestyle 
              through entrepreneurship and community support.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-4 bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl mb-6">
                  <value.icon className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20 animate-slide-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Our Achievements
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence and community success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-delay"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="text-2xl font-bold text-sky-600 mb-1">{achievement.number}</div>
                <div className="text-gray-600 text-sm">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind BeautyGlow's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-blue-500/20 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <div className="text-sky-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8 lg:p-12 animate-slide-up">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
            Ready to Join Our Success Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Become part of the BeautyGlow family and start building your dream business today. 
            With our premium products, proven system, and supportive community, your success is our success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 glow-effect">
              Start Your Journey
            </button>
            <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;