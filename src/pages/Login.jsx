import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, MapPin, UserCheck } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    country: '',
    province: '',
    uplineName: '',
    uplineId: '',
    phone: '',
    cnic: '',
    confirmPassword: '',
    packageId: ''
  });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    if (location.state) {
      if (location.state.packageId) {
        setFormData(prevData => ({
          ...prevData,
          packageId: location.state.packageId
        }));
        console.log("Pre-filled packageId from navigation state:", location.state.packageId);
      }
      if (location.state.paymentConfirmed) {
        setPaymentConfirmed(true);
        setIsLogin(false);
        console.log("Payment confirmed from navigation state.");
      } else if (location.state.packageId && !location.state.paymentConfirmed) {
        alert("Please complete the payment for your selected package first.");
        navigate('/payment', { state: { packageId: location.state.packageId } });
      }
    }
  }, [location.state, navigate]);


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Login failed");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful!"); // This alert is blocking
        
        // 🌟 ADD THIS LOG 🌟
        console.log("Attempting to navigate to /store after successful login.");
        navigate("/store"); // This is the navigation line
      } catch (error) {
        console.error("Login error:", error.message);
        alert(`Login failed: ${error.message}`);
      }
    } else {
      if (!paymentConfirmed && formData.packageId) {
        alert("Please complete the payment for your selected package first.");
        navigate('/payment', { state: { packageId: formData.packageId } });
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.fullName,
            dob: formData.dateOfBirth,
            country: formData.country,
            province: formData.province,
            uplineName: formData.uplineName,
            uplineId: formData.uplineId,
            phone: formData.phone,
            cinicNumber: formData.cnic,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            packageId: formData.packageId
          })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Registration failed");

        alert("Account created successfully!");
        setIsLogin(true);
      } catch (error) {
        console.error("Signup error:", error.message);
        alert(`Signup failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-8 animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back' : 'Join EmpowerUp'}
              </span>
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? 'Sign in to access your account'
                : 'Start your beauty business journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                {!paymentConfirmed && formData.packageId && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Payment Required!</strong>
                        <span className="block sm:inline"> Please complete payment for the <span className="font-semibold">{formData.packageId.toUpperCase()}</span> package.</span>
                        <button
                            onClick={() => navigate('/payment', { state: { packageId: formData.packageId } })}
                            type="button"
                            className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Go to Payment
                        </button>
                    </div>
                )}

                {(paymentConfirmed || !formData.packageId) && (
                  <>
                    <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                    <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                    <input type="text" name="province" placeholder="Province" value={formData.province} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                    <input type="text" name="uplineName" placeholder="Upline Name (Optional)" value={formData.uplineName} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                    <input type="text" name="uplineId" placeholder="Upline ID (Optional)" value={formData.uplineId} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                    <input type="tel" name="phone" placeholder="Phone" maxLength={11} value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                    <input type="text" name="cnic" maxLength={13} placeholder="CNIC" value={formData.cnic} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                    {formData.packageId && (
                        <div className="text-sm text-gray-700 p-2 bg-blue-50 rounded-lg">
                            Selected Package: <span className="font-semibold">{formData.packageId.toUpperCase()}</span> (Payment Confirmed)
                            <input type="hidden" name="packageId" value={formData.packageId} />
                        </div>
                    )}
                  </>
                )}
              </>
            )}
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300" />
            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300" />
            {!isLogin && (
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300" />
            )}

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">{isLogin ? 'Login' : 'Register'}</button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm">
              {isLogin ? 'New here?' : 'Already have an account?'}{' '}
              <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 font-semibold">
                {isLogin ? 'Create an account' : 'Login'}</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
