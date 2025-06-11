interface InternDetailsProps {
  name: string;
  image?: string;
  company: string;
  location: string;
  timePeriod: string;
  description: string;
}


const InternDetails: React.FC<InternDetailsProps> = ({
  name,
  image,
  company,
  location,
  timePeriod,
  description,
}) => {
  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-md rounded-xl">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
        <p className="text-gray-600 mt-2">{company}</p>
        <p className="text-gray-500 italic">{location}</p>
        <span className="mt-2 inline-block bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
          {timePeriod}
        </span>
      </div>

      {image && (
        <div className="mb-6">
          <img
            src={image}
            // alt={name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        
      )}
      <div>
        <img src={image} alt="" />
      </div>

      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};

export default InternDetails;
