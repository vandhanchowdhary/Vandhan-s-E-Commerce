import { BiLogoGmail } from "react-icons/bi";
import { FaGithub, FaLinkedin, FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t p-5 md:p-12">
      <div
        className="container mx-auto 
      grid gap-6 px-2 lg:px-0 
      grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
    "
      >
        {/* Newsletter (always span 2 cols) */}
        <div className="col-span-2">
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and best
            offers.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign up and get 10% off on your first order.
          </p>

          {/* newsletter form */}
          <form className="flex">
            <input
              type="email"
              id="newsletter_input"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            />
            <button
              type="submit"
              className="bg-black text-white px-2 py-1 md:px-6 md:py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 ">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-black">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 ">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-black">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us + Call Us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 ">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://github.com/vandhanchowdhary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-5 w-5 hover:text-black" />
            </a>
            <a
              href="mailto:vandhanchowdhary@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoGmail className="h-5 w-5 hover:text-black" />
            </a>
            <a
              href="https://www.linkedin.com/in/kavurivandhanmurali"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="h-5 w-5 hover:text-black" />
            </a>
          </div>
          <p className="text-gray-800 mb-2">Call Us</p>
          <p>
            <FaPhone className="inline-block mr-2" />
            +91 8555867145
          </p>
        </div>
      </div>

      {/* footer bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          &copy; 2025, Vandhan's E-Commerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
