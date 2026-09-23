import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

function Nav({ menuOpen }) {
  const [products] = useContext(ProductContext);

  let distinct_category =
    products && products.reduce((res, curr) => [...res, curr.category], []);

  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},
     ${(Math.random() * 255).toFixed()},
     ${(Math.random() * 255).toFixed()},
      .4)`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-[90] w-[45%] max-[380px]:w-[55%] h-full bg-zinc-100 pt-4 flex flex-col items-center transform transition-transform duration-700 ease-in-out ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      } min-[1000px]:relative min-[1000px]:w-[20%] min-[1000px]:translate-x-0`}
    >
      <Link
        className="text-white mt-6 min-[540px]:text-sm min-[540px]:mt-0 rounded-md text-center bg-[#4285F4] hover:bg-[#4285F4]/80 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 box-border border border-transparent font-medium leading-5 rounded-base text-xs px-2 py-1 inline-flex items-center dark:focus:ring-[#4285F4]/55"
        to="/create"
      >
        Add new Products
      </Link>

      <hr className="w-[90%] border-1 my-4 min-[540px]:my-3" />

      <h1 className="w-[90%] font-semibold min-[540px]:w-[80%]">
        Category Filter
      </h1>

      <ul className="mt-3 w-[80%] min-[540px]:w-[70%]">
        {distinct_category.map((c, i) => (
          <Link
            to={`/?category=${c}`}
            key={i}
            className="mb-2 flex items-center gap-1 text-xs"
          >
            <span
              style={{
                backgroundColor: color(),
              }}
              className="w-[10px] h-[10px] rounded-full bg-blue-200"
            ></span>

            {c}
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
