import { param, query } from 'express-validator';

export const pageSizeQueryValidationMiddleware = query('pageSize')
    .custom((value: string) => {
        return +value;
    })
    .isNumeric()
    .default(10)
    .exists()

    // .withMessage({ message: 'wrong id', field: "id", code: 400 })

