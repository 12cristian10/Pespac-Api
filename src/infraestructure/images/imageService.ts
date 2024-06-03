import { serviceConstants as cloudinary} from "../../config/constans";

async function uploadImage(file: any, id: string, directory: string) {
    try {
        const response = await cloudinary.cloudinary.v2.uploader.upload(file.path, {
            folder: directory,
            public_id: id,
        });
        return { success: true, message: response.secure_url };
    } catch (error: Error | any) {
        console.log(error);
        return { success: false, message: error.message };
    }
}

export default { uploadImage };