import prisma from "../config/db";

import type { Request, Response } from "express";


//submit the client data from frontend
export const submitInternDetail = async (req: Request, res: Response): Promise<void> => {
  const { name, email, internTitle, company, location } = req.body;

  // PDF file is available in req.file
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: "PDF resume file is required." });
    return;
  }

  const resumeUrl = `http://localhost:8000/uploads/${file.filename}`; 

  try {
    const data = await prisma.internshipSubmission.create({
      data: {
        name,
        email,
        internTitle,
        company,
        location,
        resumeUrl,
      },
    });

    res.status(200).json({ message: "Details submitted successfully", data });
  } catch (error) {
    console.error("Error occurred while submitting:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get all the client Data by admin

export const getClientData = async (req: Request, res: Response): Promise<void> => {

  try {
    const clientData = await prisma.internshipSubmission.findMany({})
    res.status(200).json({ message: "Fetched client data successfully", data: clientData })

  } catch (error) {
    console.log("Error occured during fetching client Data", error)
    res.status(500).json({ message: "Internal server Error" })

  }

}