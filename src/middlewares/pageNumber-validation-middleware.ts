import { param, query } from 'express-validator';

export const pageNumberQueryValidationMiddleware = query('pageNumber')
    .custom((value: string) => {
        return +value;
    })
    .isNumeric()
    .default(1)
    .exists()


    // .withMessage({ message: 'wrong id', field: "id", code: 400 })

