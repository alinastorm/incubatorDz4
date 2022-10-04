import { Express } from 'express';

import blogsController from "../controllers/blogs-controller.js"
import { nameValidationMiddleware } from '../middlewares/name-validation-middleware.js';
import { youtubeUrlValidationMiddleware } from '../middlewares/youtubeUrl-validation-middleware.js';
import { idValidationMiddleware } from '../middlewares/id-validation-middleware.js';
import { authorizationMiddleware } from '../middlewares/authorization-validation-middleware.js';
import { oneOf } from 'express-validator';
import { checkValidationMiddleware } from '../middlewares/checkValidation-middleware.js';


const mainRoute = 'blogs'
export default function setRoutes(app: Express) {
    app.get(`/${mainRoute}`,
        blogsController.readAll)

    app.post(`/${mainRoute}`,
        authorizationMiddleware,
        nameValidationMiddleware,
        youtubeUrlValidationMiddleware,
        // oneOf([
        //     nameValidationMiddleware,
        //     youtubeUrlValidationMiddleware,
        // ]),
        checkValidationMiddleware,
        blogsController.createOne)

    app.get(`/${mainRoute}/:id`,
        idValidationMiddleware,
        checkValidationMiddleware,
        blogsController.readOne)

    app.put(`/${mainRoute}/:id`,
        authorizationMiddleware,
        idValidationMiddleware,
        nameValidationMiddleware,
        youtubeUrlValidationMiddleware,
        checkValidationMiddleware,
        blogsController.updateOne)

    app.delete(`/${mainRoute}/:id`,
        authorizationMiddleware,
        idValidationMiddleware,
        checkValidationMiddleware,
        blogsController.deleteOne)
}


