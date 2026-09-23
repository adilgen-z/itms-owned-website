import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import toast from "react-hot-toast";

function Details() {
  const [products, setProducts] = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const productDeleteHandler = (id) => {
    const filteredProducts = products.filter((p) => p.id !== id);
    setProducts(filteredProducts);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    toast("Deleted Successfully", {
      icon: "🗑️",
    });
    navigate("/");
  };

  useEffect(() => {
    if (!product) {
      setProduct(products.filter((p) => p.id == id)[0]);
    }
  }, []);

  return product ? (
    <div className="w-full h-screen overflow-x-hidden overflow-y-auto min-[1000px]:overflow-y-hidden flex flex-col min-[700px]:flex-row items-center p-3 min-[700px]:gap-1 gap-3 m-auto relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-2 left-5 flex items-center justify-center gap-1 mt-1 rounded-md text-center outline-none text-black box-border border-2 hover:bg-zinc-100 border-zinc-600 leading-5 rounded-base text-sm font-semibold px-3 py-2"
      >
        <IoArrowBack className="text-md mt-[2px]" /> Go Back
      </button>

      <div className="w-full h-1/3 min-[700px]:h-1/2 min-[1000px]:h-[70%] min-[700px]:w-1/2 min-h-0 mt-20 min-[700px]:mt-0 shrink-0 flex justify-center">
        <img
          className="w-full h-full min-h-0 object-contain lg:mix-blend-multiply"
          src={product.image}
          alt=""
        />
      </div>

      <div className="content w-full h-1/2 min-[700px]:h-[50%] min-[700px]:w-1/2 min-[1000px]:h-[70%] min-[1000px]:w-1/3 min-[700px]:-mr-100 min-h-0 shrink-0 text-center">
        <h1 className="leading-none font-semibold text-center min-[700px]:text-lg min-[1000px]:text-xl min-[1000px]:mt-3">
          {product.title}
        </h1>

        <h3 className="mt-1 text-zinc-500 text-sm min-[1000px]:text-md">
          {product.category}
        </h3>

        <h2 className="mt-1 font-bold min-[1000px]:text-xl">
          ${product.price}
        </h2>

        <p className="leading-none my-3 text-xs text-center break-words w-[100%] min-[700px]:leading-[20px] min-[1000px]:mt-3 min-[1000px]:text-[1.5vw] min-[1000px]:leading-5">
          {product.description}
        </p>

        <div className="flex items-center justify-center gap-3 min-[1000px]:mt-5">
          <Link
            to={`/edit/${product.id}`}
            className="text-white mt-1 rounded-md text-center outline-none bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 box-border border border-transparent leading-4 rounded-base text-sm font-semibold px-4 py-2 inline-flex items-center"
          >
            Edit
          </Link>

          <button
            onClick={() => productDeleteHandler(product.id)}
            className="text-white mt-1 rounded-md text-center outline-none bg-[#EA4335] hover:bg-[#EA4335]/90 focus:ring-4 box-border border border-transparent leading-4 rounded-base text-sm font-semibold px-4 py-2 inline-flex items-center"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;
