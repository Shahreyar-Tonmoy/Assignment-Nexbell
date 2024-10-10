/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */

import { GoDot } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

const Dropdown = ({
  closeDrawer,
  menu,
  name,
  icon,
  isOpen,
  setIsOpen,
  activeDropdown,
  setActiveDropdown,
}) => {
  const dropdownRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setMaxHeight(dropdownRef.current.scrollHeight);
    } else {
      setMaxHeight(0);
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setActiveDropdown(isOpen ? null : name);
  };

  return (
    <div className="group w-full">
      <div
        onClick={toggleDropdown}
        className="flex w-full cursor-pointer items-center hover:bg-[#1E282C] pr-4"
      >
        <button className="outline-none focus:outline-none w-full px-5 py-2 items-center space-x-4 rounded-xl text-white text-sm flex">
          <span className="">{icon}</span>
          <span className="pr-1 font-semibold">{name}</span>
        </button>
        <span className="">
          <svg
            className={`fill-current text-white h-4 w-4 transform ${
              isOpen ? "-rotate-120" : "rotate-90"
            } transition-transform duration-700 ease-in-out`}
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </span>
      </div>
      <ul
        ref={dropdownRef}
        style={{ maxHeight: maxHeight }}
        className={`w-full rounded-sm overflow-hidden transition-all duration-700 ease-in-out origin-top`}
      >
        {menu.map((data, idx) => (
          <li key={idx} className="w-full">
            <NavLink
              to={data.pathName}
              onClick={() => {
                closeDrawer();
                setIsOpen(name); // Keep the dropdown open
              }}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "relative px-0 py-2 flex items-center space-x-4 text-white border-l-2 border-green-50 text-[13px] hover:bg-[#1E282C] bg-[#2C3B41]"
                  : "relative px-0 py-2 flex hover:bg-[#1E282C] text-gray-300 text-[13px] items-center space-x-4"
              }
            >
              <span className="flex items-center px-5 gap-2 justify-start">
                {<GoDot className="font-bold" />}
                {data.name}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
