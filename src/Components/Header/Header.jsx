
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { LuSearch } from "react-icons/lu";


import { Link, NavLink, useLocation } from "react-router-dom";


import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useState } from "react";
import { SearchModal } from "../Search Modal/SearchModal";


const Header = () => {
  const [openModal, setOpenModal] = useState(false);
//   const [openMenu, setOpenMenu] = useState(false);
//   const [openCartModal, setOpenCartModal] = useState(false);
  
  const location = useLocation();
  const path = location?.pathname;



  const axiosPublic = UseAxiosPublic();

  const {
    isLoading,
    error,
    data: Category,
  } = useQuery({
    queryKey: ["Category"],
    queryFn: () =>
      axiosPublic.get("/products/categories").then((res) => res.data),
  });

  if (isLoading) return (
    <div>
     Loading.......
    </div>
  )

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {/* Navbar logo and navigation  */}

      <div className="navbar  container mx-auto px-5">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost hidden">
              <HiMiniBars3CenterLeft
                // onClick={() => setOpenMenu(true)}
                className="text-2xl cursor-pointer text-[#94d2bc]"
              />
            </div>
          </div>
          <LuSearch
            onClick={() => setOpenModal(true)}
            className="text-2xl cursor-pointer hidden text-[#94d2bc] lg:block"
          />
        </div>
        <div className="navbar-center  flex items-center  lg:hidden">
          <Link to={"/"} className="text-2xl font-bold">
            Nex Shop
          </Link>
        </div>
        <div className="navbar-center hidden items-center lg:flex">
          <Link to={"/"} className="text-2xl font-bold">
          Nex Shop
          </Link>
        </div>
        <div className="navbar-end flex gap-4">
          <LuSearch
            onClick={() => setOpenModal(true)}
            className="text-2xl cursor-pointer text-[#94d2bc] hidden"
          />

          <Link to={"/dashboard"} className="hidden lg:block">
          <div className="relative text-[#94d2bc] font-semibold text-lg" 
       
       >
         Dashboard
       </div>
          </Link>


          


        </div>
      </div>

      {/* Navbar  menu */}

      <div className="navbar bg-[#e2e2e2] text-[#0c4657] hidden lg:flex">
  <div className="container flex justify-center mx-auto">
    <div className="flex gap-5 items-center flex-wrap py-2"> {/* Added flex-wrap for better alignment */}
      <NavLink
        to={`/all-products`}
        className={`relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-[#0c4657] after:transition-all after:duration-300 ${
          path === "/all-products" ? "after:w-full text-[#0c4657]" : " hover:after:w-full hover:text-[#0c4657]"
        }`}
      >
        <div className="line-clamp-2 text-center">All Category</div> {/* Centered text */}
      </NavLink>

      {Category?.map((data, index) => (
        <NavLink
          to={`/all-products/${data?.slug}`}
          key={index}
          className={({ isActive }) =>
            `relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-[#0c4657] after:transition-all after:duration-300 ${
              isActive ? "after:w-full text-[#0c4657]" : "text-gray-600 hover:after:w-full"
            }`
          }
        >
          <div className="line-clamp-2 text-center">{data?.name}</div> {/* Centered text */}
        </NavLink>
      ))}
    </div>
  </div>
</div>


      {/* Drawar of cart */}

       <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
      {/*<CartModal openCart={openCartModal} setOpenCart={setOpenCartModal} />
      <MenuDrawar openMenu={openMenu} setOpenMenu={setOpenMenu} /> */}
    </div>
  );
};

export default Header;
