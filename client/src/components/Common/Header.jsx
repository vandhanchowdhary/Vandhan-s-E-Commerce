import Topbar from "../Layout/Topbar"
import Navbar from "./Navbar"

const Header = () => {
  return (
    <header className="border-b border-gray-200">
        {/* top bar */}
        <Topbar />
        {/* nav bar */}
        <Navbar />
        {/* cart drawer */}
    </header>
  )
}

export default Header