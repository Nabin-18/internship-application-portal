import { useParams } from "react-router-dom";
import slugify from "slugify";
import myData from "@/assets/data";
import InternDetails from "@/components/InternDetails";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  internTitle: z.string().min(1, "Intern title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
});

type FormData = z.infer<typeof formSchema>;

const Details = () => {
  const { title } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const matchedIntern = myData.find(
    (intern) => slugify(intern.name, { lower: true }) === title
  );

  if (!matchedIntern) {
    return (
      <p className="text-red-500 text-center p-6">Internship not found.</p>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setFileURL(URL.createObjectURL(file));
      setShowPreview(false);
    } else {
      toast.error("Only PDF files are supported.");
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);

    if (!selectedFile) {
      toast.error("Please upload a PDF resume before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("internTitle", data.internTitle);
    formData.append("company", data.company);
    formData.append("location", data.location);
    formData.append("resume", selectedFile);

    try {
      const res = await fetch("http://localhost:8000/client/submit-data", {
        method: "POST",
        body: formData,
      });

      const response = await res.json();
      if (!res.ok) throw new Error(response.message || "Upload failed");

      toast.success("Form submitted successfully!");
      setShowPreview(true);
    } catch (error) {
      console.log("Error occurred", error);
      toast.error("Something went wrong while submitting the form.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <div className="flex-1">
        <InternDetails {...matchedIntern} />
      </div>

      <div className="w-full md:w-1/2 p-4 gap-2 rounded-xl flex flex-col items-center bg-gray-100 shadow-md">
        <h2 className="text-xl font-semibold mb-2">Submission Process</h2>
        <p className="font-semibold">
          Please submit details for further processing
          <span className="text-sm text-red-500">
            {" "}
            (false information can lead to rejection)
          </span>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <div>
            <input
              type="text"
              placeholder="Enter your full name"
              className="border border-gray-300 p-2 rounded w-full"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 p-2 rounded w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Intern title"
              className="border border-gray-300 p-2 rounded w-full"
              {...register("internTitle")}
            />
            {errors.internTitle && (
              <p className="text-red-500 text-sm">
                {errors.internTitle.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter company name"
              className="border border-gray-300 p-2 rounded w-full"
              {...register("company")}
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter company location"
              className="border border-gray-300 p-2 rounded w-full"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          <input
            className="border border-gray-300 p-2 rounded w-full cursor-pointer"
            accept=".pdf"
            type="file"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

        {showPreview && fileURL && (
          <div className="mt-6 w-full">
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <iframe
              src={fileURL}
              title="PDF Preview"
              width="100%"
              height="400px"
              className="border rounded-md shadow"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
