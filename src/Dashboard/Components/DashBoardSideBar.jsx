import { AiOutlineProduct } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSpeedometerSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

const DashBoardSideBar = () => {

  return (
    <aside className="ml-[-100%] fixed z-10 top-3 bottom-3 left-3 text-[#94d2bc] pb-3 w-full  flex-col justify-between rounded-xl border-r bg-gradient-to-b from-[#0c4657]  to-[#123c48] shadow-lg transition duration-300 md:w-4/12 lg:ml-0 lg:w-[24%] xl:w-[19%] 2xl:w-[14%] hidden lg:flex">
      {/* dashboard condication apply here */}

      <div className="overflow-x-hidden">
        {/* logo section */}
        <div className="-mx-6 px-6 py-4">
          <Link to={"/dashboard/home"} className="flex justify-center text-xl font-bold">
           Nex Shop
          </Link>
        </div>

        <div className="px-5">
          <h1 className="text-[#e2e2e2] text-sm font-semibold"></h1>
        </div>

        {/* navigation button section */}
        <div className="space-y-2 tracking-wide mt-8">
          {/* Sidebar Menu Part */}
          <NavLink
            to="/dashboard/home"
            className={({ isActive, isPending }) =>
              `${isPending ? "pending" : ""} ${
                isActive
                  ? "outline-none bg-[#94d2bc] text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-sm flex"
                  : "outline-none hover:bg-[#94d2bc] hover:text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-[#e2e2e2] text-sm flex transition duration-200"
              }`
            }
          >
            <IoSpeedometerSharp />
            <span className="pr-1 font-semibold">Dashboard</span>
          </NavLink>

          <NavLink
            to="/dashboard/add-products"
            className={({ isActive, isPending }) =>
              `${isPending ? "pending" : ""} ${
                isActive
                  ? "outline-none bg-[#94d2bc] text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-sm flex"
                  : "outline-none hover:bg-[#94d2bc] hover:text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-[#e2e2e2] text-sm flex transition duration-200"
              }`
            }
          >
            <IoMdAddCircleOutline  />
            <span className="pr-1 font-semibold">Add Product</span>
          </NavLink>

          <NavLink
            to="/dashboard/all-products"
            className={({ isActive, isPending }) =>
              `${isPending ? "pending" : ""} ${
                isActive
                  ? "outline-none bg-[#94d2bc] text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-sm flex"
                  : "outline-none hover:bg-[#94d2bc] hover:text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-[#e2e2e2] text-sm flex transition duration-200"
              }`
            }
          >
            <AiOutlineProduct  />
            <span className="pr-1 font-semibold">All Product</span>
          </NavLink>



          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              `${isPending ? "pending" : ""} ${
                isActive
                  ? "outline-none bg-[#94d2bc] text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-sm flex"
                  : "outline-none hover:bg-[#94d2bc] hover:text-[#0c4657] focus:outline-none w-full px-5 py-2 items-center space-x-4 text-[#e2e2e2] text-sm flex transition duration-200"
              }`
            }
          >
            <FaHome  />
            <span className="pr-1 font-semibold">Home</span>
          </NavLink>


        </div>
      </div>
    </aside>
  );
};

export default DashBoardSideBar;
