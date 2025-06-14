import express from "express";
import { createPostController, deletePost, getAllPosts, updatePost } from "../controllers/createPostController";
import { getClientData } from "../controllers/internshipSubmissionController";

const router = express.Router();

router.post('/create-post', createPostController)
router.delete('/delete-post/:id', deletePost)
router.get('/get-post', getAllPosts)
router.put('/update-post/:id', updatePost)
router.get('/client-data',getClientData)


export default router;
