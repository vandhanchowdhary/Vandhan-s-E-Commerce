import { RiDeleteBin5Fill } from "react-icons/ri";

const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/100?random=1",
    },
    {
      productId: 2,
      name: "Shirt",
      size: "XL",
      color: "Blue",
      quantity: 2,
      price: 10,
      image: "https://picsum.photos/100?random=2",
    },
    {
      productId: 3,
      name: "Jeans",
      size: "L",
      color: "Green",
      quantity: 5,
      price: 5,
      image: "https://picsum.photos/100?random=3",
    },
    {
      productId: 4,
      name: "Shorts",
      size: "M",
      color: "Violet",
      quantity: 10,
      price: 15,
      image: "https://picsum.photos/100?random=4",
    },
  ];

  return (
    <div className="px-2">
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>$ {product.price.toLocaleString()}</p>
            <button>
              <RiDeleteBin5Fill className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
