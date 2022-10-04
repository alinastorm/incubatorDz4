import { PostInputModel, PostViewModel } from '../types/types.js';
import DataService from '../services/data-service.js';
import dbMongoService from '../adapters/mongoDb-adapter.js';
import blogsWriteRepository from './blogs-write-repository.js';
import blogsReadRepository from './blogs-read-repository.js';


const dataService = new DataService(dbMongoService)


class Service {

    constructor(private collection: string) { }

    async readAll() {
        const result: PostViewModel[] = await dataService.readAll(this.collection)
        return result
    }
    async createOne(data: PostInputModel) {
        const { name } = await blogsReadRepository.readOne(data.blogId)
        const element: PostViewModel = {
            ...data,
            blogName: name,
            createdAt: new Date().toISOString()
        }
        const id: string = await dataService.createOne(this.collection, element)
        const result: PostViewModel = await dataService.readOne(this.collection, id)
        return result
    }
    async readOne(id: string) {
        const result: PostViewModel = await dataService.readOne(this.collection, id)
        return result
    }
    async updateOne(id: string, data: Partial<PostViewModel>) {
        const result = await dataService.updateOne(this.collection, id, data)
        return result
    }
    async replaceOne(id: string, data: PostViewModel) {
        const result = await dataService.replaceOne(this.collection, id, data)
        return result
    }
    async deleteOne(id: string) {
        const result = await dataService.deleteOne(this.collection, id)
        return result
    }
    async deleteAll() {
        const result = await dataService.deleteAll(this.collection)
        return result
    }
}
export default new Service('posts')