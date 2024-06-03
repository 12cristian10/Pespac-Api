import { Category } from "../../domain/entities/Category";
import { DBconstants as constants} from "../../config/constans";

async function findAll(): Promise<Category[]> {
    return await constants.prisma.category.findMany();
}

async function findById(id: number): Promise<Category | null> {
    return await constants.prisma.category.findUnique({ where: { id } });
}

async function create(category: Category): Promise<Category> {
    return await constants.prisma.category.create({ data: category });
}

async function update(id: number, category: Category): Promise<Category> {
    return await constants.prisma.category.update({ where: { id }, data: category });
}

async function deleteById(id: number): Promise<Category> {
    return await constants.prisma.category.delete({ where: { id } });
}

export default { findAll, findById, create, update, deleteById };