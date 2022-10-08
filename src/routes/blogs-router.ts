import { Express } from 'express';
import blogsController from "../controllers/blogs-controller";
import { nameBodyValidationMiddleware } from '../middlewares/name-validation-middleware';
import { youtubeUrlBodyValidationMiddleware } from '../middlewares/youtubeUrl-validation-middleware';
import { idParamValidationMiddleware } from '../middlewares/id-validation-middleware';
import { authorizationBasicMiddleware } from '../middlewares/authorization-validation-middleware';

import { checkValidationMiddleware } from '../middlewares/checkValidation-middleware';
import { searchNameTermQueryValidationMiddleware } from '../middlewares/searchNameTerm-validation-middleware';
import { pageNumberQueryValidationMiddleware } from '../middlewares/pageNumber-validation-middleware';
import { sortByBlogsQueryValidationMiddleware } from '../middlewares/sortByBlogs-validation-middleware';
import { pageSizeQueryValidationMiddleware } from '../middlewares/pageSize-validation-middleware';
import { sortDirectionQueryValidationMiddleware } from '../middlewares/sortDirection-validation-middleware';
import { blogIdParamUriValidationMiddleware } from '../middlewares/blogId-param-validation-middleware';
import { titleBodyValidationMiddleware } from '../middlewares/title-validation-middleware';
import { shortdescriptionBodyValidationMiddleware } from '../middlewares/shortdescription-validation-middleware';
import { contentBodyValidationMiddleware } from '../middlewares/content-validation-middleware';



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
    app.post(`/blogs/:blogId/posts`,
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