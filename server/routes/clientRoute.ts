import express from "express";
import {  submitInternDetail } from "../controllers/internshipSubmissionController";


const router = express.Router();

router.post('/submit-data', submitInternDetail)


export default router;
