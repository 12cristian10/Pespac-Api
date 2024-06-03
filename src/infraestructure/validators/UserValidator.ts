import {body, param} from 'express-validator';
import { serverConstants as constants } from '../../config/constans';

export const userUpdate = [
    body('dni').notEmpty().isString(),
    body('dniType').notEmpty().isIn(constants.dniTypes),
    body('email').isEmail().optional(),
    body('password').optional().isString(),
    body('name').optional().isString(),
    body('lastName').optional().isString(),
    body('phone').optional().isString(),
];