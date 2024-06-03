import { body, param } from "express-validator";

export const categoryRegister = [
    body('name').notEmpty().isString(),
    body('description').notEmpty().isString(),
];

export const categoryUpdate = [
    body('name').notEmpty().isString(),
    body('description').optional().isString()
];

export const categoryGet = [
    param('id').notEmpty().isString(),
];

export const categoryDelete = [
    param('id').notEmpty().isString(),
];

