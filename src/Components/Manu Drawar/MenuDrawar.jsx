/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";



export const MenuDrawar = ({ openMenu, setOpenMenu }) => {
  const [closing, setClosing] = useState(false);
  const axiosPublic = UseAxiosPublic();
  // Handle the close animation and delay the visibility change
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setOpenMenu(false);
    }, 200);
  };

  const handleCategoryClick = (category) => {
    handleClose();
  };

  const location = useLocation();
  const path = location?.pathname;

  const {
    isLoading,
    error,
    data: Category,
  } = useQuery({
    queryKey: ["Category"],
    queryFn: () =>
      axiosPublic.get("/products/categories").then((res) => res.data),
  });

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm ${
        openMenu || closing ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={handleClose}
        className="fixed inset-0 z-40 bg-black opacity-50"
      ></div>

      {/* Cart Drawer */}
      <div
        className={`relative z-50 pb-20 lg:w-96 w-full bg-white shadow-lg h-full  transform transition-transform duration-500 ease-out ${
          openMenu && !closing ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Cart Header */}
        <div className="p-4 border-b flex justify-center flex-row ">
          <Link to={"/"} className="text-xl">
            Nex Shop
          </Link>
        </div>

        <div className="py-5 px-8 bg-white flex flex-col h-full overflow-y-auto">
          <NavLink
            to={`/all-products`}
            className={`mt-2 text-lg font-medium relative cursor-pointer hover:text-[#94d2bc]`}
            onClick={() => handleCategoryClick("All Categories")}
          >
            <span
              className={`relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-[#94d2bc] after:transition-all after:duration-300 ${
                path === "/all-products" ? "after:w-full text-[#94d2bc]" : ""
              }`}
            >
              All Categories
            </span>
          </NavLink>

          {Category?.map((data, index) => (
            <NavLink
              to={`/all-products/${data?.name.replace(/\s+/g, "-").toLowerCase()}`}
              key={index}
              className={({ isActive }) =>
                `mt-2 text-lg font-medium relative cursor-pointer hover:text-[#94d2bc]`
              }
              onClick={() => handleCategoryClick(data?.name)}
            >
              {({ isActive }) => (
                <span
                  className={`relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-[#94d2bc] after:transition-all after:duration-300 ${
                    isActive ? "after:w-full text-[#94d2bc]" : ""
                  }`}
                >
                  {data?.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
