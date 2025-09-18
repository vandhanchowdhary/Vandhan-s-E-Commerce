import { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // simulate fetching orders

    setTimeout(() => {
      const mockOrders = [
        {
          _id: "1",
          createdAt: new Date(),
          shippingAddress: { city: "New Delhi", country: "India" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500?random=3",
            },
          ],
          totalPrice: 1000,
          isPaid: true,
        },
        {
          _id: "2",
          createdAt: new Date(),
          shippingAddress: { city: "Hyderabad", country: "India" },
          orderItems: [
            {
              name: "Product 2",
              image: "https://picsum.photos/500/500?random=2",
            },
          ],
          totalPrice: 2000,
          isPaid: true,
        },
        {
          _id: "3",
          createdAt: new Date(),
          shippingAddress: { city: "", country: "" },
          orderItems: [
            {
              name: "Product 3",
              image: "https://picsum.photos/500/500?random=3",
            },
          ],
          totalPrice: 1500,
          isPaid: false,
        },
      ];

      setOrders(mockOrders);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-0 sm:p-2">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-y-auto md:overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:border-r-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-2 sm:p-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-2 sm:p-4 font-medium text-gray-900 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                    {" | "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="p-2 sm:p-4 font-medium text-gray-900 whitespace-nowrap">
                    {order.shippingAddress.city != ""
                      ? `${order.shippingAddress.city}${", "}${
                          order.shippingAddress.country
                        }`
                      : "N/A"}
                  </td>
                  <td className="p-2 sm:p-4 font-medium text-gray-900 whitespace-nowrap">
                    {order.orderItems.length}
                  </td>
                  <td className="p-2 sm:p-4 font-medium text-gray-900 whitespace-nowrap">
                    Rs. {order.totalPrice}
                  </td>
                  <td className="p-2 sm:p-4 font-medium text-gray-900 whitespace-nowrap">
                    <span
                      className={`py-1 px-2 rounded-xl ${
                        order.isPaid
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-700"
                      } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  You have no orders to show.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
