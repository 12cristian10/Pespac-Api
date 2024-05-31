import { Fisherman } from "../../domain/entities/Fisherman";
import { DBconstants as constants} from "../../config/constans";


async function findByDni(dniUser: string): Promise<Fisherman | null> {
    return await constants.prisma.fisherman.findUnique({ where: { dniUser } });
}

async function create(fisherman: Fisherman): Promise<Fisherman> {
    return await constants.prisma.fisherman.create({ data: fisherman });
}

async function update(dni: string, score: number ): Promise<boolean> {
    const updateFisherman = await constants.prisma.fisherman.update({ where: { dniUser: dni }, data: { score }});
    return updateFisherman !== null;
}

export default { findByDni, create, update };