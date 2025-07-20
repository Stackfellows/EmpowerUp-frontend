import React, { useState, useEffect } from 'react';
import { Users, DollarSign, TrendingUp, Award } from 'lucide-react';

const NetworkStats = () => {
  const [counts, setCounts] = useState({
    members: 0,
    earnings: 0,
    growth: 0,
    rewards: 0
  });

  const targets = {
    members: 15240,
    earnings: 2847000,
    growth: 89,
    rewards: 1250
  };

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounts({
          members: Math.floor(targets.members * progress),
          earnings: Math.floor(targets.earnings * progress),
          growth: Math.floor(targets.growth * progress),
          rewards: Math.floor(targets.rewards * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounts(targets);
        }
      }, stepTime);

      return () => clearInterval(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('network-stats');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Users,
      label: 'Active Members',
      value: counts.members.toLocaleString(),
      suffix: '+',
      color: 'from-blue-500 to-indigo-600',
      description: 'Growing network worldwide'
    },
    {
      icon: DollarSign,
      label: 'Total Earnings',
      value: `$${(counts.earnings / 1000000).toFixed(1)}M`,
      suffix: '+',
      color: 'from-green-500 to-emerald-600',
      description: 'Distributed to members'
    },
    {
      icon: TrendingUp,
      label: 'Growth Rate',
      value: counts.growth,
      suffix: '%',
      color: 'from-sky-500 to-blue-600',
      description: 'Monthly growth average'
    },
    {
      icon: Award,
      label: 'Rewards Given',
      value: counts.rewards,
      suffix: '+',
      color: 'from-purple-500 to-pink-600',
      description: 'Achievement rewards'
    }
  ];

  return (
    <section id="network-stats" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(59,130,246,0.1),transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Network Success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful entrepreneurs building their beauty business empire
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`inline-flex p-4 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-sky-400/20 to-blue-400/20 animate-spin-slow group-hover:animate-spin"></div>
              </div>

              {/* Value */}
              <div className="mb-2">
                <span className={`text-4xl lg:text-5xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
                <span className={`text-2xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-sky-600 transition-colors duration-300">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">
                {stat.description}
              </p>

              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 bg-gradient-to-br ${stat.color} rounded-full opacity-20 animate-float-${i + 1}`}
                    style={{
                      top: `${20 + i * 30}%`,
                      left: `${10 + i * 20}%`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-delay">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Join Our Success Story?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Start your journey today and become part of our thriving network of beauty entrepreneurs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 glow-effect">
                Join Network Now
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkStats;