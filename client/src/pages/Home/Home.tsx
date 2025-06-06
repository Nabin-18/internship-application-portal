import Card from "@/components/Card";
import myData from "@/assets/data";

const Home = () => {
  return (
    <div className="flex w-full  bg-gray-100">
      <div className="w-[100%] flex flex-col justify-center ">
        <div className=" ">
          <h1 className="text-center mt-4 font-semibold">All availabe internship applications</h1>
        </div>
        <div className="flex flex-wrap  gap-6 justify-around p-4">
          {myData.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              image={item.image}
              company={item.company}
              location={item.location}
              timePeriod={item.timePeriod}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
