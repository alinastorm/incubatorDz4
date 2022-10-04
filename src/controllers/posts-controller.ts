import { Request, Response } from 'express';
import blogsService from '../repository/blogs-write-repository.js';
import postsService from '../repository/posts-read-repository.js';
import { HTTP_STATUSES } from '../types/types.js';


class Controller {

    async readAll(req: Request, res: Response) {
        const result = await postsService.readAll()
        res.status(HTTP_STATUSES.OK_200).send(JSON.stringify(result))
    }
    async createOne(req: Request, res: Response) {
        const body = req.body   
        const result = await postsService.createOne(body)       
        res.status(HTTP_STATUSES.CREATED_201).send(result)
    }
    async readOne(req: Request, res: Response) {
        const id = req.params.id
        const result = await postsService.readOne(id)
        if (!result) {
            return res.status(HTTP_STATUSES.NOT_FOUND_404).send('Not Found')
        }
        res.status(HTTP_STATUSES.OK_200).send(result)
    }
    async updateOne(req: Request, res: Response) {
        const body = req.body
        const id = req.params.id
        const result = await postsService.readOne(id)
        if (!result) {
            return res.status(HTTP_STATUSES.NOT_FOUND_404).send('Not Found')
        }
        await postsService.updateOne(id, body)
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
    async replaceOne(req: Request, res: Response) {
        const body = req.body
        const id = req.params.id
        const result = await postsService.readOne(id)
        if (!result) {
            return res.status(HTTP_STATUSES.NOT_FOUND_404).send('Not Found')
        }
        await postsService.replaceOne(id, body)
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
    async deleteOne(req: Request, res: Response) {
        const body = req.body
        const id = req.params.id
        const result = await postsService.readOne(id)
        if (!result) {
            return res.status(HTTP_STATUSES.NOT_FOUND_404).send('Not Found')
        }
        await postsService.deleteOne(id)
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }
    async deleteAll(req: Request, res: Response) {
        await postsService.deleteAll()
        res.status(HTTP_STATUSES.NO_CONTENT_204).send(JSON.stringify('All data is deleted'))
    }
}
export default new Controller()