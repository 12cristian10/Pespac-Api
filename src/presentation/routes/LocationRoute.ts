import { Router } from "express";
import { Request, Response } from "express";
import LocationController from "../controllers/LocationController";
import { authenticateJwt, authorizeRoles } from '../middlewares/auth';
import { serverConstants as constants } from '../../config/constans';
import { locationRegister, locationUpdate, locationGet, locationDelete } from '../../infraestructure/validators/LocationValidator';
const router = Router();

router.post( 
    '/register',
    authenticateJwt,
    locationRegister,
    (req: Request, res: Response) => LocationController.createLocation(req, res)
);

router.put(
    '/update',
    authenticateJwt,
    locationUpdate,
    (req: Request, res: Response) => LocationController.updateLocation(req, res)
);

router.get(
    '/:id',
    authenticateJwt,
    locationGet,
    (req: Request, res: Response) => LocationController.getLocation(req, res)
);

router.delete(
    '/:id',
    authenticateJwt,
    locationDelete,
    authorizeRoles(constants.roles[0]),
    (req: Request, res: Response) => LocationController.deleteLocation(req, res)
);

export default router;
