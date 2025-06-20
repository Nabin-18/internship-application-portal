import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigateToSearch();
    }
  };

  const handleSearchClick = () => {
    if (search.trim() !== "") {
      navigateToSearch();
    }
  };

  const navigateToSearch = () => {
    navigate(`/search?query=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="flex w-full  justify-center mt-4">
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search here..."
        className="w-fit h-10  rounded-r-none border-red-300 focus-visible:!ring-0 px-4 text-sm placeholder-gray-400 shadow-sm transition-all lg:w-96 "
      />
      <Button
        className="h-10 outline-none rounded-l-none  cursor-pointer  bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        onClick={handleSearchClick}
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
