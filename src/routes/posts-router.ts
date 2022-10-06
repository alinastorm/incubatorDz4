import { Express } from 'express';
import postsController from "../controllers/posts-controller.js"
import { titleBodyValidationMiddleware } from '../middlewares/title-validation-middleware.js';
import { idParamValidationMiddleware } from '../middlewares/id-validation-middleware.js';
import { contentBodyValidationMiddleware } from '../middlewares/content-validation-middleware.js';
import { shortdescriptionBodyValidationMiddleware } from '../middlewares/shortdescription-validation-middleware.js';
import { schemaPostsValidationMiddleware } from '../middlewares/schemaPosts-validation-middleware.js';
import { authorizationBasicMiddleware } from '../middlewares/authorization-validation-middleware.js';
import { bodyPostsSanitizeValidationMiddleware } from '../middlewares/bodyPostsSanitize-validation-middleware.js';
import { checkValidationMiddleware } from '../middlewares/checkValidation-middleware.js';
import { pageNumberQueryValidationMiddleware } from '../middlewares/pageNumber-validation-middleware.js';
import { pageSizeQueryValidationMiddleware } from '../middlewares/pageSize-validation-middleware.js';
import { sortByBlogsQueryValidationMiddleware } from '../middlewares/sortByBlogs-validation-middleware.js';
import { sortByPostsQueryValidationMiddleware } from '../middlewares/sortByPosts-validation-middleware.js';
import { sortDirectionQueryValidationMiddleware } from '../middlewares/sortDirection-validation-middleware.js';
import { blogIdBodyValidationMiddleware } from '../middlewares/blogId-body-validation-middleware.js';

const mainRoute = 'posts'
export default function setRoutes(app: Express) {
    app.get(`/${mainRoute}`,
        pageNumberQueryValidationMiddleware,
        pageSizeQueryValidationMiddleware,
        sortByPostsQueryValidationMiddleware,
        sortDirectionQueryValidationMiddleware,
        checkValidationMiddleware,
        postsController.readAllPaginationSort)

    app.post(`/${mainRoute}`,
        authorizationBasicMiddleware,
        titleBodyValidationMiddleware,
        shortdescriptionBodyValidationMiddleware,
        contentBodyValidationMiddleware,
        blogIdBodyValidationMiddleware,
        checkValidationMiddleware,
        postsController.createOne)

    app.get(`/${mainRoute}/:id`,
        idParamValidationMiddleware,
        checkValidationMiddleware,
        postsController.readOne)

    app.put(`/${mainRoute}/:id`,
        authorizationBasicMiddleware,
        idParamValidationMiddleware,
        titleBodyValidationMiddleware,
        shortdescriptionBodyValidationMiddleware,
        contentBodyValidationMiddleware,
        blogIdBodyValidationMiddleware,
        checkValidationMiddleware,
        postsController.updateOne)

    app.delete(`/${mainRoute}/:id`,
        authorizationBasicMiddleware,
        idParamValidationMiddleware,
        checkValidationMiddleware,
        postsController.deleteOne)
}


