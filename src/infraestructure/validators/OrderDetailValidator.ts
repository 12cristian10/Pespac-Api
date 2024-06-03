import {body, param} from 'express-validator';

export const createOrderDetailValidator = [
    body('orderId').isString(),
    body('productId').isNumeric(),
    body('quantity').isNumeric(),
    body('total').isNumeric(),
];

export const updateOrderDetailValidator = [
    param('id').isNumeric(),
    body('orderId').isString(),
    body('productId').isNumeric(),
    body('quantity').isNumeric(),
    body('total').isNumeric(),
];

export const getOrderDetailByProductValidator = [
    param('id').isNumeric().withMessage('id must be a number'),
];

export const getOrderDetailByOrderValidator = [
    param('id').isString().withMessage('id must be a string'),
];

