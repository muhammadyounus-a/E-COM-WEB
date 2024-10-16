import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

import Cards from "../Cards";

export default function Products() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the query params using URLSearchParams
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1; // Default to page 1
  const itemsPerPage = parseInt(searchParams.get("limit")) || 8; // Default to 5 items per page

    console.log({currentPage,itemsPerPage,searchParams});
    

  // Fetch data based on current query parameters (page and limit)
  function fetchData(page, limit) {
    fetch(`http://localhost:3000/books?_page=${page}&_per_page=${limit}`)
      .then( (res) => {
        return res.json();
      })
      .then((data) =>
      {
        console.log({data});
        setTotalItems(data.items)
        
        setData(
          data.data.map((book) => ({
            ...book,
            isFavorite: false,
            isAddedToCart: false, // Flag to track if the item is added to cart
          }))
        )
      }
      );
  }

  useEffect(() => {
    fetchData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]); // Refetch data when page or limit changes

  // Handle pagination change by updating query params
  const handlePageChange = (page) => {
    navigate(`/products?page=${page}&limit=${itemsPerPage}`);
  };

  console.log({data});
  

  return (
    <div className="mt-10 lg:pl-7">
      <section>
        <div className="h-auto flex justify-center flex-wrap gap-16">
          {data.map((item) => (
            <Cards key={item.id} {...item} />
          ))}
        </div>
      </section>
      <Pagination  
      className="mt-10"
        align="center"
         defaultCurrent={currentPage} 
         total={totalItems}
            onChange={handlePageChange}/>
    </div>
  );
}