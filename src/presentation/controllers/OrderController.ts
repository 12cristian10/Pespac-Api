import { Request, Response } from "express";
import { Order } from "../../domain/entities/Order";
import orderService from "../../application/services/OrderService";
import { generateOrderId } from "../../infraestructure/identificadores/OrderId";
import { validationResult } from "express-validator";

async function createOrder(req: Request, res: Response): Promise<Response> {
    try {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const currentDate = new Date();
        const deliveryDate = new Date();
        deliveryDate.setDate(currentDate.getDate() + 2);

        const orderRegister = {
            id: generateOrderId(),
            userDni: req.body.userDni,
            total: req.body.total,
            status: req.body.status,
            DeliveryDate: deliveryDate,
            locationId: req.body.locationId,
        } as Order;

        const order = await orderService.createOrder(orderRegister);
        if (order) {
            return res.status(201).json(order);
        } else {
            return res.status(409).json({ error: 'Order already exists' });
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function updateOrder(req: Request, res: Response): Promise<Response> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id, status } = req.body;
        const orderUpdated = await orderService.updateOrder(id, status);
        if (orderUpdated) {
            return res.status(200).json({ message: 'Order updated' });
        } else {
            return res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getOrder(req: Request, res: Response): Promise<Response> {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const order = await orderService.getOrder(id);
        if (order) {
            return res.status(200).json(order);
        } else {
            return res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function deleteOrder(req: Request, res: Response): Promise<Response> {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const orderDeleted = await orderService.deleteOrder(id);
        if (orderDeleted) {
            return res.status(200).json({ message: 'Order deleted' });
        } else {
            return res.status(400).json({ error: 'Order could not be updated' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getOrders(req: Request, res: Response): Promise<Response> {
    try {

        const orders = await orderService.getOrders();
        return res.status(200).json(orders);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

async function getOrdersByUserDni(req: Request, res: Response): Promise<Response> {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { dni } = req.params;
        const orders = await orderService.getOrdersByUserDni(dni);
        return res.status(200).json(orders);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}
export default {
    createOrder,
    updateOrder,
    getOrder,
    getOrders,
    deleteOrder,
    getOrdersByUserDni
}