import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../../Redux/CartSlice';

function Cart() {
  const [isCartOpen, setIsCartOpen] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id)); // Remove a specific item by its id
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart()); // Clear all items from the cart
  };

  const handleProceedToCheckout = () => {
    // Placeholder for checkout functionality (can be redirected to a checkout page)
    alert('Proceeding to checkout...');
  };

  // Calculate subtotal, ensuring each item.price is a valid number
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price);
    return acc + (isNaN(itemPrice) ? 0 : itemPrice * item.quantity);
  }, 0);

  const handleCloseCart = () => {
    setIsCartOpen(false); 
  };

  if (!isCartOpen) return null;

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center text-black mb-6">Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-lg text-gray-700 flex-grow">
          Your cart is empty
        </div>
      ) : (
        <div className="flex-grow flex flex-col md:flex-row gap-6 items-center">
          {/* Cart Items Table */}
          <div className="w-full md:w-2/3 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="border-b bg-black">
                  <th className="p-2 text-white sm:p-4 text-left font-semibold">Product</th>
                  <th className="p-2 text-white sm:p-4 text-left font-semibold">Price</th>
                  <th className="p-2 text-white sm:p-4 text-left font-semibold">Quantity</th>
                  <th className="p-2 text-white sm:p-4 text-left font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    {/* Product Image and Name */}
                    <td className="p-2 sm:p-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded mr-2 sm:mr-4"
                      />
                      <span className="text-sm sm:text-base text-black">{item.name}</span>
                    </td>

                    {/* Price */}
                    <td className="p-2 sm:p-4 text-black text-sm sm:text-base">₹{item.price}</td>

                    {/* Quantity */}
                    <td className="p-2 sm:p-4">
                      <div className="flex items-center">
                        <button
                          className="border rounded px-2 text-black"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-2 text-sm sm:text-base">{item.quantity}</span>
                        <button
                          className="border rounded px-2 text-black"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Remove Button */}
                    <td className="p-2 sm:p-4">
                      <button
                        className=""
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Totals */}
          <div className="w-full h-fit md:w-1/3 bg-gray-100 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-black">Cart totals</h2>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between mb-2 text-sm sm:text-base">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-semibold text-black">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-6 text-sm sm:text-base">
                <span className="text-gray-700">Total:</span>
                <span className="font-semibold text-black">₹{subtotal.toFixed(2)}</span>
              </div>
              <button
                className="w-full bg-red-600 text-white py-2 rounded-md font-semibold"
                onClick={handleProceedToCheckout}
              >
                PROCEED TO CHECKOUT
              </button>

              <button
                className="w-full bg-gray-400 text-white py-2 rounded-md mt-4 font-semibold"
                onClick={handleClearCart}
              >
                CLEAR CART
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
