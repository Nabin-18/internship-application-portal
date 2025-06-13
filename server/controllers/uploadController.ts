import cloudinary from '../config/couldinary';
import type { Request, Response } from 'express';

const uploadController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || !req.files.image) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const file = req.files.image as any;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
      folder: 'uploads',
    });

    res.status(200).json({
      message: ' File uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Upload failed', error });
  }
};

export default uploadController;