import jwt from 'jsonwebtoken';
import { LoginDTO } from '../../domain/dtos/loginDto';
import { serverConstants as constants } from '../../config/constans';

  async function generateToken(userLogin: LoginDTO): Promise<string> {
    return await jwt.sign(userLogin,constants.jwt.secret, { expiresIn: '2h' });
  }

  export default { generateToken };