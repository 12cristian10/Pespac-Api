import { body, param } from "express-validator";

export const productRegister = [
    body('name').notEmpty().isString(),
    body('price').notEmpty().isFloat({ min: 0 }),
    body('stock').notEmpty().isInt({ min: 0 }),
    body('description').notEmpty().isString(),
    body('categoryId').notEmpty().isInt(),
];

export const productUpdate = [
    body('id').notEmpty().isInt(),
    body('name').notEmpty().isString(),
    body('price').notEmpty().isFloat({ min: 0 }),
    body('stock').notEmpty().isInt({ min: 0 }),
    body('description').notEmpty().isString(),
    body('categoryId').notEmpty().isInt(),
];

export const productGet = [
    param('id').notEmpty().isInt(),
];

export const productDelete = [
    param('id').notEmpty().isInt(),
];

export const uploadImage = [
    body('id').notEmpty().isInt(),
];

export const productGetByCategory = [
    param('categoryId').notEmpty().isInt(),
];

export const productGetByFisherman = [
    param('fishermanDni').notEmpty().isString(),
];

export const getProductsByNames = [
    param('name').notEmpty().isString(),
];

export const updateStock = [
    body('id').notEmpty().isInt(),
    body('stock').notEmpty().isInt({ min: 0 }),
];