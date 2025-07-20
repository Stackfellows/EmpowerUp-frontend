import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, Smartphone, ArrowLeft } from 'lucide-react';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dummy package data (should match your backend's packages array for consistency)
    const packages = [
        { id: 'starter', name: 'Starter Kit', price: "$299" },
        { id: 'business', name: 'Business Builder', price: "$599" },
        { id: 'empire', name: 'Empire Package', price: "$999" },
        { id: 'ultimate', name: 'Ultimate Pro', price: "$1999" }
    ];

    useEffect(() => {
        if (location.state && location.state.packageId) {
            const pkg = packages.find(p => p.id === location.state.packageId);
            if (pkg) {
                setSelectedPackage(pkg);
                setLoading(false);
            } else {
                setError("Selected package not found.");
                setLoading(false);
            }
        } else {
            setError("No package selected. Please go back and choose a package.");
            setLoading(false);
        }
    }, [location.state]);

    const handleConfirmPayment = (method) => {
        console.log(`Simulating payment confirmation for ${selectedPackage.name} via ${method}.`);
        // Simulate a successful payment and navigate to registration
        navigate('/login', {
            state: {
                packageId: selectedPackage.id,
                paymentConfirmed: true // Crucial flag for registration
            }
        });
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl">Loading payment options...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-xl text-red-500 p-4">
                <p>{error}</p>
                <button
                    onClick={() => navigate('/packages')}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Go to Packages
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-8 animate-slide-up">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">
                            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                                Complete Your Payment
                            </span>
                        </h1>
                        <p className="text-gray-600">
                            You are about to join the <span className="font-semibold">{selectedPackage.name}</span> for <span className="font-bold text-lg">{selectedPackage.price}</span>.
                        </p>
                        <p className="text-gray-600">Please select a payment method.</p>
                    </div>

                    <div className="space-y-4">
                        {/* Card Payment */}
                        <button
                            onClick={() => handleConfirmPayment('Card')}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                        >
                            <CreditCard className="w-6 h-6" />
                            <span>Pay with Card (Dummy)</span>
                        </button>

                        {/* EasyPaisa Payment */}
                        <button
                            onClick={() => handleConfirmPayment('EasyPaisa')}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                        >
                            <Smartphone className="w-6 h-6" />
                            <span>Pay with EasyPaisa (Dummy)</span>
                        </button>

                        {/* Bank Transfer Payment */}
                        <button
                            onClick={() => handleConfirmPayment('Bank Transfer')}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                        >
                            <Banknote className="w-6 h-6" />
                            <span>Pay with Bank Transfer (Dummy)</span>
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate('/packages')}
                            className="text-blue-600 font-semibold flex items-center justify-center mx-auto hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Packages
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
