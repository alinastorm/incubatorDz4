import { Request, Response } from 'express';
import blogsService from '../repository/blogs-write-repository.js';
import postsService from '../repository/posts-read-repository.js';
import { HTTP_STATUSES } from '../types/types.js';


class Controller {

    async deleteAll(req: Request, res: Response) {
        await postsService.deleteAll()
        await blogsService.deleteAll()
        res.status(HTTP_STATUSES.NO_CONTENT_204).send('All data is deleted')
    }
    
    
}
export default new Controller()