import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Heart,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Story', href: '#story' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' }
    ],
    products: [
      { name: 'Skincare', href: '#skincare' },
      { name: 'Face Care', href: '#face-care' },
      { name: 'Body Care', href: '#body-care' },
      { name: 'New Arrivals', href: '#new' }
    ],
    network: [
      { name: 'Join Network', href: '#packages' },
      { name: 'Member Benefits', href: '#benefits' },
      { name: 'Training', href: '#training' },
      { name: 'Success Stories', href: '#stories' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Shipping Info', href: '#shipping' },
      { name: 'Returns', href: '#returns' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#', color: 'hover:text-blue-600' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', color: 'hover:text-pink-600' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', color: 'hover:text-sky-600' },
    { icon: <Youtube className="h-5 w-5" />, href: '#', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-purple-400 to-pink-600 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">EmpowerUp</h3>
                  <p className="text-sky-200 text-sm">Beauty & Wellness</p>
                </div>
              </div>
              
              <p className="text-sky-100 leading-relaxed mb-6">
                Empowering beauty enthusiasts worldwide with premium products and 
                life-changing opportunities. Join our community and transform your 
                passion into prosperity.
              </p>

              <div className="flex items-center space-x-2 text-sky-200 mb-2">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">50,000+ Happy Members Worldwide</span>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass p-4 rounded-2xl"
            >
              <h4 className="font-semibold mb-3 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Stay Updated
              </h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm placeholder-sky-200 focus:outline-none focus:border-sky-400"
                />
                <motion.button
                  className="bg-gradient-to-r from-sky-500 to-blue-600 p-2 rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3 grid md:grid-cols-4 gap-8">
            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-sky-200 hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Products Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold text-lg mb-4">Products</h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-sky-200 hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Network Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-semibold text-lg mb-4">Network</h4>
              <ul className="space-y-3">
                {footerLinks.network.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-sky-200 hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-sky-200 hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-sky-200 text-sm">hello@empowerup.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-sky-200 text-sm">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Visit Us</p>
                <p className="text-sky-200 text-sm">New York, NY 10001</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10"
        >
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-sky-200">© 2024 EmpowerUp. Made with</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span className="text-sky-200">for beauty enthusiasts</span>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className={`w-10 h-10 glass rounded-xl flex items-center justify-center text-sky-200 ${social.color} transition-all duration-300`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;