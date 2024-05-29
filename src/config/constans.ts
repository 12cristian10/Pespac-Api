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
    }
};

export const DBconstants = {
    prisma: new PrismaClient()
  };
