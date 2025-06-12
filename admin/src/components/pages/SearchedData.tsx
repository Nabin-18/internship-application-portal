import { useLocation } from "react-router-dom";
import myData from "../Card/card";
import Card from "../Card/Card";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get("query") || "";
  const search = query.toLowerCase();

  // Show filtered data if search query exists, else show all
  const displayedData = search
    ? myData.filter((item) => item.name.toLowerCase().includes(search))
    : myData;

  return (
    <div className="p-4">
      {search ? (
        <h2 className="text-xl font-semibold mb-4">
          Search Results for: "{query}"
        </h2>
      ) : (
        <h2 className="text-xl font-semibold mb-4">All Data</h2>
      )}

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedData.length > 0 ? (
          displayedData.map((item, index) => (
            <Card
              key={index}
              index={index}
              title={item.name}
              companyName={item.company}
              location={item.location}
              timeDuration={item.timePeriod}
              image={item.image}
              description={item.description}
              onDelete={() => {}}
              onUpdate={() => {}}
            />
          ))
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
