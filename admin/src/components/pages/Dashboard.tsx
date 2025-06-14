import { useEffect, useState } from "react";
import Card from "../Card/Card";

// Post structure from backend
interface Post {
  id: number;
  title: string;
  company: string;
  location: string;
  time: string;
  image: string;
  description: string;
}

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllData();
  }, []);

const getAllData = async () => {
  try {
    const res = await fetch("http://localhost:8000/admin/get-post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await res.json();
    console.log("Fetched posts:", result.data); 

    setPosts(result.data); 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/admin/delete-post/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts(prev => prev.filter(post => post.id !== id));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = async (id: number, updatedData: Omit<Post, "id">) => {
    try {
      const res = await fetch(`http://localhost:8000/admin/update-post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        const updatedPost = await res.json();
        setPosts(prev =>
          prev.map(post => (post.id === id ? updatedPost : post))
        );
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card
            key={post.id}
            id={post.id}
            title={post.title}
            company={post.company}
            location={post.location}
            time={post.time}
            image={post.image}
            description={post.description}
            onDelete={() => handleDelete(post.id)}
            onUpdate={(updatedData) => handleUpdate(post.id, updatedData)}
          />
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Dashboard;
