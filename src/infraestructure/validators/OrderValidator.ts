import { body, param } from "express-validator";
import { serverConstants as constants } from "../../config/constans";

export const orderRegister = [
    body('userDni').notEmpty().isString(),
    body('total').notEmpty().isFloat({ min: 0 }),
    body('status').notEmpty().isIn(constants.oderStatus),
    body('locationId').notEmpty().isInt(),
];

export const orderUpdate = [
    body('id').notEmpty().isString(),
    body('status').notEmpty().isIn(constants.oderStatus),
];

export const orderGet = [
    param('id').notEmpty().isString(),
];

export const orderGetByUserDni = [
    param('dni').notEmpty().isString(),
];

export const orderDelete = [
    param('id').notEmpty().isString(),
];