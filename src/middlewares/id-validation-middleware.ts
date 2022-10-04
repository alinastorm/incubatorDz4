import { param } from 'express-validator';

export const idValidationMiddleware = param('id')
    .exists()
    .isLength({ max: "6339ea2f3c36ccbfa13f5665".length })

    // .isNumeric()
    // .withMessage({ message: 'wrong id', field: "id", code: 400 })

