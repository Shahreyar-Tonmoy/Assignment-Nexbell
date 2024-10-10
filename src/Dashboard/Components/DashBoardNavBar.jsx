import { RxCrossCircled } from "react-icons/rx";

import { IoSpeedometerSharp } from "react-icons/io5";

import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { IoMdAddCircleOutline } from "react-icons/io";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { AiOutlineDeliveredProcedure, AiOutlineProduct } from "react-icons/ai";
import { BiSolidFoodMenu } from "react-icons/bi";
import {
  MdCancelPresentation,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdPendingActions,
} from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";

const DashBoardNavBar = () => {
  const location = useLocation();
  const [itemCollapseOpen, setItemCollapseOpen] = useState(true);
  const [orderCollapseOpen, setOrderCollapseOpen] = useState(true);
  const capitalizeFirstLetter = (str) => {
    if (str === "/dashboard") {
      return "Home"; // Return "Home" if the pathname is exactly "/dashboard"
    }

    return str
      .replace(/-/g, " ") // Replace hyphens with spaces
      .split("/dashboard/") // Split by slashes
      .filter(Boolean) // Remove empty segments
      .map(
        (segment) =>
          segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
      ) // Capitalize first letter of each segment
      .join(" "); // Join segments with spaces
  };

  const formattedPathname = capitalizeFirstLetter(location.pathname);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleLinkClick = () => {
    setDrawerOpen(false); // Close the drawer
    document.getElementById("my-drawer").checked = false; // Uncheck the checkbox
  };

  return (
    <div>
      <div className=" h-16 lg:h-20  border-b bg-[#0c4657] rounded-xl flex flex-col justify-center">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container ">
          <div className=" hidden text-[#e2e2e2] justify-center flex-col lg:flex">
            <div className="flex items-center space-x-2">
              <Link to={"/dashboard"}>Dashboard</Link> <span>/</span>{" "}
              <Link>{formattedPathname}</Link>
            </div>
            <span className="text-xl font-bold">{formattedPathname}</span>
          </div>

          <div className="lg:hidden z-50">
            <div className="drawer drawer-end overflow-y-scroll overflow-x-hidden ">
              <input
                id="my-drawer"
                type="checkbox"
                checked={drawerOpen}
                onChange={toggleDrawer}
                className="drawer-toggle"
              />
              <div className="drawer-content  ">
                <h1 className="lg:hidden text-black text-2xl font-semibold">
                  Kiddee
                </h1>
              </div>
              <div className="drawer-side  ">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>

                <ul className="w-50 min-h-full bg-[#0c4657] text-black ">
                  <div className=" flex justify-evenly ml-5 items-center ">
                    <Link to={"/"}>
                      <h1 className="text-center  text-2xl font-semibold">
                        Kiddee
                      </h1>
                    </Link>
                    <label
                      htmlFor="my-drawer"
                      aria-label="close sidebar"
                      className="  text-2xl btn btn-ghost bg-transparent hover:bg-transparent "
                    >
                      <RxCrossCircled></RxCrossCircled>
                    </label>
                  </div>

                  {/* navigation button section */}
                  <div className="space-y-2 tracking-wide mt-8">
                    {/* Sidebar Menu Part */}
                    <NavLink
                      to="/dashboard/home"
                      onClick={() => handleLinkClick()}
                      className={({ isActive, isPending }) =>
                        `${isPending ? "pending" : ""} ${
                          isActive
                            ? "outline-none bg-[#94d2bc] text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-sm flex"
                            : "outline-none hover:bg-[#94d2bc] hover:text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-[#e2e2e2] text-sm flex transition duration-200"
                        }`
                      }
                    >
                      <IoSpeedometerSharp />
                      <span className="pr-1 font-semibold">Home</span>
                    </NavLink>

                    {/* order Management Dropdown */}
                    <div className="relative">
                      <div
                        className="cursor-pointer hover:bg-[#94d2bc] hover:text-[#0c4657] text-white font-medium py-2 px-5 flex items-center justify-between"
                        onClick={() => setOrderCollapseOpen(!orderCollapseOpen)}
                      >
                        <span>Order Management</span>
                        <span className="text-white">
                          {orderCollapseOpen ? (
                            <MdOutlineKeyboardArrowDown />
                          ) : (
                            <MdOutlineKeyboardArrowUp />
                          )}
                        </span>
                      </div>

                      {orderCollapseOpen && (
                        <div className=" w-full text-white ">
                          <div className="flex flex-col space-y-2 py-2 ">
                            {[
                              {
                                to: "/dashboard/pending-order",
                                label: "Pending Order",
                                icon: <MdPendingActions />,
                              },
                              {
                                to: "/dashboard/confirm-order",
                                label: "Confirm Order",
                                icon: <BiSolidFoodMenu />,
                              },
                              {
                                to: "/dashboard/delivered-order",
                                label: "Delivered Order",
                                icon: <AiOutlineDeliveredProcedure />,
                              },
                              {
                                to: "/dashboard/returned-order",
                                label: "Returned Order",
                                icon: <TbTruckReturn />,
                              },
                              {
                                to: "/dashboard/canceled-order",
                                label: "Canceled Order",
                                icon: <MdCancelPresentation />,
                              },
                            ].map(({ to, label, icon }) => (
                              <NavLink
                                key={to}
                                to={to}
                                onClick={() => handleLinkClick()}
                                className={({ isActive, isPending }) =>
                                  `${isPending ? "pending" : ""} ${
                                    isActive
                                      ? "outline-none bg-[#94d2bc] text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-sm flex"
                                      : "outline-none hover:bg-[#94d2bc] hover:text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-[#e2e2e2] text-sm flex transition duration-200"
                                  }`
                                }
                              >
                                {icon}
                                <span className="pr-1 font-semibold">
                                  {label}
                                </span>
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Item Management Dropdown */}
                    <div className="relative">
                      <div
                        className="cursor-pointer hover:bg-[#94d2bc] hover:text-[#0c4657] text-white font-medium py-2 px-5 flex items-center justify-between"
                        onClick={() => setItemCollapseOpen(!itemCollapseOpen)}
                      >
                        <span>Item Management</span>
                        <span className="text-white">
                          {itemCollapseOpen ? (
                            <MdOutlineKeyboardArrowDown />
                          ) : (
                            <MdOutlineKeyboardArrowUp />
                          )}
                        </span>
                      </div>

                      {itemCollapseOpen && (
                        <div className=" w-full text-white ">
                          <div className="flex flex-col space-y-2 py-2 ">
                            {[
                              {
                                to: "/dashboard/all-item",
                                label: "All Item",
                                icon: <AiOutlineProduct />,
                              },
                              {
                                to: "/dashboard/add-item",
                                label: "Add Item",
                                icon: <IoMdAddCircleOutline />,
                              },
                              {
                                to: "/dashboard/add-category",
                                label: "Add Category",
                                icon: <BsDatabaseFillAdd />,
                              },
                            ].map(({ to, label, icon }) => (
                              <NavLink
                                key={to}
                                to={to}
                                onClick={() => handleLinkClick()}
                                className={({ isActive, isPending }) =>
                                  `${isPending ? "pending" : ""} ${
                                    isActive
                                      ? "outline-none bg-[#94d2bc] text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-sm flex"
                                      : "outline-none hover:bg-[#94d2bc] hover:text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-[#e2e2e2] text-sm flex transition duration-200"
                                  }`
                                }
                              >
                                {icon}
                                <span className="pr-1 font-semibold">
                                  {label}
                                </span>
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>

          {/* drawar button */}

          <label
            htmlFor="my-drawer"
            className="btn btn-ghost hover:bg-transparent cursor-pointer"
          >
            <span className=" flex items-center   lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 my-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DashBoardNavBar;
