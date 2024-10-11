import { Link, NavLink, useLocation, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { FaBars, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa"; // Import icons for the drawer toggle
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const Products = () => {
  const [categoriesCollapseOpen, setCategoriesCollapseOpen] = useState(true);
  const [availableCollapseOpen, setAvailableCollapseOpen] = useState(true);
  const [priceCollapseOpen, setPriceCollapseOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for the drawer
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const { name } = useParams();
  const axiosPublic = UseAxiosPublic();
  const [sortOption, setSortOption] = useState("none"); // Default sort option
  const [sortCollapseOpen, setSortCollapseOpen] = useState(true);
  const location = useLocation();
  const path = location?.pathname;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = (() => {
    const width = window.innerWidth;

    if (width < 640) return 6; // sm
    if (width < 768) return 8; // md
    if (width < 1024) return 10; // lg
    if (width < 1280) return 12; // xl
    return 16; // 2xl and above
  })();


  const handleSortChange =  (option) => {
  setSortOption(option); // Update the sort option
  setDrawerOpen(false);  // Close the drawer
};




  const { isLoading, error, data } = useQuery({
    queryKey: name ? ["SingleCategory", name] : ["AllItem"],
    queryFn: async () => {
      const fetchAllCategories = axiosPublic
        .get(`/products/categories`)
        .then((res) => res.data);
      if (name) {
        const [singleCategory, allCategories] = await Promise.all([
          axiosPublic.get(`/products/category/${name}`).then((res) => res.data),
          fetchAllCategories,
        ]);
        return { singleCategory, allCategories };
      } else {
        const allItems = await axiosPublic
          .get("/products")
          .then((res) => res.data);
        const allCategories = await fetchAllCategories;
        return { allItems, allCategories };
      }
    },
    enabled: true,
  });

  if (isLoading) {
    return <div>Loading.......</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredItems = name
    ? data?.singleCategory?.products.filter((item) => {
        const isInStock = inStock
          ? item.availabilityStatus === "In Stock"
          : true;
        const isOutOfStock = outOfStock
          ? item.availabilityStatus === "Out Of Stock"
          : true;
        const isWithinPriceRange =
          item.price >= priceRange[0] && item.price <= priceRange[1];

        return isInStock && isOutOfStock && isWithinPriceRange;
      })
    : data?.allItems?.products.filter((item) => {
        const isInStock = inStock
          ? item.availabilityStatus === "In Stock"
          : true;
        const isOutOfStock = outOfStock
          ? item.availabilityStatus === "Out Of Stock"
          : true;
        const isWithinPriceRange =
          item.price >= priceRange[0] && item.price <= priceRange[1];

        return isInStock && isOutOfStock && isWithinPriceRange;
      });

  // Sorting logic
  const sortedItems =
    sortOption === "none"
      ? filteredItems // No sorting applied, return filtered items as is
      : filteredItems?.sort((a, b) => {
          switch (sortOption) {
            case "priceLowToHigh":
              return a.price - b.price; // Sort by price low to high
            case "priceHighToLow":
              return b.price - a.price; // Sort by price high to low
            case "newest":
              return new Date(b.meta.createdAt) - new Date(a.meta.createdAt); // Sort by newest
            case "highestRating":
              return b.rating - a.rating; // Sort by highest rating
            default:
              return 0; // Default case (no sorting)
          }
        });

  // Pagination logic
  const totalPages = Math.ceil(sortedItems?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = sortedItems?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="mx-auto w-full">
      <h1 className="text-xl md:text-2xl lg:text-4xl text-center md:py-10 py-5 bg-[#94d2bc] text-black font-medium">
        {name
          ? name
              .replace(/-/g, " ")
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")
          : "All Categories"}
      </h1>

      {/* Drawer Button for small devices */}
      <div className="lg:hidden flex justify-between p-4">
        <h2 className="text-lg font-medium">Filter Options</h2>
        <button onClick={() => setDrawerOpen(!drawerOpen)}>
          {drawerOpen ? <FaTimes /> : <FaBars />} {/* Icon toggle */}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform transform ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={() => setDrawerOpen(false)}
            className="absolute top-4 right-4"
          >
            <FaTimes /> {/* Close icon */}
          </button>
          <h2 className="text-lg font-medium mb-4">Filter Options</h2>

          {/* Sorting Options */}
          <div className="mt-4">
            <h2 className="text-lg font-medium mb-2">Sort By</h2>
            <div className="flex flex-col space-y-2">
              <div>
                <input
                  type="radio"
                  id="sortNone"
                  name="sort"
                  checked={sortOption === "none"}
                  onChange={() => {
                    handleSortChange("none");
                   
                  }}
                />
                <label htmlFor="sortNone"> Default (No Sorting)</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="sortPriceLowToHigh"
                  name="sort"
                  checked={sortOption === "priceLowToHigh"}
                  onChange={() => {
                    handleSortChange("priceLowToHigh");
                  
                  }}
                />
                <label htmlFor="sortPriceLowToHigh"> Price: Low to High</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="sortPriceHighToLow"
                  name="sort"
                  checked={sortOption === "priceHighToLow"}
                  onChange={() => {
                    handleSortChange("priceHighToLow");
                  
                  }}
                />
                <label htmlFor="sortPriceHighToLow"> Price: High to Low</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="sortNewest"
                  name="sort"
                  checked={sortOption === "newest"}
                  onChange={() => {
                    handleSortChange("newest");
                   
                  }}
                />
                <label htmlFor="sortNewest"> Newest Arrivals</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="sortRating"
                  name="sort"
                  checked={sortOption === "highestRating"}
                  onChange={() => {
                    handleSortChange("highestRating");
                 
                  }}
                />
                <label htmlFor="sortRating"> Highest Rated</label>
              </div>
            </div>
          </div>

          {/* Availability Filters */}
          <div className="mt-4">
            <h2 className="text-lg font-medium mb-2">Availability</h2>
            <div className="flex flex-col space-y-2">
              <div>
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={inStock}
                  onChange={() => {
                    setInStock(!inStock);
                    setDrawerOpen(false); // Close the drawer when the checkbox is changed
                  }}
                />
                <label htmlFor="inStock">
                  {" "}
                  In Stock (
                  {data?.allItems?.products.length ||
                    (name && data?.singleCategory?.products.length)}
                  )
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="outOfStock"
                  name="outOfStock"
                  checked={outOfStock}
                  onChange={() => {
                    setOutOfStock(!outOfStock);
                    setDrawerOpen(false); // Close the drawer when the checkbox is changed
                  }}
                />
                <label htmlFor="outOfStock"> Out Of Stock</label>
              </div>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-4">
            <h2 className="text-lg font-medium mb-2">Price</h2>
            <input
              type="range"
              min={0}
              max="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, e.target.value])}
              className="range range-xs"
            />
            <div className="flex items-center justify-between">
              <div className="bg-[#94D2BC] px-3 py-2 text-black flex gap-3 rounded-md justify-between items-center">
                <span>$</span>
                <span>{priceRange[0]}</span>
              </div>
              <div className="bg-[#94D2BC] px-3 py-2 text-black flex gap-3 rounded-md justify-between items-center">
                <span>$</span>
                <span>{priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 my-10 container mx-auto">
        <div className="hidden lg:block lg:w-1/5 w-full">
          <div>
            {/* Sort By */}
            <div
              tabIndex={0}
              className={`collapse collapse-arrow min-h-full ${
                sortCollapseOpen ? "collapse-open" : "collapse-close"
              }`}
            >
              <div
                className="collapse-title text-lg font-medium"
                onClick={() => setSortCollapseOpen(!sortCollapseOpen)}
              >
                Sort By
              </div>
              <div className="collapse-content">
                <div className="flex flex-col space-y-2">
                  <div>
                    <input
                      type="radio"
                      id="sortNone"
                      name="sort"
                      checked={sortOption === "none"}
                      onChange={() => setSortOption("none")}
                    />
                    <label htmlFor="sortNone"> Default (No Sorting)</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="sortPriceLowToHigh"
                      name="sort"
                      checked={sortOption === "priceLowToHigh"}
                      onChange={() => setSortOption("priceLowToHigh")}
                    />
                    <label htmlFor="sortPriceLowToHigh">
                      {" "}
                      Price: Low to High
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="sortPriceHighToLow"
                      name="sort"
                      checked={sortOption === "priceHighToLow"}
                      onChange={() => setSortOption("priceHighToLow")}
                    />
                    <label htmlFor="sortPriceHighToLow">
                      {" "}
                      Price: High to Low
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="sortNewest"
                      name="sort"
                      checked={sortOption === "newest"}
                      onChange={() => setSortOption("newest")}
                    />
                    <label htmlFor="sortNewest"> Newest Arrivals</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="sortRating"
                      name="sort"
                      checked={sortOption === "highestRating"}
                      onChange={() => setSortOption("highestRating")}
                    />
                    <label htmlFor="sortRating"> Highest Rated</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div
              tabIndex={0}
              className={`collapse collapse-arrow min-h-full ${
                categoriesCollapseOpen ? "collapse-open" : "collapse-close"
              }`}
            >
              <div
                className="collapse-title text-lg font-medium"
                onClick={() =>
                  setCategoriesCollapseOpen(!categoriesCollapseOpen)
                }
              >
                Categories
              </div>
              <div className="collapse-content">
                <div className="flex flex-col space-y-3 mb-2">
                  <Link to={`/all-products`}>
                    <h4
                      className={`relative inline cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:bg-[#94d2bc] after:transition-all after:duration-300 ${
                        path === `/all-products`
                          ? "text-[#94d2bc] font-medium "
                          : "text-gray-600 after:w-0 "
                      }`}
                    >
                      All Categories
                    </h4>
                  </Link>

                  {data?.allCategories?.map((category, index) => (
                    <NavLink
                      key={index}
                      to={`/all-products/${category?.slug}`}
                      className={({ isActive }) =>
                        `relative inline-block cursor-pointer ${
                          isActive
                            ? "text-[#94d2bc] font-medium after:w-full" // Active: line visible
                            : "text-gray-600 after:w-0 hover:after:w-full" // Inactive: line on hover
                        }`
                      }
                    >
                      <h4
                        className={`relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#94d2bc] after:transition-all after:duration-300`}
                      >
                        {category?.name}
                      </h4>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            {/* Availability */}
            <div
              tabIndex={0}
              className={`collapse collapse-arrow min-h-full ${
                availableCollapseOpen ? "collapse-open" : "collapse-close"
              }`}
            >
              <div
                className="collapse-title text-lg font-medium"
                onClick={() => setAvailableCollapseOpen(!availableCollapseOpen)}
              >
                Availability
              </div>
              <div className="collapse-content">
                <div className="flex flex-col space-y-2">
                  <div>
                    <input
                      type="checkbox"
                      id="inStock"
                      name="inStock"
                      checked={inStock}
                      onChange={() => setInStock(!inStock)}
                    />
                    <label htmlFor="inStock">
                      {" "}
                      In Stock (
                      {data?.allItems?.products.length ||
                        (name && data?.singleCategory?.products.length)}
                      )
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="outOfStock"
                      name="outOfStock"
                      checked={outOfStock}
                      onChange={() => setOutOfStock(!outOfStock)}
                    />
                    <label htmlFor="outOfStock"> Out Of Stock</label>
                  </div>
                </div>
              </div>
            </div>
            {/* Price */}
            <div
              tabIndex={0}
              className={`collapse collapse-arrow min-h-full ${
                priceCollapseOpen ? "collapse-open" : "collapse-close"
              }`}
            >
              <div
                className="collapse-title text-lg font-medium"
                onClick={() => setPriceCollapseOpen(!priceCollapseOpen)}
              >
                Price
              </div>
              <div className="collapse-content">
                <input
                  type="range"
                  min={0}
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, e.target.value])}
                  className="range range-xs bg-[#94D2BC]"
                />
                <div className="flex items-center justify-between">
                  <div className="bg-[#94D2BC] px-3 py-2 text-black flex gap-3 rounded-md justify-between items-center">
                    <span>$</span>
                    <span>{priceRange[0]}</span>
                  </div>
                  <div className="bg-[#94D2BC] px-3 py-2 text-black flex gap-3 rounded-md justify-between items-center">
                    <span>$</span>
                    <span>{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}

        {paginatedItems?.length > 0 ? (
          <div className="lg:w-4/5 w-full">
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 border-none lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 mx-5">
              {paginatedItems?.map((data, index) => (
                <div
                  key={index}
                  className="  rounded-none w-80 lg:w-64 xl:w-64 2xl:w-72  border mx-auto border-[#94d2bc] "
                >
                  <Link>
                    <figure className="p-3 ">
                      <img
                        src={data?.images[0]}
                        alt="Shoes"
                        className="w-full h-56 object-contain rounded-md"
                      />
                    </figure>
                  </Link>
                  <div className=" px-5 mt-3 space-y-2 ">
                    <p className=" text-center font-bold ">{data?.title}</p>
                    <p className="text-sm line-clamp-3">{data?.description}</p>
                    <p className=" text-xl font-bold mt-3">
                      {data?.discountPercentage ? (
                        <>
                          <span className="line-through text-gray-500">
                            $ {data?.price}
                          </span>{" "}
                          {/* Original price */}
                          <span className="ml-2 text-red-600">
                            ${" "}
                            {(
                              data.price -
                              (data.price * data.discountPercentage) / 100
                            ).toFixed(2)}
                          </span>{" "}
                          {/* Discounted price */}
                        </>
                      ) : (
                        <span>$ {data?.price}</span> // No discount, show the original price
                      )}
                    </p>

                    <div className="flex items-center gap-2 text-orange-300">
                      <h1 className="text-xl font-bold">
                        Rating {data?.rating}
                      </h1>
                      <div className="rating rating-md">
                        <input
                          type="radio"
                          name="rating-5"
                          className="mask mask-star-2 bg-orange-300"
                        />
                      </div>
                    </div>

                    <div className="card-actions justify-center pb-3  ">
                      <Link
                        to={`/item-details/${data?.title
                          .replace(/\s+/g, "-")
                          .toLowerCase()}/${data?.id}`}
                        className="btn  btn-ghost rounded-sm bg-[#94d2bc] hover:bg-[#0c4657] hover:text-white text-[#0c4657] mt-5  w-full"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}

            <div className="flex justify-center items-center mt-16">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-4 bg-[#94d2bc] rounded-full text-white disabled:hidden"
              >
                <FaChevronLeft />
              </button>
              <span className="mx-4">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-4 bg-[#94d2bc] text-white rounded-full disabled:hidden"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full min-h-32">
            <h1 className="text-3xl text-center">There is no Product</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
