import {body} from 'express-validator';
import { serverConstants as constants } from '../../config/constans';

export const registerValidator = [
    body('dni').notEmpty().isString(),
    body('dniType').notEmpty().isIn(constants.dniTypes),
    body('email').isEmail().notEmpty(),
    body('password').notEmpty().isString(),
    body('name').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('role').notEmpty().isIn(constants.roles),
    body('phone').notEmpty().isString(),
];

export const loginValidator =  [
    body('email','Enter a valid E-mail').isEmail().notEmpty(),
    body('password','Enter a valid password').notEmpty().isString(),
];