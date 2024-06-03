import { Location } from "../../domain/entities/Location";
import { DBconstants as constants} from "../../config/constans";


async function findAll(): Promise<Location[]> {
    return await constants.prisma.location.findMany();
}

async function findById(id: number): Promise<Location | null> {
    return await constants.prisma.location.findUnique({ where: { id } });
}

async function create(location: Location): Promise<Location> {
    return await constants.prisma.location.create({ data: location });
}

async function update(id: number, location: Location): Promise<Location> {
    return await constants.prisma.location.update({ where: { id }, data: location });
}

async function deleteById(id: number): Promise<Location> {
    return await constants.prisma.location.delete({ where: { id } });
}

export default { findAll, findById, create, update, deleteById };