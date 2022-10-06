import { param, query } from 'express-validator';

export const sortByPostsQueryValidationMiddleware = query('sortBy')
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .isLength({ max: 16 })
    .isIn([
        'id',
        'title',
        'shortDescription',
        'content',
        'blogId',
        'blogName',
        'createdAt'
    ])
    .default("createdAt")
    .exists()

// .withMessage({ message: 'wrong id', field: "id", code: 400 })
