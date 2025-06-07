import myData from "@/assets/data";
import Card from "@/components/Card";


const Machinelearning = () => {
  return (
   <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <h1 className="font-semibold">Machine Learning </h1>
      <div className="flex flex-wrap items-center justify-center gap-4 w-full h-full p-4">
        {myData
          .filter((intern) => intern.category === "machinelearning")
          .map((intern, index) => {
            return (
              <Card
                key={index}
                name={intern.name}
                image={intern.image}
                description={intern.description}
                timePeriod={intern.timePeriod}
                company={intern.company}
                location={intern.location}
              />
            );
          })}
      </div>
    </div>
  )
}

export default Machinelearning