import * as bcrypt from 'bcrypt';
import { serverConstants as constants } from '../../config/constans';

async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, constants.jwt.saltSize);
  }

  async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

export default { hashPassword, validatePassword };

