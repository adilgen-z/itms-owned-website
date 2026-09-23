import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import { IoArrowBack } from "react-icons/io5";
import { IoIosMenu, IoMdClose } from "react-icons/io";

function Home() {
  const [products] = useContext(ProductContext);
  const { search, pathname } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  const [filterProducts, setFilterProducts] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!filterProducts || category == "undefined") setFilterProducts(products);

    if (category != "undefined") {
      setFilterProducts(products.filter((e) => e.category == category));
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav menuOpen={menuOpen} />

      {/* MENU BUTTON */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-2 z-[100] w-8 h-8 min-[1000px]:hidden"
      >
        {/* Menu */}
        <IoIosMenu
          className={`absolute top-1/2 left-1/2 max-[325px]:top-4 max-[325px]:left-2 min-[540px]:top-5 -translate-x-1/2 -translate-y-1/2 text-2xl text-zinc-600 transition-all duration-700 ease-in-out ${
            menuOpen
              ? "opacity-0 rotate-90 scale-0 translate-x-25 min-[480px]:translate-x-0 min-[540px]:-translate-x-1 min-[540px]:-translate-y-5"
              : "opacity-100 rotate-0 scale-100 translate-x-0"
          }`}
        />

        {/* Cross */}
        <IoMdClose
          className={`absolute top-1/2 left-1/2 max-[325px]:top-4 max-[325px]:left-2 min-[540px]:top-5 -translate-x-1/2 -translate-y-1/2 text-2xl text-zinc-600 transition-all duration-700 ease-in-out ${
            menuOpen
              ? "opacity-100 rotate-0 scale-100 translate-x-25 min-[480px]:translate-x-0 min-[540px]:-translate-x-4 min-[540px]:-translate-y-5"
              : "opacity-0 -rotate-90 scale-0 translate-x-0"
          }`}
        />
      </button>

      {/* HOME CONTENT */}
      <div
        className={`card h-full w-full min-[1000px]:w-[80%] overflow-x-hidden scrollbar-none ${
          menuOpen ? "overflow-y-hidden" : "overflow-y-auto"
        }`}
      >
        {(pathname != "/" || search.length > 0) && (
          <div className="sticky top-0 z-50 w-full bg-white border-b-[1.5px] px-15 pt-4">
            <Link
              to="/"
              className="flex w-20 items-center justify-center mb-4 gap-2 rounded-md text-center outline-none text-black border-2 hover:bg-zinc-100 border-zinc-600 text-xs font-semibold px-3 py-2"
            >
              <IoArrowBack className="text-md mt-[2px]" />
              Home
            </Link>
          </div>
        )}

        <div className="py-5 flex gap-6 flex-wrap justify-center">
          {filterProducts?.length > 0 &&
            filterProducts.map((p, idx) => {
              return (
                <div class="w-60 h-70 border-zinc-200 border-2 rounded-3xl p-3 flex flex-col items-center justify-center gap-4 hover:shadow-[5px_5px_rgba(63,63,70,0.25),_10px_10px_rgba(63,63,70,0.2),_15px_15px_rgba(63,63,70,0.15),_20px_20px_rgba(63,63,70,0.1),_25px_25px_rgba(63,63,70,0.05)] transition-shadow duration-75 ease-in-out">
                  <div class="w-52 h-40 rounded-2xl overflow-hidden hover:scale-110 duration-200 ease-in-out">
                    <img
                      className="object-contain w-full h-full mix-blend-multiply"
                      src={p.image}
                      alt="img"
                    />
                  </div>

                  <div class="px-2">
                    <h1 class="font-extrabold text-md text-center">
                      {p.title}
                    </h1>
                  </div>

                  <Link
                    key={p.id}
                    to={`/details/${p.id}`}
                    className="text-white rounded-md text-center outline-none bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 box-border border border-transparent font-medium leading-5 rounded-base text-sm px-3 py-2 inline-flex items-center dark:focus:ring-[#4285F4]/30"
                  >
                    See More
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  ) : (
    <div className="mt-20 text-center">
      <h1 className="text-2xl font-bold">No products yet</h1>
      <p className="mt-2 text-zinc-500">
        Add a product to start building your collection.
      </p>
    </div>
  );
}

export default Home;
