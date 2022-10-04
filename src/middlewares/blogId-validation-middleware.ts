import { body } from 'express-validator';
import blogsReadService from '../repository/blogs-read-repository.js';


export const blogIdValidationMiddleware = body('blogId')
    .custom(async (val, { req }) => {
        const blog = await blogsReadService.readOne(val)
        if (!blog) throw Error('bloger not finded')
        req.body.blogName = blog.name
    })
    .exists()
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .isLength({ max: 1000 })
    // .withMessage({ message: 'wrong content', field: "content", code: 400 })
