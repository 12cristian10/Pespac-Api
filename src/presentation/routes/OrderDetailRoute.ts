import {Router} from 'express';
import { Request, Response } from 'express';
import orderDetailController from '../controllers/OrderDetailController';
import { serverConstants as  constants} from '../../config/constans';
import { authenticateJwt, authorizeRoles } from '../middlewares/auth';

const router = Router();

router.get(
    '/',
    authenticateJwt,
    (req: Request, res: Response) => orderDetailController.getOrderDetails(req, res)
);

router.get(
    '/:id',
    authenticateJwt,
    (req: Request, res: Response) => orderDetailController.getOrderDetail(req, res)
);

router.get(
    '/product/:id',
    authenticateJwt,
    (req: Request, res: Response) => orderDetailController.getOrderDetailByProduct(req, res)
);

router.post(
    '/register',
    authenticateJwt,
    (req: Request, res: Response) => orderDetailController.createOrderDetail(req, res)
);

router.put(
    '/update',
    authenticateJwt,
    (req: Request, res: Response) => orderDetailController.updateOrderDetail(req, res)
);

export default router;