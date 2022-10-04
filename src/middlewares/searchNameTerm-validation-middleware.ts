import { query } from 'express-validator';

export const searchNameTermValidationMiddleware = query('searchNameTerm')
    .exists()
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .isLength({ max: 30 })
    .optional()
    
    // .withMessage({ message: 'wrong title', field: "title", code: 400 })
