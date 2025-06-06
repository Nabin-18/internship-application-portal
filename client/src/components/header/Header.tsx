import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [showItems, setShowItems] = useState(false);

  const toggleItems = () => {
    setShowItems((prev) => !prev);
  };

  return (
    <>
      {/* Desktop version */}
      <div className="hidden lg:flex justify-between items-center p-4 shadow-2xl rounded-2xl bg-white">
        <div>
          <Link to={"/"}>
            <img src="logo.png" alt="logo" className="h-16 w-16 rounded-full" />
          </Link>
        </div>
        <div>
          <Input
            type="text"
            placeholder="Search here..."
            className="w-96 h-10 rounded-2xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none px-4 text-sm placeholder-gray-400 shadow-sm transition-all"
          />
        </div>
        <div>
          <Link to="/auth/signup">
            <Button className="cursor-pointer">Sign up</Button>
          </Link>
          <Link to="/auth/login">
            <Button className="ml-2 cursor-pointer">Log in</Button>
          </Link>
        </div>
      </div>

      {/* Mobile version */}
      <div className="lg:hidden flex justify-between items-center p-4 shadow-2xl bg-white fixed top-0 left-0 right-0 z-50">
        <div>
          <img src="logo.png" alt="logo" className="h-16 w-16 rounded-full" />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Search here..."
            className="w-64 h-10 rounded-2xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none px-4 text-sm placeholder-gray-400 shadow-sm transition-all"
          />
        </div>
        <div>
          {showItems ? (
            <ImCross
              onClick={toggleItems}
              className="text-xl cursor-pointer text-red-500"
            />
          ) : (
            <GiHamburgerMenu
              onClick={toggleItems}
              className="text-2xl cursor-pointer text-green-600"
            />
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {showItems && (
        <div className="lg:hidden bg-white shadow-lg p-4 fixed top-[80px] left-0 right-0 z-40">
          <div className="flex gap-2 items-center justify-center">
            <Link to="/auth/signup">
              <Button className="cursor-pointer bg-green-500 font-bold w-full">
                Sign up
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button className="cursor-pointer bg-green-500 font-bold w-full">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
