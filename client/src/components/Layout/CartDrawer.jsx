import { IoMdCloseCircleOutline } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* close button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdCloseCircleOutline className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* cart content with scroll enabled */}
      <div className="flex-grow p-2 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4"></h2>
        {/* cart content component */}
        <CartContents />
      </div>
      {/* checkout button fixed at bottom */}
      <div className="p-4 bg-white sticky bottom-0">
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 cursor-pointer transition "
        >
          Checkout
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shipping, taxes, and discounts are calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
