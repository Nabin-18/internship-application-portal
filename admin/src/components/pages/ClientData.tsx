import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useState } from "react";

type ClientStatus = "accepted" | "rejected" | null;

type ClientDataType = {
  id: string;
  username: string;
  email: string;
  internTitle: string;
  location: string;
  resume: string;
  status: ClientStatus;
};

const initialClientData: ClientDataType[] = [
  {
    id: "1",
    username: "Nabin Khanal",
    email: "khanalnabin310@gmail.com",
    internTitle: "React Js",
    location: "Bangalore, India",
    resume: "link",
    status: null, 
  },
  {
    id: "2",
    username: "Nabin Khanal",
    email: "example@gmail.com",
    internTitle: "React Js",
    location: "Bangalore, India",
    resume: "link",
    status: null,
  },
];

const ClientData = () => {
  const [clientData, setClientData] = useState<ClientDataType[]>(initialClientData);

  const handleStatusChange = (id: string, newStatus: "accepted" | "rejected") => {
    setClientData((prev) =>
      prev.map((data) =>
        data.id === id ? { ...data, status: newStatus } : data
      )
    );

    // Optional: send email to user based on newStatus here
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {["S.N", "Username", "Email", "Intern Title", "Location", "Resume", "Actions", "Status"].map(
              (heading, i) => (
                <TableHead
                  key={i}
                  className={`font-bold ${heading === "Actions" || heading === "Status" ? "text-right" : ""}`}
                >
                  {heading}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {clientData.map((data, index) => (
            <TableRow key={data.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{data.username}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.internTitle}</TableCell>
              <TableCell>{data.location}</TableCell>
              <TableCell>
                <a
                  href={data.resume}
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
                  <span className="text-green-600 font-semibold cursor-pointer">Accepted</span>
                )}
                {data.status === "rejected" && (
                  <span className="text-red-600 font-semibold cursor-pointer">Rejected</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientData;
