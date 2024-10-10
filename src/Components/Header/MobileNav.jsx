import { useState } from "react";
import { HiHome, HiMiniBars3CenterLeft } from "react-icons/hi2";

import { MdOutlineCategory } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { SearchModal } from "../Search Modal/SearchModal";
import { LuSearch } from "react-icons/lu";
import { MenuDrawar } from "../Manu Drawar/MenuDrawar";




const MobileNav = () => {

  const {pathname}= useLocation()
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);


  return (

    <div>
    <div className="fixed lg:hidden bottom-2 left-0 right-0 rounded-3xl mx-2 bg-[#94d2bc] shadow-lg flex justify-evenly z-50 items-center">

      <NavLink to="/">
        {({ isActive, isPending }) => (
          <div
            className={`relative mb-2 ${isPending ? "pending" : ""} ${
              isActive
                ? "transition-all duration-700 ease-in-out rounded-full flex flex-col items-center"
                : "p-2 rounded-full flex flex-col items-center"
            }`}
          >
            <div className="relative mb-2">
              {isActive ? (
                <div className="absolute inset-0 flex justify-center items-center -top-6">
                  <div className="p-2 rounded-full bg-white border-[6px] border-[#94d2bc]  ">
                    <HiHome size={24} className="text-[#94d2bc]" />
                  </div>
                </div>
              ) : (
                <div className="p-2 rounded-full   ">
                  <HiHome size={24} className="text-white" />
                </div>
              )}
            </div>
            {isActive && (
              <span className="text-sm text-white mt-2 font-bold ">Home</span>
            )}
          </div>
        )}
      </NavLink>

      <NavLink to="/all-products">
        {({ isActive, isPending }) => (
          <div
            className={`relative mb-2 ${isPending ? "pending" : ""} ${
              isActive
                ? "transition-all duration-700 ease-in-out rounded-full flex flex-col items-center"
                : "p-2 rounded-full flex flex-col items-center"
            }`}
          >
            <div className="relative mb-2">
              {isActive ? (
                <div className="absolute inset-0 flex justify-center items-center -top-6">
                  <div className="p-2 rounded-full bg-white border-[6px] border-[#94d2bc]  ">
                    <MdOutlineCategory 
                      size={24}
                      className="text-[#94d2bc]"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-2 rounded-full   ">
                  <MdOutlineCategory size={24} className="text-white" />
                </div>
              )}
            </div>
            {isActive && (
              <span className="text-sm text-white mt-2 font-bold ">Categories</span>
            )}
          </div>
        )}
      </NavLink>



      <NavLink to={pathname} onClick={()=>setOpenModal(true)}>
        {({ openModal }) => (
          <div
            className={`relative mb-2 ${openModal ? "pending" : ""} ${
              openModal
                ? "transition-all duration-700 ease-in-out rounded-full flex flex-col items-center"
                : "p-2 rounded-full flex flex-col items-center"
            }`}
          >
            <div className="relative mb-2">
              {openModal ? (
                <div className="absolute inset-0 flex justify-center items-center -top-6">
                  <div className="p-2 rounded-full bg-white border-[6px] border-[#94d2bc]  ">
                    <LuSearch size={24} className="text-[#94d2bc]" />
                  </div>
                </div>
              ) : (
                <div className="p-2 rounded-full   ">
                  <LuSearch size={24} className="text-white" />
                </div>
              )}
            </div>
            {openModal && (
              <span className="text-sm text-white mt-2 font-bold ">Search</span>
            )}
          </div>
        )}
      </NavLink>
      <NavLink to={pathname} onClick={()=>setOpenMenu(true)}>
        {({ openMenu }) => (
          <div
            className={`relative mb-2 ${openMenu ? "pending" : ""} ${
              openMenu
                ? "transition-all duration-700 ease-in-out rounded-full flex flex-col items-center"
                : "p-2 rounded-full flex flex-col items-center"
            }`}
          >
            <div className="relative mb-2">
              {openMenu ? (
                <div className="absolute inset-0 flex justify-center items-center -top-6">
                  <div className="p-2 rounded-full bg-white border-[6px] border-[#94d2bc]  ">
                    <HiMiniBars3CenterLeft size={24} className="text-[#94d2bc]" />
                  </div>
                </div>
              ) : (
                <div className="p-2 rounded-full   ">
                  <HiMiniBars3CenterLeft size={24} className="text-white" />
                </div>
              )}
            </div>
            {openMenu && (
              <span className="text-sm text-white mt-2 font-bold ">Menu</span>
            )}
          </div>
        )}
      </NavLink>

    </div>
    <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
    <MenuDrawar openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </div>
  );
};

export default MobileNav;
