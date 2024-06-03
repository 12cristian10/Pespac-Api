import { Order } from "../../domain/entities/Order";
import { DBconstants as constants} from "../../config/constans";

async function findAll(): Promise<Order[]> {
    return await constants.prisma.order.findMany();
}

async function findByUserDni(userDni: string): Promise<Order[]> {
    return await constants.prisma.order.findMany({ where: { userDni } });
}

async function findById(id: string): Promise<Order | null> {
    return await constants.prisma.order.findUnique({ where: { id } });
}

async function create(order: Order): Promise<Order> {
    return await constants.prisma.order.create({ data: order });
}

async function update(id: string, order: Order): Promise<Order> {
    return await constants.prisma.order.update({ where: { id }, data: order });
}

async function deleteById(id: string): Promise<Order> {
    return await constants.prisma.order.delete({ where: { id } });
}

export default { findAll, findById, create, update, deleteById, findByUserDni};