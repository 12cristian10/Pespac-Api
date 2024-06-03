import { Router } from "express";
import { Request, Response } from 'express';
import OrderController from '../controllers/OrderController';
import { authenticateJwt, authorizeRoles } from '../middlewares/auth';
import { serverConstants as constants } from '../../config/constans';
import { orderRegister, orderUpdate, orderGet, orderDelete } from '../../infraestructure/validators/OrderValidator';

const router = Router();

router.post(
    '/register',
    authenticateJwt,
    orderRegister,
    authorizeRoles(constants.roles[0], constants.roles[2]),
    (req: Request, res: Response) => OrderController.createOrder(req, res)
);

router.put(
    '/update',
    authenticateJwt,
    orderUpdate,
    (req: Request, res: Response) => OrderController.updateOrder(req, res)
);

router.get(
    '/:id',
    authenticateJwt,
    orderGet,
    (req: Request, res: Response) => OrderController.getOrder(req, res)
);

router.get(
    '/',
    authenticateJwt,
    (req: Request, res: Response) => OrderController.getOrders(req, res)
);

router.get(
    '/user/:dni',
    authenticateJwt,

    (req: Request, res: Response) => OrderController.getOrdersByUserDni(req, res)
);

router.delete(
    '/:id',
    authenticateJwt,
    authorizeRoles(constants.roles[0]),
    orderDelete,
    (req: Request, res: Response) => OrderController.deleteOrder(req, res)
);



export default router;