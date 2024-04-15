import Link from "next/link";
import { NextPage } from "next";

const Navbar: NextPage = () => {
  return (
    <nav
      className="flex flex-wrap items-center justify-between p-4"
      style={{
        backgroundColor: "#1a202c",
      }}
    >
      <div className="flex items-center flex-shrink-0 text-white">
        <span className="font-semibold tracking-tight text-md">
          Dy-tech Manage
        </span>
      </div>
      <div className="flex">
        <Link
          href="/shop-manage"
          className="inline-block px-3 py-2 mt-4 mr-4 text-sm leading-none text-white rounded hover:border-transparent hover:text-black hover:bg-white lg:mt-0"
        >
          Shop
        </Link>
        <Link
          href="/user-manage"
          className="inline-block px-3 py-2 mt-4 mr-4 text-sm leading-none text-white rounded hover:border-transparent hover:text-black hover:bg-white lg:mt-0"
        >
          User
        </Link>

        <Link
          href="/login"
          className="inline-block px-4 py-2 mt-4 ml-4 text-sm leading-none text-white border border-white rounded hover:border-transparent hover:text-black hover:bg-white lg:mt-0"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
