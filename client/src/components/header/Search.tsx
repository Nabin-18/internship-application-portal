import { useState } from "react";
import { Input } from "../ui/input";

// Import data and card component
import myData from "@/assets/data";


const Search = () => {
  const [search, setSearch] = useState("");

  const filteredData = myData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );
  console.log("Filtered Data:", filteredData);
  return (
    <>
      <div className="flex justify-center mt-4">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here..."
          className="w-96 h-10 rounded-2xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none px-4 text-sm placeholder-gray-400 shadow-sm transition-all"
        />
      </div>
    </>
  );
};

export default Search;
