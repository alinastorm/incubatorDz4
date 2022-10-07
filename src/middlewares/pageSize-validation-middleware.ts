import { param, query } from 'express-validator';

export const pageSizeQueryValidationMiddleware = query('pageSize')
    .default(10)
    .custom((value: string) => {
        return +value;
    })
    .isNumeric()
    .exists()

    // .withMessage({ message: 'wrong id', field: "id", code: 400 })

