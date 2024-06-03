import OrderDetailService from "../../application/services/OrderDetailService";
import { OrderDetail } from "../../domain/entities/OrderDetail";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

async function createOrderDetail(req: Request, res: Response): Promise<Response> {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const orderDetailRegister = {
            orderId: req.body.orderId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            total: req.body.total,
        } as OrderDetail;

        const orderDetail = await OrderDetailService.createOrderDetail(orderDetailRegister);
        if (orderDetail) {
            return res.status(201).json(orderDetail);
        } else {
            return res.status(409).json({ error: 'OrderDetail already exists' });
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function updateOrderDetail(req: Request, res: Response): Promise<Response> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const orderDetail = {
            orderId: req.body.orderId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            total: req.body.total,
        } as OrderDetail;
        const orderDetailUpdated = await OrderDetailService.updateOrderDetail(req.body.id, orderDetail);
        if (orderDetailUpdated) {
            return res.status(200).json({ message: 'OrderDetail updated' });
        } else {
            return res.status(404).json({ error: 'OrderDetail not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getOrderDetail(req: Request, res: Response): Promise<Response> {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const orderDetail = await OrderDetailService.getOrderDetailByOrder(id);
        if (orderDetail) {
            return res.status(200).json(orderDetail);
        } else {
            return res.status(404).json({ error: 'OrderDetail not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getOrderDetails(req: Request, res: Response): Promise<Response> {
    try {
        const orderDetails = await OrderDetailService.getOrderDetails();
        return res.status(200).json(orderDetails);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getOrderDetailByProduct(req: Request, res: Response): Promise<Response> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const orderDetail = await OrderDetailService.getOrderDetailByProduct(Number(id));
        if (orderDetail) {
            return res.status(200).json(orderDetail);
        } else {
            return res.status(404).json({ error: 'OrderDetail not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}
export default { createOrderDetail, updateOrderDetail, getOrderDetail, getOrderDetails, getOrderDetailByProduct};