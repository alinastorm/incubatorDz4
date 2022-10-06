import { param } from 'express-validator';

export const bloggeridParamValidationMiddleware = param('bloggerId')
    .exists()
    .isLength({ max: "1664548877572".length })

    // .isNumeric()
    // .withMessage({ message: 'wrong id', field: "id", code: 400 })

