import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User, Sparkles, LogOut } from "lucide-react"; // Import LogOut icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); // State to hold the full user object
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load user data from localStorage when component mounts
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // Add an event listener for custom 'userLoggedIn' event
    // This allows other components (like Login.jsx) to notify Navbar of a login
    const handleUserLoggedIn = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };
    window.addEventListener("userLoggedIn", handleUserLoggedIn);

    // Add an event listener for a custom 'userLoggedOut' event
    // This allows other components (or even this one) to update the UI on logout
    const handleUserLoggedOut = () => {
      setUser(null);
    };
    window.addEventListener("userLoggedOut", handleUserLoggedOut);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener("userLoggedIn", handleUserLoggedIn);
      window.removeEventListener("userLoggedOut", handleUserLoggedOut);
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    localStorage.removeItem("user"); // Remove user data
    setUser(null); // Clear user state in Navbar
    navigate("/login"); // Redirect to login page
    // Dispatch a custom event to notify other components of logout
    window.dispatchEvent(new Event("userLoggedOut"));
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/store", label: "Store" },
    { path: "/packages", label: "Packages" },
    { path: "/about", label: "About" },
    { path: "/profile", label: "Profile" }, // User Profile link
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/20 backdrop-blur-lg border-b border-white/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-sky-500 group-hover:text-sky-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-sky-400 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              EmpowerUp
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    location.pathname === item.path
                      ? "bg-white/20 text-sky-700 shadow-lg backdrop-blur-sm border border-white/30"
                      : "text-gray-700 hover:bg-white/10 hover:text-sky-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-sky-600 transition-colors duration-300 hover:scale-110">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                3
              </span>
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                {" "}
                {/* Increased space-x for better separation */}
                <span className="text-sm font-semibold text-sky-700">
                  Hello, {user.name}!
                </span>
                {/* Logout button for desktop */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 glow-effect"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 glow-effect"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-sky-600 hover:bg-white/10 transition-all duration-300"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-white/20 backdrop-blur-lg border-b border-white/20`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-white/20 text-sky-700 shadow-lg backdrop-blur-sm border border-white/30"
                  : "text-gray-700 hover:bg-white/10 hover:text-sky-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <>
              {/* Display user's name in mobile view */}
              <span className="flex items-center space-x-2 text-sky-700 px-3 py-2 mt-4 mx-3 font-semibold">
                Hello, {user.name}!
              </span>
              {/* Logout button for mobile */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false); // Close mobile menu after logout
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-2 rounded-lg hover:shadow-lg transition-all duration-300 mt-2 mx-3"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:shadow-lg transition-all duration-300 mt-4 mx-3"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
