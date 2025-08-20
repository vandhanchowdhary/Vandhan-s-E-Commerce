import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const Topbar = () => {
  return (
    <div className="bg-accent1 text-white">
      <div className="container mx-auto flex justify-between items-center py-2 px-3">
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://github.com/vandhanchowdhary"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            <FaGithub className="h-5 w-5"></FaGithub>
          </a>
          <a
            href="mailto:vandhanchowdhary@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            <BiLogoGmail className="h-5 w-5"></BiLogoGmail>
          </a>
          <a
            href="https://www.linkedin.com/in/kavurivandhanmurali"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            <FaLinkedin className="h-5 w-5"></FaLinkedin>
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>We ship WorldWide - Fast and Realiable</span>
        </div>
        <div className="hidden text-sm md:block">
          <a href="tel:+918555867145" className="hover:text-gray-600">
            +91 8555867145
          </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar