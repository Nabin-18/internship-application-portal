import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type CardFormData = {
  title: string;
  company: string;
  location: string;
  time: string;
  image: string | File;
  description: string;
};

type CardProps = {
  id: number;
  title: string;
  company: string;
  location: string;
  time: string;
  image: string;
  description: string;
  onUpdate: (updatedData: CardFormData) => void;
  onDelete: () => void;
};

const Card = ({
  title,
  company,
  location,
  time,
  image,
  description,
  onUpdate,
  onDelete,
}: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CardFormData>({
    title,
    company,
    location,
    time,
    image,
    description,
  });

  useEffect(() => {
    if (formData.image instanceof File) {
      const preview = URL.createObjectURL(formData.image);
      return () => URL.revokeObjectURL(preview);
    }
  }, [formData.image]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      onUpdate(formData);
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
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Company"
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
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Time Duration"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded"
          />
          {formData.image && (
            <img
              src={
                formData.image instanceof File
                  ? URL.createObjectURL(formData.image)
                  : `http://localhost:8000${formData.image}`
              }
              alt="Preview"
              className="w-full h-60 object-cover rounded mt-2"
            />
          )}

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
            src={`http://localhost:8000${image}`}
            alt={title}
            className="w-full h-60 object-cover rounded"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <p>
              <strong>Company:</strong> {company}
            </p>
            <p>
              <strong>Location:</strong> {location}
            </p>
            <p>
              <strong>Duration:</strong> {time}
            </p>
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
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Card;
