
import myData from "../Card/card"
import Card from "../Card/Card"

const AllData = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
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
              onDelete={() => {}}
              onUpdate={() => {}}
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  )
}

export default AllData