/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5"; // Importing the close icon

import { useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

export const SearchModal = ({ openModal, setOpenModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isBackdropVisible, setBackdropVisible] = useState(openModal);
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    if (openModal) {
      setBackdropVisible(true); // Show backdrop when the modal opens
    }
  }, [openModal]);

  // Handle closing modal and backdrop separately
  const handleClose = () => {
    setOpenModal(false);
    setSearchQuery("");
    setFilteredProducts([]);
    setTimeout(() => {
      setBackdropVisible(false);
    }, 200);
  };

  // Function to handle navigation and modal close
  const handleCardClick = (product) => {
    handleClose(); // Close the modal and backdrop
    const url = `/item-details/${product?.title
      .replace(/\s+/g, "-")
      .toLowerCase()}/${product?.id}`;
  
      navigate(url, { state: { state: searchQuery || {} } });
  };

  // Handle search input change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    try {
      // Only make the request if there is a search query
      if (query.length > 0) {
        const response = await axiosPublic.get(
          `/products/search?q=${encodeURIComponent(query)}`
        );

        // Check if the request was successful and set the filtered products
        if (response.status === 200) {
          setFilteredProducts(response.data); // Assuming the products are returned in data.data
        } else {
          console.error("Error fetching products:", response.statusText);
        }
      } else {
        setFilteredProducts([]); // Clear filtered products if query is empty
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setFilteredProducts([]); // Clear filtered products in case of an error
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-150 ${
        isBackdropVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ visibility: isBackdropVisible ? "visible" : "hidden" }}
    >
      {/* Overlay */}
      <div
        onClick={handleClose} // Close modal on click
        className={`fixed inset-0 z-40 bg-black opacity-50 transition-opacity duration-150 ${
          openModal ? "opacity-50" : "opacity-0"
        }`}
      ></div>

      {/* Modal */}
      <div
        onClick={(e_) => e_.stopPropagation()}
        className={`w-full mx-auto p-6 bg-white h-screen lg:h-auto shadow-lg z-50 transition-all duration-150 ease-out ${
          openModal
            ? "lg:translate-y-0 lg:opacity-100 translate-y-0 opacity-100" // For lg: no translate, fully visible
            : "lg:-translate-y-20 lg:opacity-0 translate-y-0 opacity-0" // For lg: translate down and invisible
        }`}
      >
        {/* Close Icon for Small Devices */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <div className="flex-shrink-0 text-lg font-semibold">
            Nex Shop
          </div>
          <button onClick={handleClose} className="text-gray-500">
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Logo and Input Box */}
        <div className="flex items-center justify-between container mx-auto gap-8 mb-4 md:mb-6">
          {/* Logo */}
          <div className="flex-shrink-0 hidden md:flex font-semibold text-xl">
          Nex Shop
          </div>

          {/* Search Input */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange} // Handle input changes
              className="w-full rounded-full border border-[#94d2bc] px-4 py-2 text-sm focus:outline-none focus:border-[#94d2bc]"
              placeholder="Search products"
            />
            <button className="absolute right-3 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-[#94d2bc]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m2.35-5.15A7.5 7.5 0 1110.5 3.5a7.5 7.5 0 018.5 8.5z"
                />
              </svg>
            </button>
          </div>

          {/* Cart Icon */}
          <div className="flex-shrink-0"></div>
        </div>

        {/* Search Results */}
        {filteredProducts?.products?.length > 0 ? (
          <div className="overflow-y-auto max-h-[80vh] px-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6 container mx-auto mt-4">
            {filteredProducts?.products?.map((product, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(product)}
                className="border p-4 rounded-lg cursor-pointer shadow-sm"
              >
                <img
                  src={product?.images[0]}
                  alt={product?.name}
                  className="w-full h-32 object-contain mb-4 zoom-out"
                />
                <h3 className="text-sm font-medium">{product?.title}</h3>
                <p className="text-lg font-semibold text-gray-800">
                {product?.discountPercentage ? (
    <>
      <span className="line-through text-gray-500">$ {product?.price}</span> {/* Original price */}
      <span className="ml-2 text-red-600">$ {(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</span> {/* Discounted price */}
    </>
  ) : (
    <span>$ {product?.price}</span> // No discount, show the original price
  )}
                </p>
              </div>
            ))}
          </div>
        ) : searchQuery.length > 0 ? (
          <p className="text-center text-gray-500 mt-6">No products found.</p>
        ) : (
          <div className="text-sm text-gray-600 lg:max-w-screen-lg text-center xl:max-w-screen-xl mx-auto mt-4"></div>
        )}
      </div>
    </div>
  );
};
