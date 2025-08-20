import Hero from "../components/Layout/Hero"
import GenderCollectionSection from "../components/Products/GenderCollectionSection"
import NewArrivals from "../components/Products/NewArrivals"

const Home = () => {
  return (
    <div className="px-12">
        <Hero />
        <GenderCollectionSection />
        <NewArrivals />
    </div>
  )
}

export default Home