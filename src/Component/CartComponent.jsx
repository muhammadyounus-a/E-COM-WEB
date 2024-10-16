import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity, clearCart } from '../Redux/CartSlice';

function CartComponent() {
  const [isCartOpen, setIsCartOpen] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      dispatch(clearCart());
      alert('Cart has been cleared!');
    }
  };

  // Memoized subtotal calculation with proper currency formatting
  const subtotal = useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(
      cartItems.reduce((acc, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = parseInt(item.quantity) || 0;
        return acc + itemPrice * itemQuantity;
      }, 0)
    );
  }, [cartItems]);

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-white shadow-lg flex flex-col z-50">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl text-black font-semibold">Shopping Cart</h1>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={handleCloseCart}
          aria-label="Close cart"
        >
          ✕
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-black">
          <p>Your cart is empty</p>
          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
            onClick={handleCloseCart}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <p className="font-medium text-black">{item.name}</p>
                  <p className="text-sm text-black">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className={`text-gray-500 px-2 py-1 border-2 border-black rounded ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  className="text-black px-2 py-1 border-2 border-black rounded"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <button
                  className="text-red-500 px-2 py-1 border rounded"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="red" d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0m-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Subtotal:</span>
          <span className='text-green-700'>{subtotal}</span>
        </div>
        <button
          className="w-full bg-black text-white py-2 rounded-lg font-semibold mt-2"
          onClick={handleClearCart} // Clear cart button
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default CartComponent;