import { Router } from 'express';
import { Request, Response } from 'express';
import  fishermanController  from '../controllers/FishermanController';
import  { fishermanRegister, fishermanUpdate, fishermanGet }  from '../../infraestructure/validators/FishermanValidator';
import { authenticateJwt,  authorizeRoles} from '../middlewares/auth';
import { serverConstants as constants} from '../../config/constans';
const router = Router();

router.post(
    '/register',
    authenticateJwt,
    authorizeRoles(constants.roles[0], constants.roles[1]),
    fishermanRegister,
    (req: Request, res: Response) => fishermanController.registerFisherman(req, res)
);

router.put(
    '/update',
    authenticateJwt,
    fishermanUpdate,
    (req: Request, res: Response) => fishermanController.updateFisherman(req, res)
);

router.get(
    '/:dni',
    authenticateJwt,
    fishermanGet,
    (req: Request, res: Response) => fishermanController.getFisherman(req, res)
);

export default router;