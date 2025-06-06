interface CardProps {
  name: string;
  image?: string;
  company: string;
  location: string;
  timePeriod: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ name, image, company, location, timePeriod, description }) => {
  return (
    <div className="flex flex-col w-[300px] h-fit bg-white shadow-lg rounded-2xl p-4 items-center gap-4 transition-transform hover:scale-105">
      
      {/* Image */}
      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-gray-400">Image</span>
        )}
      </div>

      {/* Title & Company Info */}
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl font-semibold text-gray-800 text-center">{name}</h2>
        <p className="text-sm text-gray-500 font-medium">{company}</p>
        <p className="text-xs text-gray-400 italic">{location}</p>
        <span className="text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full">{timePeriod}</span>
      </div>

      {/* Description */}
      <div className="text-sm text-gray-600 text-center ">
        {description}
      </div>
    </div>
  );
};

export default Card;
