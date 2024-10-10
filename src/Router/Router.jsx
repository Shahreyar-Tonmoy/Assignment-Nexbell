import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Home/Home";
import Products from "../Components/Products/Products";
import ItemDetails from "../Components/Item Details/ItemDetails";
import DashboardLayout from "../Dashboard/Layout/DashboardLayout";
import DashboardHome from "../Dashboard/Home/DashboardHome";
import AddProduct from "../Dashboard/All Component/AddProduct";
import AllProducts from "../Dashboard/All Component/AllProducts";
import UpdateProduct from "../Dashboard/All Component/UpdateProduct";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: "error.......",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <Products />,
      },
      {
        path: "/all-products/:name",
        element: <Products />,
      },
      {
        path: "/item-details/:name/:id",
        element: <ItemDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: "error.......",
    children: [
      {
        path: "/dashboard/home",
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/add-products",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/all-products",
        element: <AllProducts />,
      },
      {
        path: "/dashboard/update/:id",
        element: <UpdateProduct />,
      },

    ],
  },


]);

export default Router;
