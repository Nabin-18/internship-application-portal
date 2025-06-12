import { useLocation } from "react-router-dom";
import myData from "@/assets/data";
import Card from "../components/Card"; // Adjust path as needed

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchedData = () => {
  const query = useQuery().get("query") || "";
  const search = query.toLowerCase();

  const filteredData = myData.filter((item) =>
    item.name.toLowerCase().includes(search)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for: "{query}"
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4 w-full h-full p-4">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              image={item.image}
              description={item.description}
              timePeriod={item.timePeriod}
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
