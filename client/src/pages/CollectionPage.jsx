import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen((s) => !s);

  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleOutsideClick = (e) => {
      const isMobile = window.innerWidth < 1024; // Tailwind lg breakpoint
      if (!isMobile) return; // ignore on desktop

      if (
        sidebarRef.current?.contains(e.target) ||
        buttonRef.current?.contains(e.target)
      ) {
        return;
      }
      setIsSidebarOpen(false);
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isSidebarOpen]);

  // Reset sidebar state when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false); // sidebar is static on desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mock fetch products
  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: "1",
          name: "Product 1",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=11",
              altText: "Product 1",
            },
          ],
        },
        {
          _id: "2",
          name: "Product 2",
          price: 200,
          images: [
            {
              url: "https://picsum.photos/500/500?random=12",
              altText: "Product 2",
            },
          ],
        },
        {
          _id: "3",
          name: "Product 3",
          price: 110,
          images: [
            {
              url: "https://picsum.photos/500/500?random=13",
              altText: "Product 3",
            },
          ],
        },
        {
          _id: "4",
          name: "Product 4",
          price: 140,
          images: [
            {
              url: "https://picsum.photos/500/500?random=14",
              altText: "Product 4",
            },
          ],
        },
        {
          _id: "5",
          name: "Product 5",
          price: 100,
          images: [
            {
              url: "https://picsum.photos/500/500?random=15",
              altText: "Product 5",
            },
          ],
        },
        {
          _id: "6",
          name: "Product 6",
          price: 200,
          images: [
            {
              url: "https://picsum.photos/500/500?random=16",
              altText: "Product 6",
            },
          ],
        },
        {
          _id: "7",
          name: "Product 7",
          price: 110,
          images: [
            {
              url: "https://picsum.photos/500/500?random=17",
              altText: "Product 7",
            },
          ],
        },
        {
          _id: "8",
          name: "Product 8",
          price: 140,
          images: [
            {
              url: "https://picsum.photos/500/500?random=18",
              altText: "Product 8",
            },
          ],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* mobile filter button */}
      <button
        ref={buttonRef}
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center cursor-pointer"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      {/* main content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>

        {/* sort options */}
        <SortOptions />

        {/* product grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
