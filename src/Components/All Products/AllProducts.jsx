import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const AllProducts = () => {
  const axiosPublic = UseAxiosPublic();

  const {
    isLoading,
    error,
    data: AllItem,
  } = useQuery({
    queryKey: ["AllItem"],
    queryFn: () =>
      axiosPublic
        .get("/products")
        .then((res) => res.data.products.slice(0, 12)), // Limit the result to 12 items
  });

  if (isLoading) return <div>Loading.......</div>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1 className="text-4xl font-semibold text-center my-10">All Product</h1>

      {AllItem.length > 0 ? (
        <>
          <div className="container gap-3 px-2 mx-auto grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {AllItem.map((data, index) => (
              <div
                key={index}
                className="  rounded-none w-96 md:w-80 lg:w-64 xl:w-64 2xl:w-72  border mx-auto border-[#94d2bc] "
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
                    <h1 className="text-xl font-bold">Rating {data?.rating}</h1>
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

          <div className="text-center mt-5">
           <Link to={"/all-products"}>
           <button className="py-2 px-4 bg-[#94D2BC] rounded-lg font-bold">
              See More
            </button>
           </Link>
          </div>
        </>
      ) : (
        <h1 className="text-center text-red-500 text-2xl">Item Not Found</h1>
      )}
    </div>
  );
};

export default AllProducts;
