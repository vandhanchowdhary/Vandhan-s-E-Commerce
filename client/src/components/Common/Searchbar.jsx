import { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { FaRegCircleXmark } from "react-icons/fa6";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("search term: ", searchTerm);
    setIsOpen(false);
  }

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        // search form
        <form
          onSubmit={handleSearch}
          className="realtive flex items-center justify-center w-full"
        >
          <div className="relative w-3/4 md:w-1/2">
            {/* search input */}
            <input
              id="searchfield"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full text-black placeholder:text-gray-700 placeholder:text-sm"
            />
            {/* search icon */}
            <button
              type="submit"
              className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
            >
              <FcSearch className="w-5 h-5" />
            </button>
            {/* clear button */}
            {/* <button
              type="button"
              onClick={handleSearchToggle}
              className="absolute cursor-pointer right-8 top-1/2 transform -translate-y-1/2"
            >
              <FaRegCircleXmark className="h-5 w-5 text-gray-600 hover:text-red-500 " />
            </button> */}
          </div>
          {/* close button */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute cursor-pointer right-4 md:right-10 top-1/2 transform -translate-y-1/2"
          >
            <FaRegCircleXmark className="h-5 w-5 text-gray-600 hover:text-red-500 " />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle} className="cursor-pointer">
          <FcSearch className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
