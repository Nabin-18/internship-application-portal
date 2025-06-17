import { useLocation } from "react-router-dom";
import { usePostStore } from "@/store/postStore"; // adjust the import path as needed
import Card from "../components/Card";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchedData = () => {
  const query = useQuery().get("query") || "";
  const search = query.toLowerCase();

  const { posts } = usePostStore(); // ✅ get all posts from store

  const filteredData = posts.filter((item) =>
    item.title.toLowerCase().includes(search) || 
    item.description.toLowerCase().includes(search) || 
    item.company.toLowerCase().includes(search) || 
    item.location.toLowerCase().includes(search)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for: "{query}"
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4 w-full h-full p-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Card
              key={item.id}
              name={item.title}
              image={item.image}
              description={item.description}
              timePeriod={item.time}
              company={item.company}
              location={item.location}
            />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchedData;
