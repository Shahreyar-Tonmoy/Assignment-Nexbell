import { Outlet, useNavigate } from "react-router-dom";
import DashBoardSideBar from "../Components/DashBoardSideBar";
import DashBoardNavBar from "../Components/DashBoardNavBar";
import { useEffect } from "react";




const DashboardLayout = () => {
  

  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to /dashboard/home when DashboardLayout mounts
    navigate('/dashboard/home');
  }, [navigate]);

  return (
    <div>
      
          {" "}
          <div className=" ">
            {" "}
            {/* Wrap DashBoardSideBar with p-3 */}
            <DashBoardSideBar></DashBoardSideBar>
          </div>
          <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] lg:pr-3 px-2 ">
            <div className="sticky top-3 z-10 mb-5">
              <DashBoardNavBar></DashBoardNavBar>
            </div>

            {/* outlet start here */}
            <Outlet></Outlet>
          </div>
      
    </div>
  );
};

export default DashboardLayout;
