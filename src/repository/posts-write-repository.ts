import { PostInputModel, PostViewModel } from '../types/types';
import DataService from '../services/data-service';
import dbMongoService from '../adapters/mongoDb-adapter';
import blogsWriteRepository from './blogs-write-repository';
import blogsReadRepository from './blogs-read-repository';


const dataService = new DataService(dbMongoService)


class Service {

    constructor(private collection: string) { }


    async createOne(data: PostInputModel & { blogName: string }) {

        // const { name } = await blogsReadRepository.readOne(data.blogId)
        const element: PostViewModel = {
            ...data,
            createdAt: new Date().toISOString()
        }
        const id: string = await dataService.createOne(this.collection, element)
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

const Expected = { "pagesCount": 2, "page": 1, "pageSize": 10, "totalCount": 12, "items": [{ "id": "63442ab6513ea5379953ef0f", "title": "1909post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:46.302Z" }, { "id": "63442ab5513ea5379953ef0e", "title": "1908post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:45.974Z" }, { "id": "63442ab5513ea5379953ef0d", "title": "1907post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:45.377Z" }, { "id": "63442ab5513ea5379953ef0c", "title": "1906post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:45.034Z" }, { "id": "63442ab4513ea5379953ef0b", "title": "1905post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:44.704Z" }, { "id": "63442ab4513ea5379953ef0a", "title": "1904post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:44.380Z" }, { "id": "63442ab4513ea5379953ef09", "title": "1903post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:44.054Z" }, { "id": "63442ab3513ea5379953ef08", "title": "1902post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:43.717Z" }, { "id": "63442ab3513ea5379953ef07", "title": "1901post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:43.335Z" }, { "id": "63442ab3513ea5379953ef06", "title": "1900post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:43.014Z" }] }

const Received = { "pagesCount": 2, "page": 1, "pageSize": 10, "totalCount": 13, "items": [
    { "id": "63442ab6513ea5379953ef0f", "title": "1909post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:46.302Z" },
     { "id": "63442ab5513ea5379953ef0e", "title": "1908post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:45.974Z" },
      { "id": "63442ab5513ea5379953ef0d", "title": "1907post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:45.377Z" },
       { "id": "63442ab5513ea5379953ef0c", "title": "1906post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:45.034Z" },
        { "id": "63442ab4513ea5379953ef0b", "title": "1905post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:44.704Z" },
         { "id": "63442ab4513ea5379953ef0a", "title": "1904post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:44.380Z" },
          { "id": "63442ab4513ea5379953ef09", "title": "1903post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:44.054Z" },
           { "id": "63442ab3513ea5379953ef08", "title": "1902post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:43.717Z" },
            { "id": "63442ab3513ea5379953ef07", "title": "1901post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:43.335Z" },
             { "id": "63442ab3513ea5379953ef06", "title": "1900post title", "shortDescription": "description", "content": "new post content", "blogId": "63442ab1513ea5379953ef03", "blogName": "new blog", "createdAt": "2022-10-10T14:22:43.014Z" }] }
