'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChefHat, ArrowLeft, ShoppingCart, Trash2, CreditCard, Check } from 'lucide-react';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const router = useRouter();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const handleBack = () => {
    router.push('/prompt');
  };

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    setIsLoading(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      setIsOrderPlaced(true);
      localStorage.removeItem('cartItems'); // Clear cart after successful order
    }, 2000);
  };

  const handleContinueShopping = () => {
    router.push('/prompt');
  };

  // Calculate estimated total (this would be replaced with actual pricing logic)
  const calculateTotal = () => {
    return cartItems.length * 2.99; // Example pricing: $2.99 per item
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Recipe
        </button>

        <div className="flex items-center justify-center mb-8">
          <ChefHat className="h-10 w-10 text-teal-400 mr-3" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            CookbotAI
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {isOrderPlaced ? (
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700 text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Order Placed Successfully!</h2>
              <p className="text-gray-300 mb-8">Your ingredients will be delivered soon. Get ready to cook!</p>
              <button
                onClick={handleContinueShopping}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors"
              >
                Continue Exploring Recipes
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <ShoppingCart className="mr-2 h-6 w-6 text-teal-400" />
                Checkout
              </h2>
              
              {cartItems.length === 0 ? (
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700 text-center">
                  <p className="text-gray-300 mb-6">Your cart is empty</p>
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors"
                  >
                    Go Back to Recipes
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700">
                      <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Shopping List</h3>
                      <ul className="divide-y divide-gray-700">
                        {cartItems.map((item, index) => (
                          <li key={index} className="py-4 flex justify-between items-center">
                            <span className="text-gray-200">{item}</span>
                            <div className="flex items-center">
                              <span className="text-gray-400 mr-4">$2.99</span>
                              <button
                                onClick={() => removeItem(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700">
                      <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Order Summary</h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Items ({cartItems.length})</span>
                          <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Delivery</span>
                          <span>$4.99</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-700 pt-3">
                          <span className="font-semibold">Total</span>
                          <span className="font-semibold text-teal-400">${(calculateTotal() + 4.99).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleCheckout}
                        disabled={isLoading}
                        className="w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors flex items-center justify-center"
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <CreditCard className="mr-2 h-5 w-5" />
                            Place Order
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}