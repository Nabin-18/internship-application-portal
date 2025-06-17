import { useParams } from "react-router-dom";
import slugify from "slugify";

import InternDetails from "@/components/InternDetails";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostStore } from "@/store/postStore";

// Zod schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  internTitle: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

const Details = () => {
  const { title } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const { posts } = usePostStore();
  const matchedIntern = posts.find(
    (intern) => slugify(intern.title, { lower: true }) === title
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      internTitle: matchedIntern?.title || "",
      company: matchedIntern?.company || "",
      location: matchedIntern?.location || "",
    },
  });

  useEffect(() => {
    if (matchedIntern) {
      setValue("internTitle", matchedIntern.title);
      setValue("company", matchedIntern.company);
      setValue("location", matchedIntern.location);
    }
  }, [matchedIntern, setValue]);

  useEffect(() => {
    if (showPreview && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showPreview]);

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
      setLoading(true);
      const res = await fetch("http://localhost:8000/client/submit-data", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Upload failed");
      }

      toast.success("Form submitted successfully!");
      setShowPreview(true);
    } catch (error: any) {
      console.error("Error occurred:", error);
      toast.error(error.message || "Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  if (!matchedIntern) {
    return (
      <p className="text-red-500 text-center p-6">Internship not found.</p>
    );
  }

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
          encType="multipart/form-data"
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
              readOnly
              className="bg-gray-200 cursor-not-allowed border border-gray-300 p-2 rounded w-full"
              {...register("internTitle")}
            />
          </div>

          <div>
            <input
              type="text"
              readOnly
              className="bg-gray-200 cursor-not-allowed border border-gray-300 p-2 rounded w-full"
              {...register("company")}
            />
          </div>

          <div>
            <input
              type="text"
              readOnly
              className="bg-gray-200 cursor-not-allowed border border-gray-300 p-2 rounded w-full"
              {...register("location")}
            />
          </div>

          <input
            className="border border-gray-300 p-2 rounded w-full cursor-pointer"
            accept=".pdf"
            type="file"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {showPreview && fileURL && (
          <div ref={previewRef} className="mt-6 w-full">
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
