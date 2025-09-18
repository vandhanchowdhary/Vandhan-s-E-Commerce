import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import Searchbar from "./Searchbar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDraweropen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDraweropen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* left- logo */}
        <div className="flex flex-row items-center gap-2 ">
          <Link to="/" className="text-2xl font-medium">
            Kavuri's
          </Link>
          <span className="hidden md:block md:text-xs md:text-gray-400">
            E-Commerce
          </span>
        </div>
        {/* nav links */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/collections/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            top wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            bottom wear
          </Link>
        </div>
        {/* right icons */}
        <div className="flex items-center space-x-4">
          {/* admin button */}
          <Link to="/admin" className="block bg-black px-2 rounded text-sm text-white">Admin</Link>

          {/* profile */}
          <Link to="/profile" className="hover:text-black">
            <CgProfile className="h-6 w-6 hover:text-accent1" />
          </Link>
          {/* cart */}
          <button
            onClick={toggleCartDrawer}
            className="relative text-black cursor-pointer"
          >
            <FaCartShopping className="h-6 w-6 hover:text-accent1" />
            <span className="absolute -top-2 -right-2 bg-accent1 text-white text-xs rounded-full px-1 py-0.5">
              4
            </span>
          </button>
          {/* search icon */}
          <div className="overflow-hidden">
            <Searchbar />
          </div>
          {/* hamburger icon */}
          <button onClick={toggleNavDrawer} className="md:hidden">
            <GiHamburgerMenu className="h-5 w-5 hover:text-accent1" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDraweropen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdCloseCircle className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4"></h2>
          <nav className="space-y-4">
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
