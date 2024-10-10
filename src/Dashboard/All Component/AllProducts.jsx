import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AllProducts = () => {
  const axiosPublic = UseAxiosPublic();

  const {
    isLoading,
    error,
    refetch,
    data: AllItem,
  } = useQuery({
    queryKey: ["AllItem"],
    queryFn: () =>
      axiosPublic.get("/products").then((res) => res.data.products),
  });

  if (isLoading) return <div>Loading..........</div>;

  const handleDelete = (id) => {
    axiosPublic
      .delete(`/products/${id}`)
      .then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success("Product deleted successfully");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error updating product: " + error.message);
      });
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <div>
        <Toaster />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {AllItem?.map((data, idx) => (
              <tr key={idx}>
                <td>{data?.id}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={data?.images[0]} alt="product image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data?.title}</div>
                      <div className="text-sm opacity-50">$ {data?.price}</div>
                    </div>
                  </div>
                </td>
                <td>{data?.stock}</td>

                <th>
                  <Link to={`/dashboard/update/${data?.id}`}>
                    <button className="btn btn-ghost btn-xs">Update</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(data?.id)}
                    className="btn btn-ghost btn-xs"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
