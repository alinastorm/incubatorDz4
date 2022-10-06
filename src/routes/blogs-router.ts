import { Express } from 'express';
import blogsController from "../controllers/blogs-controller.js"
import { nameBodyValidationMiddleware } from '../middlewares/name-validation-middleware.js';
import { youtubeUrlBodyValidationMiddleware } from '../middlewares/youtubeUrl-validation-middleware.js';
import { idParamValidationMiddleware } from '../middlewares/id-validation-middleware.js';
import { authorizationBasicMiddleware } from '../middlewares/authorization-validation-middleware.js';

import { checkValidationMiddleware } from '../middlewares/checkValidation-middleware.js';
import { searchNameTermQueryValidationMiddleware } from '../middlewares/searchNameTerm-validation-middleware.js';
import { pageNumberQueryValidationMiddleware } from '../middlewares/pageNumber-validation-middleware.js';
import { sortByBlogsQueryValidationMiddleware } from '../middlewares/sortByBlogs-validation-middleware.js';
import { pageSizeQueryValidationMiddleware } from '../middlewares/pageSize-validation-middleware.js';
import { sortDirectionQueryValidationMiddleware } from '../middlewares/sortDirection-validation-middleware.js';
import { blogIdParamUriValidationMiddleware } from '../middlewares/blogId-param-validation-middleware.js';
import { titleBodyValidationMiddleware } from '../middlewares/title-validation-middleware.js';
import { shortdescriptionBodyValidationMiddleware } from '../middlewares/shortdescription-validation-middleware.js';
import { contentBodyValidationMiddleware } from '../middlewares/content-validation-middleware.js';



export default function setRoutes(app: Express) {

    app.get(`/blogs`,
        searchNameTermQueryValidationMiddleware,
        pageNumberQueryValidationMiddleware,
        pageSizeQueryValidationMiddleware,
        sortByBlogsQueryValidationMiddleware,
        sortDirectionQueryValidationMiddleware,
        blogsController.readAllOrByNamePaginationSort)

    app.post(`/blogs`,
        authorizationBasicMiddleware,
        nameBodyValidationMiddleware,
        youtubeUrlBodyValidationMiddleware,
        checkValidationMiddleware,
        blogsController.createOne)

    app.get(`/blogs/:id/posts`,
        blogIdParamUriValidationMiddleware,
        pageNumberQueryValidationMiddleware,
        pageSizeQueryValidationMiddleware,
        sortByBlogsQueryValidationMiddleware,
        sortDirectionQueryValidationMiddleware,
        checkValidationMiddleware,
        blogsController.readAllPostsByBlogIdWithPaginationAndSort)
    app.post(`/blogs/:id/posts`,
        authorizationBasicMiddleware,
        blogIdParamUriValidationMiddleware,
        titleBodyValidationMiddleware,
        shortdescriptionBodyValidationMiddleware,
        contentBodyValidationMiddleware,
        checkValidationMiddleware,
        blogsController.createPostsByBlogId)

    app.get(`/blogs/:id`,
        idParamValidationMiddleware,
        checkValidationMiddleware,
        blogsController.readOne)

    app.put(`/blogs/:id`,
        authorizationBasicMiddleware,
        idParamValidationMiddleware,
        nameBodyValidationMiddleware,
        youtubeUrlBodyValidationMiddleware,
        checkValidationMiddleware,
        blogsController.updateOne)

    app.delete(`/blogs/:id`,
        authorizationBasicMiddleware,
        idParamValidationMiddleware,
        checkValidationMiddleware,
        blogsController.deleteOne)
}


   // oneOf([
        //     nameBodyValidationMiddleware,
        //     youtubeUrlBodyValidationMiddleware,
        // ]),