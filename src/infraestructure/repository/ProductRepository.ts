import { Product } from "../../domain/entities/Product";
import { DBconstants as constants} from "../../config/constans";

async function findAll(): Promise<Product[]> {
    return await constants.prisma.product.findMany();
}

async function findById(id: number): Promise<Product | null> {
    return await constants.prisma.product.findUnique({ where: { id } });
}

async function findByCategory(categoryId: number): Promise<Product[]> {
    return await constants.prisma.product.findMany({ where: { categoryId } });
}

async function findByFishermanDni(fishermanDni: string): Promise<Product[]> {
    return await constants.prisma.product.findMany({ where: { fishermanDni } });
}

async function findByName(name: string): Promise<Product[]> {  
    return await constants.prisma.product.findMany({ where: { name } });
}


async function create(product: Product): Promise<Product> {
    return await constants.prisma.product.create({ data: product });
}

async function findByPeriod(startDate: Date, endDate: Date): Promise<Product[]> {
    return await constants.prisma.product.findMany({ where: { productDate: { gte: startDate, lte: endDate } } });
}

async function updateStock(id: number, stock: number): Promise<Product> {
    return await constants.prisma.product.update({ where: { id }, data: { stock } });
}

async function update(id: number, product: Product): Promise<Product> {
    return await constants.prisma.product.update({ where: { id }, data: product });
}

async function deleteById(id: number): Promise<Product> {
    return await constants.prisma.product.delete({ where: { id } });
}

export default { findAll, findById, create, update, deleteById, findByCategory, findByFishermanDni, findByName, findByPeriod, updateStock};