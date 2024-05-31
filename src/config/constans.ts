import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const serverConstants = {
    port: process.env.PORT || 3000,
    session: {
      secret: "secret",
    },
    jwt: {
      secret: process.env.JWT_SECRET || "secretPespac2024",
      saltSize: 10
    },
    roles:["admin","fisherman","consumer"]
};

export const serviceConstants = {
    defaultProfilePicture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
}
export const DBconstants = {
    prisma: new PrismaClient()
  };
