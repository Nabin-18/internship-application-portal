import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

interface Post {
  id: number;
  title: string;
  company: string;
  location: string;
  time: string;
  image: string;
  description: string;
}

const SearchResults = () => {
  const queryParam = useQuery().get("query") || "";
  const search = queryParam.toLowerCase();
  const [posts, setPosts] = useState<Post[]>([]);

  const getAllData = async () => {
    try {
      const res = await fetch("http://localhost:8000/admin/get-post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      setPosts(result.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  // Filter posts based on the query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search) ||
    post.company.toLowerCase().includes(search) ||
    post.location.toLowerCase().includes(search) ||
    post.description.toLowerCase().includes(search)
  );

  return (
    <div className="p-4">
      {search ? (
        <h2 className="text-xl font-semibold mb-4">
          Search Results for: "{queryParam}"
        </h2>
      ) : (
        <h2 className="text-xl font-semibold mb-4">All Internships</h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              company={post.company}
              location={post.location}
              time={post.time}
              image={post.image}
              description={post.description}
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
