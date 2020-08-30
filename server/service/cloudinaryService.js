import { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../constants';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

function uploadStream(fileBuffer, options) {
  return new Promise((resolve, reject) => {
    // Sadly, this method does not support async/await
    cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }).end(fileBuffer);
  });
}


export const uploadFiles = async (files) => {
  const result = await Promise.all(
    files.map(file => uploadStream(file.buffer, { filename: file.originalname })),
  );
  return result;
};
