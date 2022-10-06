import { body, param } from 'express-validator';
import blogsReadService from '../repository/blogs-read-repository.js';


export const blogIdBodyValidationMiddleware = body('blogId')
    .exists()
    .notEmpty({ ignore_whitespace: true })
    .isString()
    .isLength({ max: 15 })
    // .custom(async (val, { req }) => {
    //     const blog = await blogsReadService.readOne(val)
    //     if (!blog) throw Error('bloger not found')
    //     req.body.blogName = blog.name
    // })
    // .withMessage({ message: 'wrong content', field: "content", code: 400 })
