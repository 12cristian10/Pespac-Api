import { User } from "../../domain/entities/User";
import { DBconstants as constants} from "../../config/constans";


    async function findByEmail(email: string): Promise<User | null> {
        return await constants.prisma.user.findUnique({ where: { email } });
    }

    async function findByDni(dni: string): Promise<User | null> {
        return await constants.prisma.user.findUnique({ where: { dni } });
    }

    async function createUser(user: User): Promise<User> {
        return await constants.prisma.user.create({ data: user });
    }

    async function updateUser(user: User): Promise<User> {
        return await constants.prisma.user.update({ where: { dni: user.dni }, data: user });
    }

    async function deleteUser(dni: string): Promise<User> {
        return await constants.prisma.user.delete({ where: { dni } });
    }

    export default { findByEmail, findByDni, createUser, updateUser, deleteUser };
