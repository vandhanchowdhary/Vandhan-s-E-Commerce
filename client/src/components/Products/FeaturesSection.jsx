import { GiShoppingBag } from "react-icons/gi";
import { TbTruckReturn } from "react-icons/tb";
import { GrSecure } from "react-icons/gr";

const FeaturesSection = () => {
  return (
    <section className="py-12 px-2 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* feature 1 */}
        <div className="flex flex-col items-center bg-blue-50 py-4 rounded-3xl">
          <div className="p-2 rounded-full mb-4">
            <GiShoppingBag className="text-4xl" />
          </div>
          <h4 className="tracking-tighter mb-2">FREE INTERNATIONAL SHIPPING</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            On all orders above Rs. 999.00
          </p>
        </div>

        {/* feature 2 */}
        <div className="flex flex-col items-center bg-blue-50 py-4 rounded-3xl">
          <div className="p-2 rounded-full mb-4">
            <TbTruckReturn className="text-4xl" />
          </div>
          <h4 className="tracking-tighter mb-2">45 DAYS RETURN</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Money back guarantee.
          </p>
        </div>

        {/* feature 3 */}
        <div className="flex flex-col items-center bg-blue-50 py-4 rounded-3xl">
          <div className="p-2 rounded-full mb-4">
            <GrSecure className="text-4xl" />
          </div>
          <h4 className="tracking-tighter mb-2">SECURE CHECKOUT</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            100% secure and encrypted payment process.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection