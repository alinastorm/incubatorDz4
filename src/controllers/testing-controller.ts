import { Request, Response } from 'express';
import blogsRepository from '../repository/blogs-write-repository.js';
import postsRepository from '../repository/posts-write-repository.js';
import { HTTP_STATUSES } from '../types/types.js';


class Controller {

    async deleteAll(req: Request, res: Response) {
        await postsRepository.deleteAll()
        await blogsRepository.deleteAll()
        res.status(HTTP_STATUSES.NO_CONTENT_204).send('All data is deleted')
    }
    
    
}
export default new Controller()