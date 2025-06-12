import { useState } from "react";
import Card from "../Card/Card";
import myData from "../Card/card"; 

const Dashboard = () => {
  const [posts, setPosts] = useState(myData);

  const handleDelete = (index: number) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  };

  const handleUpdate = (index: number, updatedData: any) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = updatedData;
    setPosts(updatedPosts);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {myData.length > 0 ? (
        myData.map((data, index) => (
          <Card
            key={index}
            index={index}
            title={data.name}
            companyName={data.company}
            location={data.location}
            timeDuration={data.timePeriod}
            image={data.image}
            description={data.description}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Dashboard;
