import { param, query } from 'express-validator';

export const pageNumberValidationMiddleware = query('pageNumber')
    .exists()
    .custom((value: string) => {
        return +value;
    })
    .isNumeric()
    .optional()

    // .withMessage({ message: 'wrong id', field: "id", code: 400 })

