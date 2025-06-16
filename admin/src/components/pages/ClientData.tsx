import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

type ClientStatus = "accepted" | "rejected" | null;

type ClientDataType = {
  id: string | number;
  name: string;
  email: string;
  internTitle: string;
  location: string;
  company: string;
  resumeUrl: string;
  status: ClientStatus;
};

const ClientData = () => {
  const [clientData, setClientData] = useState<ClientDataType[]>([]);

  const getClientData = async () => {
    try {
      const response = await fetch("http://localhost:8000/admin/client-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch client data");
        return;
      }

      const result = await response.json();
      // Add default status (null) because backend doesn't send it
      const dataWithStatus = result.data.map((item: any) => ({
        ...item,
        status: null as ClientStatus,
      }));
      setClientData(dataWithStatus);
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  useEffect(() => {
    getClientData();
  }, []);

  const handleStatusChange = (id: string | number, newStatus: ClientStatus) => {
    setClientData((prev) =>
      prev.map((data) =>
        data.id === id ? { ...data, status: newStatus } : data
      )
    );

    // Optional: send update to backend here to save status permanently
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "S.N",
              "Name",
              "Email",
              "Intern Title",
              "Location",
              "Company",
              "Resume",
              "Actions",
              "Status",
            ].map((heading, i) => (
              <TableHead
                key={i}
                className={`font-bold ${
                  heading === "Actions" || heading === "Status"
                    ? "text-right"
                    : ""
                }`}
              >
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {clientData.map((data, index) => (
            <TableRow key={data.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{data.name}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.internTitle}</TableCell>
              <TableCell>{data.location}</TableCell>
              <TableCell>{data.company}</TableCell>
              <TableCell>
                <a
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View
                </a>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  className="bg-green-500 hover:bg-green-600 cursor-pointer"
                  disabled={!!data.status}
                  onClick={() => handleStatusChange(data.id, "accepted")}
                >
                  Accept
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 cursor-pointer"
                  disabled={!!data.status}
                  onClick={() => handleStatusChange(data.id, "rejected")}
                >
                  Reject
                </Button>
              </TableCell>
              <TableCell className="text-right">
                {data.status === "accepted" && (
                  <span className="text-green-600 font-semibold cursor-pointer">
                    Accepted
                  </span>
                )}
                {data.status === "rejected" && (
                  <span className="text-red-600 font-semibold cursor-pointer">
                    Rejected
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {clientData.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">No client data available.</p>
        </div>
      )}
    </div>
  );
};

export default ClientData;
