import { Express } from 'express';
import postsController from "../controllers/posts-controller.js"
import { titleValidationMiddleware } from '../middlewares/title-validation-middleware.js';
import { idValidationMiddleware } from '../middlewares/id-validation-middleware.js';
import { contentValidationMiddleware } from '../middlewares/content-validation-middleware.js';
import { shortdescriptionValidationMiddleware } from '../middlewares/shortdescription-validation-middleware.js';
import { schemaPostsValidationMiddleware } from '../middlewares/schemaPosts-validation-middleware.js';
import { authorizationMiddleware } from '../middlewares/authorization-validation-middleware.js';
import { bodyPostsSanitizeValidationMiddleware } from '../middlewares/bodyPostsSanitize-validation-middleware.js';
import { blogIdValidationMiddleware } from '../middlewares/blogId-validation-middleware.js';
import { checkValidationMiddleware } from '../middlewares/checkValidation-middleware.js';

const mainRoute = 'posts'
export default function setRoutes(app: Express) {
    app.get(`/${mainRoute}`,
        postsController.readAll)

    app.post(`/${mainRoute}`,
        authorizationMiddleware,
        // bodyPostsSanitizeValidationMiddleware,
        // schemaPostsValidationMiddleware,
        titleValidationMiddleware,
        shortdescriptionValidationMiddleware,
        contentValidationMiddleware,
        blogIdValidationMiddleware,
        checkValidationMiddleware,
        postsController.createOne)

    app.get(`/${mainRoute}/:id`,
        idValidationMiddleware,
        checkValidationMiddleware,
        postsController.readOne)

    app.put(`/${mainRoute}/:id`,
        authorizationMiddleware,
        idValidationMiddleware,
        titleValidationMiddleware,
        shortdescriptionValidationMiddleware,
        contentValidationMiddleware,
        blogIdValidationMiddleware,
        checkValidationMiddleware,
        postsController.updateOne)

    app.delete(`/${mainRoute}/:id`,
        authorizationMiddleware,
        idValidationMiddleware,
        checkValidationMiddleware,
        postsController.deleteOne)
}


