import { IObject, Paginator, PostInputModel, PostViewModel, searchNameTerm } from '../types/types.js';
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
    async readAllWithPaginationAndSort(pageNumber: number, pageSize: number, sortBy: keyof PostViewModel, sortDirection: 1 | -1) {
        const result: Paginator<PostViewModel> = await dataService.readAllOrByPropPaginationSort(
            this.collection,
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        )
        return result
    }
    async readAllPostsByBlogIdWithPaginationAndSort(pageNumber: number, pageSize: number, sortBy: keyof PostViewModel, sortDirection: 1 | -1, blogId: string) {
        const result: Paginator<PostViewModel> = await dataService.readAllOrByPropPaginationSort(
            this.collection,
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            { search: { blogId }, strict: true }
        )
        return result
    }
    async readOne(id: string) {
        const result: PostViewModel = await dataService.readOne(this.collection, id)
        return result
    }
}
export default new Service('posts')