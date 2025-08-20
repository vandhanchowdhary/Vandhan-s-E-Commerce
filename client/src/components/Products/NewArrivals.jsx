import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Stylish Shirt",
      price: 100,
      images: [
        {
          url: "https://picsum.photos/500/500?random=2",
          altText: "Stylish Shirt",
        },
      ],
    },
    {
      _id: "3",
      name: "Posh Pants",
      price: 200,
      images: [
        {
          url: "https://picsum.photos/500/500?random=3",
          altText: "Posh Pants",
        },
      ],
    },
    {
      _id: "4",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=4",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "5",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=5",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "6",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=6",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "7",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=7",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "8",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=8",
          altText: "Stylish Jacket",
        },
      ],
    },
  ];

  // Mouse Drag Events
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startXRef.current;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Scroll Buttons
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -400 : 400;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(leftScroll < maxScrollLeft - 1); // allowing 1px tolerance
    }
  };  

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  return (
    <section className="py-10">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles, freshly added to keep your wardrobe on the
          cutting edge of fashion.
        </p>

        {/* Scroll buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border border-gray-500 transition ${
              canScrollLeft
                ? "bg-white text-black hover:text-white hover:bg-black cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border border-gray-500 transition ${
              canScrollRight
                ? "bg-white text-black hover:text-white hover:bg-black cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="container mx-auto overflow-x-scroll flex space-x-6 relative scrollbar-hide"
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[80%] sm:min-w-[50%] md:min-w-[40%] lg:min-w-[30%] relative"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[400px] object-cover rounded-lg select-none"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-black/40 text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-semibold">{product.name}</h4>
                <p className="mt-1">Rs. {product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;