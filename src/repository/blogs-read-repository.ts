import { BlogInputModel, BlogViewModel } from '../types/types.js';
import DataService from '../services/data-service.js';
import mongoDbAdapter from '../adapters/mongoDb-adapter.js';

const dataService = new DataService(mongoDbAdapter)


class Service {

    constructor(private collection: string) { }

    async readAll() {
        const result: BlogViewModel[] = await dataService.readAll(this.collection)
        return result
    }

    async readOne(id: string) {
        const result: BlogViewModel = await dataService.readOne(this.collection, id)
        return result
    }
}
export default new Service('blogs')