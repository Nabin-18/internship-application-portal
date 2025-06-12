import { useState } from "react";
import { Button } from "../ui/button";

type CardProps = {
  title: string;
  companyName: string;
  location: string;
  timeDuration: string;
  image: string;
  description: string;
  index: number;
  onUpdate: (index: number, updatedData: CardFormData) => void;
  onDelete: (index: number) => void;
};

type CardFormData = {
  title: string;
  companyName: string;
  location: string;
  timeDuration: string;
  image: string;
  description: string;
};

const Card = ({
  title,
  companyName,
  location,
  timeDuration,
  image,
  description,
  index,
  onUpdate,
  onDelete,
}: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CardFormData>({
    title,
    companyName,
    location,
    timeDuration,
    image,
    description,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    if (isEditing) {
      onUpdate(index, formData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white gap-4 p-4 shadow-md border">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="font-bold text-xl text-center border p-2 rounded"
          />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Company Name"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Location"
          />
          <input
            type="text"
            name="timeDuration"
            value={formData.timeDuration}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Time Duration"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Description"
            rows={3}
          />
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold text-center">{title}</h1>
          <img
            src={image}
            alt={title}
            className="w-full h-60 object-cover rounded"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <p><strong>Company:</strong> {companyName}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Duration:</strong> {timeDuration}</p>
          </div>
          <p className="text-sm text-gray-800">{description}</p>
        </>
      )}

      <div className="flex gap-4 justify-end">
        <Button
          className="bg-green-500 hover:bg-green-600 cursor-pointer"
          onClick={handleEditClick}
        >
          {isEditing ? "Update" : "Edit"}
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600 cursor-pointer"
          onClick={() => onDelete(index)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Card;
