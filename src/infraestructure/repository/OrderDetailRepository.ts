import { OrderDetail } from "../../domain/entities/OrderDetail";
import { DBconstants as constants } from "../../config/constans";
import e from "express";

async function findAll(): Promise<OrderDetail[]> {
    return await constants.prisma.orderDetail.findMany();
}

async function findByOrderId(orderId: string): Promise<OrderDetail[]> {
    return await constants.prisma.orderDetail.findMany({ where: { orderId } });
}

async function findByProductId(productId: number): Promise<OrderDetail[]> {
    return await constants.prisma.orderDetail.findMany({ where: { productId } });
}


async function create(orderDetail: OrderDetail): Promise<OrderDetail> {
    return await constants.prisma.orderDetail.create({ data: orderDetail });
}

async function update(id:number , orderDetail: OrderDetail): Promise<OrderDetail> {
    return await constants.prisma.orderDetail.update({where:{id}, data: orderDetail});
}

export default { findAll, findByOrderId, findByProductId, create, update };