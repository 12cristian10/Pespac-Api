import { User } from '../../domain/entities/User';
import userRepository from '../../infraestructure/repository/UserRepository';
import imageService from '../../infraestructure/images/imageService';
import { serviceConstants as constans} from '../../config/constans';
async function userEmailExist(email: string): Promise<boolean> {
    const user = await userRepository.findByEmail(email);
    return user ? true : false;
}

async function getUser(dni: string): Promise<User | null> {
    return await userRepository.findByDni(dni);
}

async function uploadProfilePicture(dni: string, picture: Express.Multer.File) {
    const user = await userRepository.findByDni(dni);
    
    if (user) {
        const imageUploaded = await imageService.uploadImage(picture, user.dni, constans.profilePictureDirectory);
        if (imageUploaded.success) {
            user.ProfilePicture = imageUploaded.message;
            const newUser = await userRepository.updateUser(user);
            if(newUser) {
                return {success: true, message: newUser.ProfilePicture};
            } else {
                return {success: false, message: "Error updating user profile picture"};
            }
        } else {
            return {success: false, message: imageUploaded.message};
        }
    } else {
        return {success: false, message: "User not found"};
    }
}

async function updateUser(user: User): Promise<User | null> {
    const userExist = await userRepository.findByDni(user.dni);

    if (!userExist) {
        return null;
    } else {
        const newUser = await userRepository.updateUser(user);

        if (!newUser) {
            return null;
        }
        return newUser;
    }

}

async function deleteUser(dni: string): Promise<boolean> {
    const user = await userRepository.findByDni(dni);

    if (user) {
        const userDeleted = await userRepository.deleteUser(dni);
        return userDeleted ? true : false;
    } else {
        return false;
    }
}

export default { getUser, userEmailExist, uploadProfilePicture, updateUser, deleteUser };