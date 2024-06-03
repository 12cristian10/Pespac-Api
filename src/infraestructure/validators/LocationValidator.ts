import { body, param } from "express-validator";

export const locationRegister = [
    body('country').notEmpty().isString(),
    body('city').notEmpty().isString(),
    body('department').notEmpty().isString(),
    body('neighborhood').notEmpty().isString(),
    body('address').notEmpty().isString(),
    body('latitude').optional().isFloat(),
    body('longitude').optional().isFloat(),
];

export const locationUpdate = [
    body('country').notEmpty().isString(),
    body('city').notEmpty().isString(),
    body('department').notEmpty().isString(),
    body('neighborhood').notEmpty().isString(),
    body('address').notEmpty().isString(),
    body('latitude').optional().isFloat(),
    body('longitude').optional().isFloat(),
];

export const locationGet = [
    param('id').notEmpty().isString(),
];

export const locationDelete = [
    param('id').notEmpty().isString(),
];