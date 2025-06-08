import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Search from "./Search";

const Header = () => {
  const [showItems, setShowItems] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleItems = () => setShowItems((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`hidden lg:flex justify-between items-center px-6 py-4 shadow-2xl rounded-2xl fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
          isScrolled ? "py-2 shadow-md bg-white/90 backdrop-blur-md" : "py-4"
        }`}
      >
        <Link to={"/"}>
          <img src="logo.png" alt="logo" className="h-12 w-12 rounded-full" />
        </Link>
        <Search />
        <div>
          <Link to="/auth/signup">
            <Button className="cursor-pointer">Sign up</Button>
          </Link>
          <Link to="/auth/login">
            <Button className="ml-2 cursor-pointer">Log in</Button>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`lg:hidden flex justify-between items-center px-4 py-4 fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? "py-2 shadow-md bg-white/90 backdrop-blur-md" : "py-4"
        }`}
      >
        <img src="logo.png" alt="logo" className="h-12 w-12 rounded-full" />
        <Input placeholder="Search here..." className="w-48 h-8 text-sm" />
        {showItems ? (
          <ImCross onClick={toggleItems} className="text-xl text-red-500" />
        ) : (
          <GiHamburgerMenu onClick={toggleItems} className="text-2xl text-green-600" />
        )}
      </div>

      {/* Mobile Dropdown */}
      {showItems && (
        <div className="lg:hidden fixed top-[70px] left-0 right-0 z-40 bg-white p-4 shadow">
          <div className="flex gap-2 justify-center">
            <Link to="/auth/signup">
              <Button className="w-full bg-green-500">Sign up</Button>
            </Link>
            <Link to="/auth/login">
              <Button className="w-full bg-green-500">Log in</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
