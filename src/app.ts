import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { serverConstants as constants} from './config/constans';
import path from "path";
import moment from "moment-timezone";

// Configuración de la app
const app = express();

// Morgan config
const customFormatMorgan = ":time :method :url :status :response-time ms";
morgan.token("time", () => {
  return moment().tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss");
});
app.use(morgan(customFormatMorgan));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuración de CORS
const corsOptions = {
  origin: "*", // Reemplazar con dominio en producción
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Hola mundo");
  });
  
  app.listen(constants.port, () => {
    console.log(`Server running on port ${constants.port}`);
  });