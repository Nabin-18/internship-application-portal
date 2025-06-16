import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// Zod schema for validation including file check
const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  time: z.string().min(1, "Time duration is required"),
  image: z
    .any()
    .refine((files) => files && files.length === 1, "Image file is required"),
  description: z.string().min(1, "Description is required"),
});

type PostFormData = z.infer<typeof postSchema>;

const UploadPost = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const imageFileList = watch("image");

  // Update preview when image changes
  useEffect(() => {
    if (imageFileList && imageFileList.length > 0) {
      const file = imageFileList[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl); // Cleanup
    } else {
      setImagePreview(null);
    }
  }, [imageFileList]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue("image", files);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    const file = data.image[0];
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("company", data.company);
    formData.append("location", data.location);
    formData.append("time", data.time);
    formData.append("description", data.description);
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:8000/admin/create-post", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Upload failed");
      }

      toast.success("Post submitted successfully!");
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      toast.error("Error submitting post");
    }
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
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register("category")}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select Category</option>
            <option value="webdevelopment">Web Development</option>
            <option value="datascience">Data Science</option>
            <option value="machinelearning">Machine Learning</option>
            <option value="mobiledevelopment">Mobile Development</option>
            <option value="gamedevelopment">Game Development</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
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
          {errors.company && (
            <p className="text-red-500 text-sm">{errors.company.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            {...register("location")}
            className="w-full border rounded-md p-2"
            placeholder="e.g. Remote, Bengaluru"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Time Duration */}
        <div>
          <label className="block mb-1 font-medium">Time Duration</label>
          <input
            type="text"
            {...register("time")}
            className="w-full border rounded-md p-2"
            placeholder="e.g. 3 months"
          />
          {errors.time && (
            <p className="text-red-500 text-sm">{errors.time.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">
            Upload Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="w-full border rounded-md p-2"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Preview */}
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

        {/* Submit */}
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
