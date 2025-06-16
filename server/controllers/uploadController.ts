// import type { Request, Response } from 'express';
// import cloudinary from '../config/couldinary';

// const uploadController = async (req: Request, res: Response) => {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // validate mimetype
//     const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
//     if (!allowedMimeTypes.includes(file.mimetype)) {
//       return res.status(400).json({ message: "Invalid file type" });
//     }

//     const resourceType = file.mimetype === 'application/pdf' ? 'raw' : 'image';

//     const result = await cloudinary.uploader.upload(file.path, {
//       resource_type: resourceType,
//       folder: 'uploads',
//     });

//     res.status(200).json({
//       message: 'File uploaded successfully',
//       url: result.secure_url,
//       public_id: result.public_id,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Upload failed", error });
//   }
// };


// export default uploadController;
