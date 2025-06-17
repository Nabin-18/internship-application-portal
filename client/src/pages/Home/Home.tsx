import Card from "@/components/Card";
import { usePostStore } from "@/store/postStore";
import { useEffect } from "react";



const Home = () => {
const { posts, fetchPosts } = usePostStore();

 useEffect(() => {
  fetchPosts();
}, [fetchPosts]);



  return (
    <div className="flex w-full  bg-gray-100">
      <div className="w-[100%] flex flex-col justify-center ">
        <div className=" ">
          <h1 className="text-center mt-4 font-semibold">
            All availabe internship applications
          </h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {posts.map((item) => (
            <div
              className="h-full w-full flex items-center justify-center"
              key={item.id}
            >
              <Card
                key={item.id}
                name={item.title}
                image={item.image}
                company={item.company}
                location={item.location}
                timePeriod={item.time}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
