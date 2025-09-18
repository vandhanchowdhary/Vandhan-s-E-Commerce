import { useState } from "react";

const EditProducts = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/200?random=1",
      },
      {
        url: "https://picsum.photos/200?random=2",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>

        {/* description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Product Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>

        {/* price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            min={0}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>

        {/* count in stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            min={0}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>

        {/* sku */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>

        {/* sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (Comma-Separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>

        {/* colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (Comma-Separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="border border-gray-300 p-2 w-full rounded-md"
            required
          />
        </div>

        {/* image uploads */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Images</label>
          <input type="file" onChange={handleImageUpload} className="" />
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index} className="">
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>                                                                           
    </div>
  );
};

export default EditProducts;
