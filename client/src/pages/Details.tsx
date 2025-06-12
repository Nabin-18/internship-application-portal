import { useParams } from "react-router-dom";
import slugify from "slugify";
import myData from "@/assets/data";
import InternDetails from "@/components/InternDetails";
import { useState } from "react";
import { toast } from "react-toastify";

const Details = () => {
  const { title } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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
      alert("Only PDF files are supported.");
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast.error("Upload pdf before submitting")
      return;
    }
    toast.success("Uploaded successfullly")
   

    setShowPreview(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <div className="flex-1">
        <InternDetails {...matchedIntern} />
      </div>
      <div className="w-full md:w-1/3 p-4 gap-2 rounded-xl flex flex-col items-center bg-gray-100 shadow-md">
        <h2 className="text-xl font-semibold mb-2">Submission Process</h2>
        <p className="font-semibold">Please submit your details for further processing 
          <span className="text-sm text-red-500"> (false information can leads towards the rejection)</span>
         </p>
        <input type="text" placeholder="Enter your full name" className="border border-gray-300 p-2 rounded w-full " />
         <input type="email" placeholder="Enter your email" className="border border-gray-300 p-2 rounded w-full " />
          <input type="text" placeholder="Intern title" className="border border-gray-300 p-2 rounded w-full " />
           <input type="text" placeholder="Enter company name" className="border border-gray-300 p-2 rounded w-full " />
            
        
        <input
          className="border border-gray-300 p-2 rounded w-full cursor-pointer"
          accept=".pdf"
          type="file"
          onChange={handleFileChange}
        />
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>

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
