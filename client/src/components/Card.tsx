import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

interface CardProps {
  name: string;
  image?: string;
  company: string;
  location: string;
  timePeriod: string;
  description: string;
}

const Card: React.FC<CardProps> = ({
  name,
  image,
  company,
  location,
  timePeriod,
  description,
}) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 130;

  const navigate = useNavigate();

  const toggleExpand = () => setExpanded(!expanded);

  const displayedText =
    description.length > maxLength && !expanded
      ? description.slice(0, maxLength) + "..."
      : description;

  const viewDetails = () => {
    const slug = slugify(name, { lower: true });
    navigate(`/view-details/${slug}`, {
      state: {
        name,
        image,
        company,
        location,
        timePeriod,
        description,
      },
    });
  };
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  return (
    <div className="flex flex-col cursor-pointer w-[300px] h-fit bg-white shadow-lg rounded-2xl p-4 items-center gap-4 transition-transform hover:scale-105">
      {/* Image */}
      <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        {image ? (
          <img
            src={`${BASE_URL}${image}`}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-400">Image</span>
        )}
      </div>

      {/* Title & Company Info */}
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          {name}
        </h2>
        <p className="text-sm text-gray-500 font-medium">{company}</p>
        <p className="text-xs text-gray-400 italic">{location}</p>
        <span className="text-xs text-white bg-blue-500 px-2 py-0.5 rounded-full">
          {timePeriod}
        </span>
      </div>

      {/* Description */}
      <div className="text-sm text-gray-600 text-left w-full">
        <p>{displayedText}</p>
        {description.length > maxLength && (
          <button
            onClick={toggleExpand}
            className="text-blue-600 underline text-xs mt-1"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </div>

      <Button onClick={viewDetails} className="cursor-pointer">
        View Details
      </Button>
    </div>
  );
};

export default Card;
