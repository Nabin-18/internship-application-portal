import { useParams } from "react-router-dom";
import slugify from "slugify";
import myData from "@/assets/data";
import InternDetails from "@/components/InternDetails";

const Details = () => {
  const { title } = useParams();

  const matchedIntern = myData.find(
    (intern) => slugify(intern.name, { lower: true }) === title
  );

  if (!matchedIntern) {
    return <p className="text-red-500 text-center p-6">Internship not found.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <div className="flex-1">
        <InternDetails {...matchedIntern} />
      </div>
      <div className="w-full md:w-1/3 bg-green-500 text-white p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Submission Process</h2>
        <p>Instructions or form goes here...</p>
      </div>
    </div>
  );
};

export default Details;
