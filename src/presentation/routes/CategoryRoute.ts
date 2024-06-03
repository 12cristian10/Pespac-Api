import { Router } from 'express';
import { Request, Response } from 'express';
import CategoryController from '../controllers/CategoryController';
import { categoryRegister, categoryUpdate, categoryGet, categoryDelete } from '../../infraestructure/validators/CategoryValidator';
import { authenticateJwt, authorizeRoles } from '../middlewares/auth';
import { serverConstants as constants } from '../../config/constans';
const router = Router();


router.post(
    '/register',
    authenticateJwt,
    authorizeRoles(constants.roles[0]),
    categoryRegister,
    (req: Request, res: Response) => CategoryController.createCategory(req, res)
);

router.put(
    '/update',
    authenticateJwt,
    authorizeRoles(constants.roles[0]),
    categoryUpdate,
    (req: Request, res: Response) => CategoryController.updateCategory(req, res)
);

router.get(
    '/:id',
    authenticateJwt,
    authorizeRoles(constants.roles[0]),
    categoryGet,
    (req: Request, res: Response) => CategoryController.getCategory(req, res)
);

router.delete(
    '/:id',
    authenticateJwt,
    authorizeRoles(constants.roles[0]),
    categoryDelete,
    (req: Request, res: Response) => CategoryController.deleteCategory(req, res)
);

export default router;