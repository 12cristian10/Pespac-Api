import { User } from '../../domain/entities/User';
import userRepository from '../../infraestructure/repository/UserRepository';
import passwordOptions from '../../infraestructure/authentication/PasswordOptions';
import { Fisherman } from '../../domain/entities/Fisherman';
import fishermanService from '../../application/services/FishermanService';
import { serverConstants } from '../../config/constans';

    async function register(user: User): Promise<User | null> {
        const userExist = await userRepository.findByEmail(user.email);
        const userExistDni = await userRepository.findByDni(user.dni);

        if (userExist && userExistDni) {
            return null;
        }else{
            const hashedPassword = await passwordOptions.hashPassword(user.password);
            user.password = hashedPassword;
            const newUser = await userRepository.createUser(user);

            if(user.role == serverConstants.roles[1]){
                const fishermanRegister = {
                    dniUser: user.dni,
                    score: 0,
                    locationId: 1,
                } as Fisherman;

                const fisherman = await fishermanService.createFisherman(fishermanRegister);
                console.log(fisherman);
                if (user != null && fisherman != null) {
                    return newUser;
                }else{
                    return null;
                }
            }else{
                if (user != null) {
                    return newUser;
                } else {
                    return null
                }
            }

        }

    }
  
    async function IsValidUser(email: string, password: string): Promise<User | null> {
      const user = await userRepository.findByEmail(email);
      
      if (user && await passwordOptions.validatePassword(password, user.password)) {
        return user;
      }
      return null;
    }

export default { register, IsValidUser };
  