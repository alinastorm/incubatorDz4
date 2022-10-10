import { Express } from 'express';
import postsController from "../controllers/posts-controller"
import { titleBodyValidationMiddleware } from '../middlewares/title-validation-middleware';
import { idParamValidationMiddleware } from '../middlewares/id-validation-middleware';
import { contentBodyValidationMiddleware } from '../middlewares/content-validation-middleware';
import { shortdescriptionBodyValidationMiddleware } from '../middlewares/shortdescription-validation-middleware';
import { schemaPostsValidationMiddleware } from '../middlewares/schemaPosts-validation-middleware';
import { authorizationBasicMiddleware } from '../middlewares/authorization-validation-middleware';
import { bodyPostsSanitizeValidationMiddleware } from '../middlewares/bodyPostsSanitize-validation-middleware';
import { checkValidationMiddleware } from '../middlewares/checkValidation-middleware';
import { pageNumberQueryValidationMiddleware } from '../middlewares/pageNumber-validation-middleware';
import { pageSizeQueryValidationMiddleware } from '../middlewares/pageSize-validation-middleware';
import { sortByBlogsQueryValidationMiddleware } from '../middlewares/sortByBlogs-validation-middleware';
import { sortByPostsQueryValidationMiddleware } from '../middlewares/sortByPosts-validation-middleware';
import { sortDirectionQueryValidationMiddleware } from '../middlewares/sortDirection-validation-middleware';
import { bloggerBodyIdInBDValidationMiddleware } from '../middlewares/bloggerIdInBDBody-validation-middleware';
import { blogIdBodyValidationMiddleware } from '../middlewares/blogId-body-validation-middleware';

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
        bloggerBodyIdInBDValidationMiddleware,
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
        bloggerBodyIdInBDValidationMiddleware,
        checkValidationMiddleware,
        postsController.updateOne)

    app.delete(`/${mainRoute}/:id`,
        authorizationBasicMiddleware,
        idParamValidationMiddleware,
        checkValidationMiddleware,
        postsController.deleteOne)
}


