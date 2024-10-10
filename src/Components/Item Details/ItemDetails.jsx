/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

const ItemDetails = () => {
  const { id } = useParams();
  const axiosPublic = UseAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const { isLoading, isError, refetch, error, data } = useQuery({
    queryKey: ["Item", "ItemRandom", id],
    queryFn: async () => {
      try {
        // Fetch data from both endpoints
        const itemResponse = await axiosPublic.get(`/products/${id}`);
        const itemRandomResponse = await axiosPublic.get(`/products`);

        // Check if the responses are successful
        if (itemResponse.status !== 200 || itemRandomResponse.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        // Return the fetched data
        return {
          Item: itemResponse.data,
          ItemRandom: itemRandomResponse.data.products.slice(0, 10),
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data");
      }
    },
  });

  console.log(data?.Item);

  const settingsMain = {
    asNavFor: nav2,
    ref: (slider) => setNav1(slider),
    arrows: false, // Disable default arrows
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    className: "w-full relative", // Add relative positioning
  };

  const settingsThumbs = {
    asNavFor: nav1,
    ref: (slider) => setNav2(slider),
    slidesToShow: data?.Item?.images.length,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    className: "w-full flex justify-center",
  };

  // Custom navigation handler functions
  const goToPrevSlide = () => {
    nav1.slickPrev();
  };

  const goToNextSlide = () => {
    nav1.slickNext();
  };

  return (
    <div>
      <div>
        <div className="container flex flex-col justify-between lg:flex-row lg:gap-20 mx-auto p-4 lg:mt-10">
          {/* Left section - Vertical Slider */}
          <div className="flex w-full flex-1  lg:w-1/2">
            <div className="w-1/4 hidden lg:block">
              <Slider
                {...settingsThumbs}
                className="mt-4 flex flex-col space-y-4"
              >
                {data?.Item?.images?.map((img, index) => (
                  <div key={index} className="px-2">
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="rounded-md mx-auto bg-[#94D2BC] w-20 h-20 cursor-pointer object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Center section - Main Image */}
            <div className="w-full lg:w-3/4 flex justify-center relative group   rounded-xl">
              {/* Added 'group' class for hover */}
              {data?.Item?.images?.length > 1 ? (
                <Slider {...settingsMain}>
                  {data?.Item.images.map((img, index) => (
                    <div key={index} className="flex justify-center">
                      <img
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className="rounded-lg w-full bg-[#94D2BC] lg:h-[600px] h-[400px] object-contain"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="flex justify-center">
                  <img
                    src={data?.Item?.images[0]} // Ensure to handle the case where images might be empty
                    alt="No image available"
                    className="rounded-lg w-full bg-[#94D2BC] h-auto object-cover"
                  />
                </div>
              )}

              {/* Render navigation buttons only if there are more than 1 images */}
              {data?.Item?.images?.length > 1 && (
                <>
                  <button
                    onClick={goToPrevSlide}
                    className="absolute left-0 btn btn-circle bg-[#94d2bc] text-white hover:bg-[#94d2bc] top-1/2 transform rounded-full p-2 z-10 group-hover:opacity-100 transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                  >
                    &#10094; {/* Left arrow symbol */}
                  </button>
                  <button
                    onClick={goToNextSlide}
                    className="absolute right-0 btn btn-circle bg-[#94d2bc] text-white hover:bg-[#94d2bc] top-1/2 transform rounded-full p-2 z-10 group-hover:opacity-100 transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                  >
                    &#10095; {/* Right arrow symbol */}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right section - Product Details */}
          <div className="w-full lg:w-1/2 flex-1 space-y-4 mt-10 lg:mt-0">
            <h1 className="text-2xl font-semibold">{data?.Item?.title}</h1>

            <p className="text-2xl text-gray-700">
              {/* Check if a discount is available */}
              {data?.Item?.discountPercentage ? (
                <>
                  <span className="line-through text-gray-500">
                    $ {data?.Item?.price}
                  </span>{" "}
                  {/* Original price */}
                  <span className="ml-2 text-red-600">
                    ${" "}
                    {(
                      data.Item.price -
                      (data.Item.price * data.Item.discountPercentage) / 100
                    ).toFixed(2)}
                  </span>{" "}
                  {/* Discounted price */}
                </>
              ) : (
                <span>$ {data?.Item?.price}</span> // No discount, show the original price
              )}
            </p>
            <div className="flex items-center gap-2 text-orange-300">
              <h1 className=" font-bold">Rating {data?.Item?.rating}</h1>
              <div className="rating rating-sm">
                <input
                  type="radio"
                  name="rating-5"
                  className="mask mask-star-2 bg-orange-300"
                />
              </div>
            </div>


            <h1 className=" font-semibold">In Stock <span className="text-2xl">{data?.Item?.stock}</span></h1>



            <div>
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="mt-2 text-sm text-gray-600">
                {data?.Item?.description}
              </p>
            </div>

            <button
              className="btn relative  w-full bg-[#94d2bc] text-white hover:bg-[#94d2bc]"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <span className="loading loading-spinner loading-md absolute"></span>
              ) : (
                "Add to cart"
              )}
            </button>

            <button className="bg-[#0c4657] text-white w-full py-3 rounded-md">
              Buy Now
            </button>
          </div>
        </div>


        <section className="my-12 px-4 bg-gray-50 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Customer Reviews
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1  gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.Item?.reviews.map((review,idx) => (
          <div
            key={idx}
            className="border border-gray-300 w-72 p-6 mx-auto rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {Array.from({ length: review.rating }, (_, index) => (
                  <svg
                    key={index}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 15.27L16.18 19l-1.64-7.03L20 8.24l-7.19-.61L10 .5 7.19 7.63 0 8.24l5.46 3.73L3.82 19z" />
                  </svg>
                ))}
                {Array.from({ length: 5 - review.rating }, (_, index) => (
                  <svg
                    key={index}
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 15.27L16.18 19l-1.64-7.03L20 8.24l-7.19-.61L10 .5 7.19 7.63 0 8.24l5.46 3.73L3.82 19z" />
                  </svg>
                ))}
              </div>
              <span className="ml-4  text-gray-700 font-semibold">{review.reviewerName}</span>
            </div>
            <p className="text-gray-600 text-sm italic mb-4">{review.comment}</p>
            <div className="flex justify-between text-gray-500 text-xs">
              <span>{new Date(review.date).toLocaleDateString()}</span>
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                  <path d="M10 7a3 3 0 100 6 3 3 0 000-6zm0 4a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
                <span>{review.location}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>


          {/* Specifications */}
{/* Specifications */}
<div className=" p-6 container mx-auto rounded-lg  mb-6">
  <h2 className="text-lg font-semibold mb-4 border-b-2 border-gray-300 pb-2">Specifications</h2>
  <ul className="space-y-4">
    <li className="flex items-center">
      <svg
        className="w-5 h-5 text-blue-600 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      <span><strong>SKU:</strong> {data?.Item?.sku}</span>
    </li>
    <li className="flex items-center">
      <svg
        className="w-5 h-5 text-blue-600 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m16 8l-4-4m0 0l-4-4m4 4l-4-4" />
      </svg>
      <span><strong>Weight:</strong> {data?.Item?.weight} lbs</span>
    </li>
    <li className="flex items-center">
      <svg
        className="w-5 h-5 text-blue-600 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h18M3 12h18M3 16h18" />
      </svg>
      <span><strong>Dimensions:</strong> {`${data?.Item?.dimensions.width} x ${data?.Item?.dimensions.height} x ${data?.Item?.dimensions.depth}`} cm</span>
    </li>
    <li className="flex items-center">
      <svg
        className="w-5 h-5 text-blue-600 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <span><strong>Category:</strong> {data?.Item?.category}</span>
    </li>
    <li className="flex items-center">
      <svg
        className="w-5 h-5 text-blue-600 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <span><strong>Tags:</strong> {data?.Item?.tags.join(", ")}</span>
    </li>
    <li className="flex items-center">
      <svg
        className="w-5 h-5 text-blue-600 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20m-6-6h12" />
      </svg>
      <span><strong>Minimum Order Quantity:</strong> {data?.Item?.minimumOrderQuantity}</span>
    </li>
    <li className="flex items-center">
      <svg
        className="w-5 h-5 text-blue-600 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
      </svg>
      <span><strong>Shipping Information:</strong> {data?.Item?.shippingInformation}</span>
    </li>
    <li className="flex items-center">
      <svg
        className="w-5 h-5 text-blue-600 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l2 2 4-4m4-2l-2 2-4 4m-2-2l2 2-4 4" />
      </svg>
      <span><strong>Return Policy:</strong> {data?.Item?.returnPolicy}</span>
    </li>
    <li className="flex items-center">
      <svg
        className="w-5 h-5 text-blue-600 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5v14l6-7-6-7z" />
      </svg>
      <span><strong>Warranty Information:</strong> {data?.Item?.warrantyInformation}</span>
    </li>
  </ul>
</div>




        <div className="mt-10 container mx-auto ">
          <h1 className="text-3xl font-bold p-5">You Might Also Like</h1>

          {data?.ItemRandom?.length > 0 ? (
            <div className="grid gap-3 grid-cols-1 md:grid-cols-3 border-none lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
              {data?.ItemRandom?.map((data, index) => (
                <div
                  key={index}
                  className="  rounded-none w-80 md:w-64 xl:w-64 2xl:w-72  border mx-auto border-[#94d2bc] "
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
          ) : (
            <h1 className="text-center text-red-500 text-2xl">
              Item Not Found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
