
import prisma from "../config/db";
import type { Request, Response } from "express";

//admin can create multiple post  (Create Operation)

export const createPostController = async (req: Request, res: Response): Promise<void> => {
  const { title, category, company, location, time, image, description } = req.body

  try {
    const createPost = await prisma.post.create({
      data: {
        title, category, company, location, time, image, description
      }

    })
    res.status(200).json({
      message: "Post Created Successfully !",
      data: createPost
    })

  } catch (error) {
    console.log("Error occur", error)
    res.status(500).json({
      message: "Internal Server Error"
    })

  }

}
//delete the post from the database  (delete Operation)

export const deletePost = async (req: Request, res: Response): Promise<void> => {

  const postId = Number(req.params.id)

  //check if the post is exist or not

  if (isNaN(postId)) {
    res.status(400).json({
      message: "Post Id is not found"

    })
    return

  }
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: postId
      }

    })
    res.status(200).json({
      message: "Post Deleted Successfully",
      data: deletePost
    })

  } catch (error) {
    console.log("Error deleting post ", error)
    res.status(500).json({
      message: "Internal Server Error"
    })

  }


}

//get all the post (Read Operation )


export const getAllPosts = async (req: Request, res: Response): Promise<void> => {

  try {
    const allposts = await prisma.post.findMany({})
    res.status(200).json({
      message: "Got all the post ",
      data: allposts
    })

  } catch (error) {
    console.log("Error Occured while fetching ", error)
    res.status(500).json({
      message: "Internal Server Error"
    })

  }

}

//update the post (Update Operation)

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  const postId = Number(req.params.id)
  const { title, category, company, location, time, image, description } = req.body
  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title, category, company, location, time, image, description
      }
    })
    res.status(200).json({ message: "Post updated Successfully", data: updatedPost })

  } catch (error) {
    console.log("Error while updating", error)
    res.status(500).json({ message: "Internal Server Error" })

  }

}