import { body, query } from 'express-validator';

export const nameValidationMiddleware = body('name')
    .exists()
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .isLength({ max: 15 })
    // .withMessage({ message: 'wrong name', field: "name", code: 400 })
