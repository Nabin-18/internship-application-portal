import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Button } from "../ui/button";
import Search from "./Search";
import { useAuthStore } from "../../store/authStore";
import { getInitials } from "../../utils/stringutils";

const listItems = [
  { id: 1, name: "Web Development", path: "/web-development" },
  { id: 2, name: "Data Science", path: "/data-science" },
  { id: 3, name: "Machine Learning", path: "/machine-learning" },
  { id: 4, name: "Mobile Development", path: "/mobile-development" },
  { id: 5, name: "Game Development", path: "/game-development" },
];

const Header = () => {
  const [showItems, setShowItems] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleItems = () => setShowItems((prev) => !prev);

  const handleClick = (path: string) => {
    setShowItems(false);
    navigate(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { isLoggedIn, logout, user } = useAuthStore();

  return (
    <>
      {/* Desktop Header */}
      <div
        className={`hidden lg:flex justify-between items-center px-6 py-4 shadow-2xl rounded-2xl fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
          isScrolled ? "py-2 shadow-md bg-white/90 backdrop-blur-md" : "py-4"
        }`}
      >
        <Link to={"/"}>
          <img src="logo.png" alt="logo" className="h-12 w-12 rounded-full" />
        </Link>
        <Search />
        <div className="flex items-center space-x-4">
          {isLoggedIn && user ? (
            <>
              {/* Avatar or Initials */}
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div
                  title={user.name}
                  className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center font-semibold uppercase"
                >
                  {getInitials(user.name)}
                </div>
              )}
              <span className="font-medium">{user.name}</span>
              <Button 
              className="cursor-pointer"
              onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/auth/signup">
                <Button className="cursor-pointer">Sign up</Button>
              </Link>
              <Link to="/auth/login">
                <Button className="ml-2 cursor-pointer">Log in</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div
        className={`lg:hidden flex justify-between items-center px-4 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-2 shadow-md bg-white/90 backdrop-blur-md" : "py-4"
        }`}
      >
        <Link to={"/"}>
          <img src="logo.png" alt="logo" className="h-12 w-12 rounded-full" />
        </Link>
        <Search />
        {showItems ? (
          <ImCross
            onClick={toggleItems}
            className="text-xl text-red-500 cursor-pointer"
          />
        ) : (
          <GiHamburgerMenu
            onClick={toggleItems}
            className="text-2xl cursor-pointer"
          />
        )}
      </div>

      {/* Mobile Dropdown */}
      {showItems && (
        <div className="lg:hidden fixed top-[70px] left-0 right-0 z-40 p-4 shadow bg-white h-fit">
          <div className="w-full">
            <h1 className="font-semibold mt-5 px-3">Choose your field</h1>
            <ul className="list-disc flex flex-col divide-y mt-5">
              {listItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleClick(item.path)}
                  className="w-full text-gray-600 hover:text-black text-sm transition-all cursor-pointer list-none p-3 hover:bg-gray-200"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
