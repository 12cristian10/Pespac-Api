import OrderRepository from "../../infraestructure/repository/OrderRepository";
import { Order } from "../../domain/entities/Order";

export async function createOrder(order: Order): Promise<Order | null> {
    const orderExist = await OrderRepository.findById(order.id);
    if (orderExist) {
        return null;
    }
    const orderCreated = await OrderRepository.create(order);
    return orderCreated;
}

export async function updateOrder(id: string, status: string): Promise<Order | null> {
    const order = await OrderRepository.findById(id);
    if (!order) {
        return null;
    }
    order.status = status;
    const orderUpdated = await OrderRepository.update(id, order);
    return orderUpdated;
}

export async function getOrder(id: string): Promise<Order | null> {
    return await OrderRepository.findById(id);
}

export async function getOrders(): Promise<Order[]> {
    return await OrderRepository.findAll();
}

export async function deleteOrder(id: string): Promise<boolean> {
    const order = await OrderRepository.findById(id);
    if (!order) {
        return false;
    }
    const orderDeleted = await OrderRepository.deleteById(id);
    return orderDeleted ? true : false;
}

export async function getOrdersByUserDni(userDni: string): Promise<Order[]> {
    return await OrderRepository.findByUserDni(userDni);
}


export default { createOrder, updateOrder, getOrder, getOrders, deleteOrder, getOrdersByUserDni};