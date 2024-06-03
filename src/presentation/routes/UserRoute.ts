import { Router } from 'express';
import { Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { userUpdate } from '../../infraestructure/validators/UserValidator';
import { authenticateJwt, authorizeRoles } from '../middlewares/auth';
import { serverConstants as constants } from '../../config/constans';
import { multerOptions } from '../middlewares/multerOptions';

const router = Router();

router.put(
    '/update',
    authenticateJwt,
    userUpdate,
    (req: Request, res: Response) => UserController.updateUser(req, res)
);

router.get(
    '/:dni',
    authenticateJwt,
    (req: Request, res: Response) => UserController.getUser(req, res)
);

router.delete('/:dni',
    authenticateJwt,
    authorizeRoles(constants.roles[0]),
    (req: Request, res: Response) => UserController.deleteUser(req, res)
);

router.put('/profilePicture',
    authenticateJwt,
    multerOptions.single('profilePicture'),
    (req: Request, res: Response) => UserController.uploadProfilePicture(req, res)
);
