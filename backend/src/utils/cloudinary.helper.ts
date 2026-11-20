import cloudinary from "../config/cloudinary.config.js";
import { AppError } from "./app-error.js";

export const uploadImgeToCloudinary = (
  buffer: Buffer,
  folder: "ecommerce/products",
) => {
  return new Promise<{ publicId: string; secureUrl: string }>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },

        (error, result) => {
          if (error || !result) {
            reject(new AppError("Image upload failed", 500));
            return;
          }

          resolve({
            publicId: result.public_id,
            secureUrl: result.secure_url,
          });
        },
      );
      uploadStream.end(buffer);
    },
  );
};


export const deleteImageFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image"
    })

    if (result.result !== "ok" && result.result !== "not found" ){
      throw new Error("Image deletion failed");
    }
  } catch (error) {
    throw new AppError("Image deletion failed", 500)
  }

}
