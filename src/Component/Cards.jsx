import { notification } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../Redux/CartSlice';

export default function Cards({ id, image, BookName, yearOfPublishing, bookRating, price, isAddedToCart }) {
  // State to keep track of favorite items and cart state
  const [inCart, setInCart] = useState(isAddedToCart);
  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const openNotification = (bookName) => {
    api.open({
      message: "Item Added to Cart",
      description: `${bookName} has been added to your cart.`,
      type: "success",
      duration: 2,
    });
  };

  const handleAddItem = () => {
    if (inCart) {
      // If the item is already added, navigate to cart
      navigate("/cart"); // Navigate to the cart page
    } else {
      // Add item to the cart
      dispatch(
        addItem({
          id: id,
          name: BookName,
          price: price,
          quantity: 1,
          image: image,
        })
      );

      openNotification(BookName); // Corrected the variable name

      // Update the state to mark the item as added to cart
      setInCart(true);
    }
  };

  // Function to toggle the favorite status
  const toggleFavorite = (bookId) => {
    setIsFavorite(!isFavorite); // Toggling favorite status
  };

  // Function to calculate the offer price
  const offerPrice = (originalPrice, discountPercent) => {
    let discountAmount = (originalPrice * discountPercent) / 100;
    return originalPrice - discountAmount; // Return final price after discount
  };

  return (
    <div className="flex justify-center">
      {contextHolder}
      <div className="h-auto flex justify-center flex-wrap gap-16">
        <div
          key={id}
          className="p-4 flex flex-col gap-3 bg-white text-black w-[20rem] rounded-lg shadowClass relative"
        >
          {/* Favorite button */}
          <div className="flex justify-end absolute top-4 right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              onClick={() => toggleFavorite(id)} // Corrected toggle handler
              fill={isFavorite ? "red" : "currentColor"} // Fill color based on favorite status
            >
              <path
                d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.828q-1.601-1.593-2.528-2.81t-1.296-2.2T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.289Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98q-.369.986-1.296 2.202t-2.519 2.809q-1.592 1.592-4.06 3.828z"
              />
            </svg>
          </div>

          {/* Book image */}
          <div className="flex justify-center mt-2">
            <img
              src={image}
              alt={BookName}
              className="w-48 h-64 object-cover"
            />
          </div>

          <h2 className="font-medium text-black mt-10">{BookName}</h2>
          <p className="text-[#686868]">
            Year of Publishing: {yearOfPublishing}
          </p>
          <p className="text-[#686868]">Rating: {bookRating}</p>
          <p className="text-green-600 font-bold">Price: {price}</p>

          <button
            onClick={handleAddItem}
            className="bg-black border-2 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black mt-10"
          >
            {inCart ? 'Go to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
