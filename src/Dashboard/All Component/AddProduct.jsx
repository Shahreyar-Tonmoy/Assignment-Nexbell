/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';

const AddProduct = () => {

    const axiosPublic = UseAxiosPublic()

    const {
    isLoading,
    error,
    data: Category,
  } = useQuery({
    queryKey: ["Category"],
    queryFn: () =>
      axiosPublic.get("/products/categories").then((res) => res.data),
  });




  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { fields: imageFields, append: appendImage } = useFieldArray({
    control,
    name: "images"
  });

  const { fields: tagFields, append: appendTag } = useFieldArray({
    control,
    name: "tags"
  });

  const onSubmit = (data) => {
    console.log('Product Data:', data);
    // Handle product submission here
  };



  if (isLoading) return (
    <div>
     Loading.......
    </div>
  )

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className=" mx-auto p-6  mt-1 ">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">Product Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter product title"
          />
          {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-2 font-medium">Brand</label>
          <input
            {...register("brand", { required: "Brand is required" })}
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter brand name"
          />
          {errors.brand && <p className="text-red-500 mt-1">{errors.brand.message}</p>}
        </div>

        {/* Availability Status */}
        <div>
          <label className="block mb-2 font-medium">Availability Status</label>


          <select
             {...register("availabilityStatus", { required: "Availability status is required" })}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
        >
          <option value="">Select Availability Status</option>
          
            <option  value={"In Stock"}>
              In Stock
            </option>
            <option  value={" Out Of Stock"}>
              Out Of Stock
            </option>
       
        </select>



          {errors.availabilityStatus && <p className="text-red-500 mt-1">{errors.availabilityStatus.message}</p>}
        </div>

      {/* Dynamic Category Select */}
      <div>
        <label className="block mb-2 font-medium">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
        >
          <option value="">Select category</option>
          {Category?.map((category,idx) => (
            <option key={idx} value={category.name}>
              {category?.name}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 mt-1">{errors.category.message}</p>}
      </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows="4"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter product description"
          />
          {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        {/* Dimensions */}
        <div>
          <label className="block mb-2 font-medium">Dimensions (Width)</label>
          <input
            {...register("dimensions.width", { valueAsNumber: true })}
            type="number"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter width"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Dimensions (Height)</label>
          <input
            {...register("dimensions.height", { valueAsNumber: true })}
            type="number"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter height"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Dimensions (Depth)</label>
          <input
            {...register("dimensions.depth", { valueAsNumber: true })}
            type="number"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter depth"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Price</label>
          <input
            {...register("price", { required: "Price is required", valueAsNumber: true })}
            type="number"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter price"
          />
          {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
        </div>

        {/* Discount Percentage */}
        <div>
          <label className="block mb-2 font-medium">Discount Percentage</label>
          <input
            {...register("discountPercentage", { valueAsNumber: true })}
            type="number"
            step="0.1"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter discount percentage"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-2 font-medium">Stock</label>
          <input
            {...register("stock", { required: "Stock is required", valueAsNumber: true })}
            type="number"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter stock quantity"
          />
          {errors.stock && <p className="text-red-500 mt-1">{errors.stock.message}</p>}
        </div>

        {/* Minimum Order Quantity */}
        <div>
          <label className="block mb-2 font-medium">Minimum Order Quantity</label>
          <input
            {...register("minimumOrderQuantity", { required: "Minimum order quantity is required", valueAsNumber: true })}
            type="number"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter minimum order quantity"
          />
          {errors.minimumOrderQuantity && <p className="text-red-500 mt-1">{errors.minimumOrderQuantity.message}</p>}
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
          {errors.sku && <p className="text-red-500 mt-1">{errors.sku.message}</p>}
        </div>

        {/* Warranty Information */}
        <div>
          <label className="block mb-2 font-medium">Warranty Information</label>
          <input
            {...register("warrantyInformation", { required: "Warranty information is required" })}
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter warranty information"
          />
          {errors.warrantyInformation && <p className="text-red-500 mt-1">{errors.warrantyInformation.message}</p>}
        </div>

        {/* Meta: Barcode */}
        <div>
          <label className="block mb-2 font-medium">Barcode</label>
          <input
            {...register("meta.barcode")}
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter barcode"
          />
        </div>

        {/* Meta: Created At */}
        <div>
          <label className="block mb-2 font-medium">Created At</label>
          <input
            {...register("meta.createdAt")}
            type="datetime-local"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
          />
        </div>

        {/* Meta: QR Code */}
        <div>
          <label className="block mb-2 font-medium">QR Code URL</label>
          <input
            {...register("meta.qrCode")}
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter QR code URL"
          />
        </div>


                {/* Return Policy */}
                <div>
          <label className="block mb-2 font-medium">Return Policy</label>
          <input
            {...register("returnPolicy", { required: "Return Policy is required"})}
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter Return Policy"
          />
          {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
        </div>

                {/* Image URL */}
                <div>
          <label className="block mb-2 font-medium">Image URL</label>
          <input
            {...register("imageURL", { required: "Image URL is required" })}
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0C4657]"
            placeholder="Enter Image URL"
          />
          {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
        </div>



        {/* Submit Button */}
        <div className="lg:col-span-2">
          <button type="submit" className="w-full p-3 bg-[#0C4657] text-white rounded-md hover:bg-[#0C4657] transition">
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};





export default AddProduct