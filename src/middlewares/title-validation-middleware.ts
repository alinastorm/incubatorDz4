import { body } from 'express-validator';

export const titleValidationMiddleware = body('title')
    .exists()
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .isLength({ max: 30 })
    // .withMessage({ message: 'wrong title', field: "title", code: 400 })
