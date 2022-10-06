import { param, query } from 'express-validator';
import { SortDirectionType } from '../types/types';

export const sortDirectionQueryValidationMiddleware = query('sortDirection')
    .isString()
    .isLength({ max: 4 })
    .custom((direction: string) => {
        if (direction === "asc") return SortDirectionType.asc
        if (direction === "desc") return SortDirectionType.desc
    })
    .isIn([
        SortDirectionType.asc,
        SortDirectionType.desc,
    ])
    .default("desc")
    .exists()

// .withMessage({ message: 'wrong id', field: "id", code: 400 })
