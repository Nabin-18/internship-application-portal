import { useEffect, useState } from "react";
import Card from "../Card/Card";

interface Post {
  id: number;
  title: string;
  company: string;
  location: string;
  time: string;
  image: string;
  description: string;
}

export type CardFormData = {
  title: string;
  company: string;
  location: string;
  time: string;
  image: string | File;
  description: string;
};

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const res = await fetch("http://localhost:8000/admin/get-post");
      const result = await res.json();
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
        setPosts((prev) => prev.filter((post) => post.id !== id));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = async (id: number, updatedData: CardFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedData.title);
      formData.append("company", updatedData.company);
      formData.append("location", updatedData.location);
      formData.append("time", updatedData.time);
      formData.append("description", updatedData.description);

      if (updatedData.image instanceof File) {
        formData.append("image", updatedData.image);
      } else {
        formData.append("existingImagePath", updatedData.image); // optional
      }

      const res = await fetch(`http://localhost:8000/admin/update-post/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        const updatedPost = await res.json();
        setPosts((prev) =>
          prev.map((post) => (post.id === id ? updatedPost : post))
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
