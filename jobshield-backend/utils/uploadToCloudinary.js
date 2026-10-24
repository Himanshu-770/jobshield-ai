import cloudinary from "../config/cloudinary.config.js";

export const uploadToCloudinary = async (buffer) => {
    return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream({
            folder: "jobshield", resource_type: "image"
        }, (error, result) => {
            return error ? reject(error) : resolve(result);
        })

        upload.end(buffer);
    })
}
