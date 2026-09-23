import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import { toast } from "react-hot-toast";

function Edit() {
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    image: "",
    description: "",
    category: "",
    price: "",
  });

  const changeHandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id == id);
    setProduct(foundProduct);
  }, [products, id]);

  useEffect(() => {
    console.log(product);
  }, [product]);

  const dropdownRef = useRef(null);

  const editProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 3 ||
      product.image.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each field must have atleast 4 characters.");
      return;
    }

    if (!product.category) {
      alert("Please select a category");
      return;
    }

    const updatedProducts = products.map((p) => (p.id == id ? product : p));

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Product edited successfully!");
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const categories = [
    "Men's clothing",
    "Women's clothing",
    "Electronics",
    "Jewelery",
    "Books",
  ];

  return (
    <div className="w-full p-4 min-[800px]:p-5 h-screen flex items-center justify-center overflow-hidden relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-2 left-6 flex items-center justify-center gap-1 translate-x-[-10%] mt-1 rounded-md text-center outline-none text-black box-border border-2 hover:bg-zinc-100 border-zinc-600 leading-5 rounded-base text-sm font-semibold px-3 py-2"
      >
        <IoArrowBack className="text-md mt-[2px]" /> Go Back
      </button>

      <form
        onSubmit={editProductHandler}
        action=""
        className="min-[700px]:py-3 min-[700px]:px-4 p-4 flex flex-col rounded w-full min-[700px]:w-[65%] min-[700px]:min-h-[80%] min-[1000px]:w-[40%] min-[800px]:w-[65%] min-[800px]:gap-3 gap-2 bg-zinc-200"
      >
        <h1 className="font-semibold min-[700px]:mb-3 mb-1 min-[700px]:text-lg border-b-2 caret-transparent w-35 min-[700px]:w-38">
          Edit Product :
        </h1>

        <input
          required
          className="bg-white px-3 py-1 min-[700px]:text-lg text-md outline-none rounded"
          type="text"
          placeholder="Title"
          name="title"
          onChange={changeHandler}
          value={product && product.title}
        />

        <input
          required
          className="bg-white px-3 py-1 min-[700px]:text-lg text-md outline-none rounded"
          type="url"
          placeholder="image URL"
          name="image"
          onChange={changeHandler}
          value={product && product.image}
        />

        <div className="flex gap-2 w-full">
          {/* //dropdown is here */}
          <div
            ref={dropdownRef}
            className="relative caret-transparent w-[60%] min-[700px]:w-1/2"
          >
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="w-full h-10 bg-white md:text-sm min-[700px]:text-[2.5vw] min-[800px]:text-sm text-sm max-[385px]:text-xs font-semibold rounded px-3 min-[300px]:px-2 flex items-center justify-between"
            >
              <span>{product.category || "Select Category"}</span>

              <IoIosArrowDropdown
                className={`min-[700px]:text-lg min-[300px]:text-md min-[800px]:text-sm text-md transition-transform ease-in-out ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute top-11 left-0 w-full max-h-40 overflow-y-auto bg-white rounded shadow-lg z-50">
                {categories.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setProduct({
                        ...product,
                        category: item,
                      });
                      setOpen(false);
                    }}
                    className="px-3 py-2 hover:bg-zinc-200 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            required="add a price"
            className="bg-white min-[700px]:w-1/2 w-[40%] max-[385px]:text-md px-3 py-1 text-md outline-none rounded"
            type="number"
            placeholder="₹ price"
            name="price"
            onChange={changeHandler}
            value={product && product.price}
          />
        </div>

        <textarea
          required
          className="bg-white px-3 py-2 text-md outline-none rounded resize-none"
          placeholder="Enter product Description here..."
          rows="4"
          name="description"
          onChange={changeHandler}
          value={product && product.description}
        ></textarea>

        <input
          required
          className="text-white self-center min-[300px]:w-[60%] min-[800px]:w-[50%] min-[1000px]:w-[40%] rounded-md min-[700px]:mt-1 text-center w-1/4 max-[385px]:w-1/2 min-[700px]:w-1/3 outline-none bg-[#4285F4] hover:bg-[#4285F4]/90 box-border border border-transparent font-medium text-sm px-3 py-2 inline-flex items-center"
          type="submit"
          value="Save Changes"
        />
      </form>
    </div>
  );
}

export default Edit;