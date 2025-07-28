import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
//import multer from 'multer';

export const multerOptions = {
  storage: new CloudinaryStorage({
    cloudinary,
    params: async () => ({
      folder: 'art-library',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    }),
  }),
};
