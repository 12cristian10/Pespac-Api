import OrderDetailRepository from "../../infraestructure/repository/OrderDetailRepository";
import { OrderDetail } from "../../domain/entities/OrderDetail";

export async function createOrderDetail(orderDetail: OrderDetail): Promise<OrderDetail | null> {
    const orderDetailExist = await OrderDetailRepository.findByOrderId(orderDetail.orderId);
    if (orderDetailExist) {
        return null;
    }
    const orderDetailCreated = await OrderDetailRepository.create(orderDetail);
    return orderDetailCreated;
}

export async function updateOrderDetail(id: number, orderDetail: OrderDetail): Promise<OrderDetail | null> {
    const orderDetailExist = await OrderDetailRepository.findByOrderId(orderDetail.orderId);
    if (!orderDetailExist) {
        return null;
    }
    const orderDetailUpdated = await OrderDetailRepository.update(id, orderDetail);
    return orderDetailUpdated;
}

export async function getOrderDetailByProduct(id: number): Promise<OrderDetail[]> {
    return await OrderDetailRepository.findByProductId(id);
}

export async function getOrderDetailByOrder(id: string): Promise<OrderDetail[]> {
    return await OrderDetailRepository.findByOrderId(id);
}

export async function getOrderDetails(): Promise<OrderDetail[]> {
    return await OrderDetailRepository.findAll();
}

export default { createOrderDetail, updateOrderDetail, getOrderDetailByProduct, getOrderDetailByOrder, getOrderDetails};