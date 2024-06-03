import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import Cloudinary from "cloudinary";

dotenv.config();

export const serverConstants = {
    port: process.env.PORT || 3000,
    session: {
      secret: "secretPespac2024",
    },
    jwt: {
      secret: process.env.JWT_SECRET || "secretPespac2024",
      saltSize: 10
    },
    roles:["admin","fisherman","consumer"],
    dniTypes:["CC","CE","PAS","RC","NIT"],
    oderStatus:["sent","pending","in_progress","delivered","canceled"],
    defaultLocation:{
      deparment:"bolivar",
      city:"cartagena",
      neigborhood:"bocagrande",
      addres:"calle 5 # 5-5"
    }
};

Cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY || "api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "api_secret",
});

export const serviceConstants = {
    cloudinary: Cloudinary,
    profilePictureDirectory: "Pespac/profile_pictures",
    productImageDirectory: "Pespac/product_images",
    defaultProfilePicture: "https://res.cloudinary.com/dlvmv0xj9/image/upload/v1717301898/Pespac/profile_pictures/q7vv4ypcuojxdtjy5vx7.jpg",
    defaultProductImage: "https://res.cloudinary.com/dlvmv0xj9/image/upload/v1717301898/Pespac/product_images/ez1zq7v9zq5z6x5mzq8i.jpg",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "google_maps_api_key",
}
export const DBconstants = {
    prisma: new PrismaClient()
  };
