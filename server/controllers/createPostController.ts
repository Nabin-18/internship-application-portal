
import prisma from "../config/db";
import type { Request, Response } from "express";


//admin can create multiple post  (Create Operation)

export const createPostController = async (req: Request, res: Response):Promise<void> => {
  try {
    const { title, category, company, location, time, description } = req.body;
    const files = req.files as {
      image?: Express.Multer.File[];
      pdf?: Express.Multer.File[];
    };

    const imageFile = files?.image?.[0];
   

    if (!imageFile) {
       res.status(400).json({ message: "Image file is required" });
       return
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        category,
        company,
        location,
        time,
        description,
        image: `/uploads/${imageFile.filename}`,
        
      },
    });

    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




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
  const postId = Number(req.params.id);
  if (isNaN(postId)) {
    res.status(400).json({ message: "Invalid post ID" });
    return;
  }

  try {
    const { title, category, company, location, time, description, existingImagePath } = req.body;

    const files = req.files as {
      image?: Express.Multer.File[];
    };

    const imageFile = files?.image?.[0];

    const dataToUpdate: any = {
      title,
      category,
      company,
      location,
      time,
      description,
      image: imageFile
        ? `/uploads/${imageFile.filename}`
        : existingImagePath || undefined,
    };

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: dataToUpdate,
    });

    res.status(200).json({ message: "Post updated successfully", data: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
