import {body, param} from 'express-validator';

export const fishermanRegister = [
    body('dni').notEmpty().isString(),
    body('score').optional().isFloat({min: 0, max: 5}),
    body('locationId').optional().isInt(),
];

export const fishermanUpdate = [
    body('dni').notEmpty().isString(),
    body('score').notEmpty().isFloat({min: 0, max: 5}),
    body('locationId').optional().isInt(),
];

export const fishermanGet = [
    param('dni').notEmpty().isString(),
];