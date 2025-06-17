import Card from "@/components/Card";
import { usePostStore } from "@/store/postStore"; 

const DataScience = () => {
  const { posts } = usePostStore();

  const filteredPosts = posts.filter(
    (intern) => intern.category.toLowerCase() === "datascience"
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <h1 className="font-semibold">Data Science Interns</h1>
      <div className="flex flex-wrap items-center justify-center gap-4 w-full h-full p-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((intern) => (
            <Card
              key={intern.id}
              name={intern.title}
              image={intern.image}
              description={intern.description}
              timePeriod={intern.time}
              company={intern.company}
              location={intern.location}
            />
          ))
        ) : (
          <p>No data science internships available.</p>
        )}
      </div>
    </div>
  );
};

export default DataScience;
