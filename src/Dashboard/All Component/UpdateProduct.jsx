/* eslint-disable no-unused-vars */
import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate()

  // Fetch product details
  const {
    isLoading: loadingProduct,
    error: productError,
    data: product,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => axiosPublic.get(`/products/${id}`).then((res) => res.data), // Fetch the product by ID
  });

  // Fetch categories
  const { isLoading: loadingCategories, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axiosPublic.get("/products/categories").then((res) => res.data), // Fetch categories
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const onSubmit = (data) => {
    axiosPublic
      .put(`/products/${id}`)
      .then((res) => {
   
        if (res.status === 200) {
          reset();
        
          toast.success("Product updated successfully");
          navigate("/dashboard/all-products")
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error updating product: " + error.message);
      });
  };




  // Populate the form with product details when data is fetched
  useEffect(() => {
    if (product) {
      reset(product);
      // If you need to handle the images array specifically
      if (product.images) {
        product.images.forEach((image) => appendImage(image)); // Append existing images
      }
    }
  }, [product, reset, appendImage]);

  if (loadingProduct || loadingCategories) return <div>Loading....</div>;
  if (productError)
    return <p>Error fetching product: {productError.message}</p>;

  return (
    <div className="mx-auto p-6 mt-1">
      <Toaster />
      <h2 className="text-2xl font-semibold mb-6">Update Product</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">Product Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter product title"
          />
          {errors.title && (
            <p className="text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-2 font-medium">Brand</label>
          <input
            {...register("brand")}
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter brand name"
          />
        </div>

        {/* Availability Status */}
        <div>
          <label className="block mb-2 font-medium">Availability Status</label>
          <select
            {...register("availabilityStatus", {
              required: "Availability status is required",
            })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
          >
            <option value="">Select Availability Status</option>
            <option value={"In Stock"}>In Stock</option>
            <option value={"Low Stock"}>Low Stock</option>
            <option value={"Out Of Stock"}>Out Of Stock</option>
          </select>
          {errors.availabilityStatus && (
            <p className="text-red-500 mt-1">
              {errors.availabilityStatus.message}
            </p>
          )}
        </div>

        {/* Dynamic Category Select */}
        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
          >
            <option value="">Select category</option>
            {categories?.map((category, idx) => (
              <option key={idx} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows="4"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Dimensions */}
        <div>
          <label className="block mb-2 font-medium">Dimensions (Width)</label>
          <input
            {...register("dimensions.width", { valueAsNumber: true })}
            type="number"
            step="0.01"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter width"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Dimensions (Height)</label>
          <input
            {...register("dimensions.height", { valueAsNumber: true })}
            type="number"
            step="0.01"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter height"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Dimensions (Depth)</label>
          <input
            {...register("dimensions.depth", { valueAsNumber: true })}
            type="number"
            step="0.01"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter depth"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Price</label>
          <input
            {...register("price", { required: "Price is required" })}
            type="number"
            step="0.01"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter product price"
          />
          {errors.price && (
            <p className="text-red-500 mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Discount Percentage */}
        <div>
          <label className="block mb-2 font-medium">Discount Percentage</label>
          <input
            {...register("discountPercentage", {
              required: "Discount percentage is required",
            })}
            type="number"
            step="0.01"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter discount percentage"
          />
          {errors.discountPercentage && (
            <p className="text-red-500 mt-1">
              {errors.discountPercentage.message}
            </p>
          )}
        </div>

        {/* Minimum Order Quantity */}
        <div>
          <label className="block mb-2 font-medium">
            Minimum Order Quantity
          </label>
          <input
            {...register("minimumOrderQuantity", {
              required: "Minimum order quantity is required",
            })}
            type="number"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter minimum order quantity"
          />
          {errors.minimumOrderQuantity && (
            <p className="text-red-500 mt-1">
              {errors.minimumOrderQuantity.message}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-2 font-medium">Stock</label>
          <input
            {...register("stock", {
              required: "Stock is required",
              valueAsNumber: true,
            })}
            type="number"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter stock quantity"
          />
          {errors.stock && (
            <p className="text-red-500 mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* Return Policy */}
        <div>
          <label className="block mb-2 font-medium">Return Policy</label>
          <textarea
            {...register("returnPolicy", {
              required: "Return policy is required",
            })}
            rows="3"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter return policy"
          />
          {errors.returnPolicy && (
            <p className="text-red-500 mt-1">{errors.returnPolicy.message}</p>
          )}
        </div>

        {/* Shipping Information */}
        <div>
          <label className="block mb-2 font-medium">Shipping Information</label>
          <textarea
            {...register("shippingInformation", {
              required: "Shipping information is required",
            })}
            rows="3"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter shipping information"
          />
          {errors.shippingInformation && (
            <p className="text-red-500 mt-1">
              {errors.shippingInformation.message}
            </p>
          )}
        </div>

        {/* SKU */}
        <div>
          <label className="block mb-2 font-medium">SKU</label>
          <input
            {...register("sku", { required: "SKU is required" })}
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter SKU"
          />
          {errors.SKU && (
            <p className="text-red-500 mt-1">{errors.SKU.message}</p>
          )}
        </div>

        {/* Warranty Information */}
        <div>
          <label className="block mb-2 font-medium">Warranty Information</label>
          <textarea
            {...register("warrantyInformation", {
              required: "Warranty information is required",
            })}
            rows="3"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter warranty information"
          />
          {errors.warrantyInformation && (
            <p className="text-red-500 mt-1">
              {errors.warrantyInformation.message}
            </p>
          )}
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-2 font-medium">Weight</label>
          <input
            {...register("weight", { required: "Weight is required" })}
            type="number"
            step="0.01"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter product weight"
          />
          {errors.weight && (
            <p className="text-red-500 mt-1">{errors.weight.message}</p>
          )}
        </div>

        {/* Images */}
        <div className="lg:col-span-2">
          <label className="block mb-2 font-medium">Images</label>
          {imageFields.map((item, index) => (
            <div key={item.id} className="flex gap-2 mb-2">
              <input
                {...register(`images.${index}`, {
                  required: "Image URL is required",
                })}
                type="text"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
                placeholder="Enter image URL"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="p-3 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendImage("")}
            className="p-2 bg-[#0C4657] text-white rounded-md mt-2"
          >
            Add Image
          </button>
          {errors.images && (
            <p className="text-red-500 mt-1">{errors.images.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full p-3 bg-[#0C4657] text-white rounded-md"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
