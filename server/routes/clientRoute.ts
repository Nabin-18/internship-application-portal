import express from "express";
import {  submitInternDetail } from "../controllers/internshipSubmissionController";
import upload from "../middleware/multer";


const router = express.Router();

router.post('/submit-data',upload.single("resume"), submitInternDetail)


export default router;
