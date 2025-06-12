import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  time: z.string().min(1, "Time duration is required"),
  image: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Image is required"),
  description: z.string().min(1, "Description is required"),
});

type PostFormData = z.infer<typeof postSchema>;

const UploadPost = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const imageFileList = watch("image");

  // Update preview when image changes
  if (imageFileList && imageFileList.length > 0 && !imagePreview) {
    const file = imageFileList[0];
    setImagePreview(URL.createObjectURL(file));
  }

  const onSubmit = (data: PostFormData) => {
    const image = data.image[0];
    const payload = { ...data, image };
    console.log(payload);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Create a Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Intern Title</label>
          <input
            type="text"
            {...register("title")}
            className="w-full border rounded-md p-2"
            placeholder="e.g. Frontend Developer Intern"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            {...register("company")}
            className="w-full border rounded-md p-2"
            placeholder="e.g. Google"
          />
          {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            {...register("location")}
            className="w-full border rounded-md p-2"
            placeholder="e.g. Bengaluru, Remote"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Time */}
        <div>
          <label className="block mb-1 font-medium">Time Duration</label>
          <input
            type="text"
            {...register("time")}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 3 months"
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="w-full border rounded-md p-2"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-64 object-cover rounded-md shadow"
            />
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border rounded-md p-2"
            rows={4}
            placeholder="Write a brief description of the internship..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default UploadPost;
