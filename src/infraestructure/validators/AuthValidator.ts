import {body} from 'express-validator';
import { serverConstants as constants } from '../../config/constans';

export const registerValidator = [
    body('dni').notEmpty(),
    body('dniType').notEmpty().isIn(['CC','CE','RC','PAS']),
    body('email').isEmail().notEmpty(),
    body('password').notEmpty(),
    body('name').notEmpty(),
    body('lastName').notEmpty(),
    body('role').notEmpty().isIn(constants.roles),
    body('phone').notEmpty(),
];

export const loginValidator =  [
    body('email','Enter a valid E-mail').isEmail().notEmpty(),
    body('password','Enter a valid password').notEmpty(),
];