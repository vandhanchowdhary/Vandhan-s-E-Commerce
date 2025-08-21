import Hero from "../components/Layout/Hero"
import FeaturedCollection from "../components/Products/FeaturedCollection"
import FeaturesSection from "../components/Products/FeaturesSection"
import GenderCollectionSection from "../components/Products/GenderCollectionSection"
import NewArrivals from "../components/Products/NewArrivals"
import ProductDetails from "../components/Products/ProductDetails"
import ProductGrid from "../components/Products/ProductGrid"

const placeholderProducts = [
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
        altText: "Product 3 ",
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

const Home = () => {
  return (
    <div className="px-12">
        <Hero />
        <GenderCollectionSection />
        <NewArrivals />

        {/* best seller section */}
        <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
        <ProductDetails />

        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-bold mb-4">Top Wears for Women</h2>
          <ProductGrid products={placeholderProducts} />
        </div>

        <FeaturedCollection />
        <FeaturesSection />
    </div>
  )
}

export default Home