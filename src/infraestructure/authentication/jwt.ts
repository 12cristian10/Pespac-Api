import jwt from 'jsonwebtoken';
import { serverConstants as constans } from '../../config/constans';
import e from 'express';
async function generateToken(email: string, password: string, role: string) {
    return jwt.sign({ email, password, role }, constans.jwt.secret as string,{ expiresIn: '2h' });
}

export default generateToken;