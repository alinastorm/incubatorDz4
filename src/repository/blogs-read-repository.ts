import { BlogInputModel, BlogViewModel, IObject, Paginator, searchNameTerm, SortDirectionType } from '../types/types.js';
import DataService from '../services/data-service.js';
import mongoDbAdapter from '../adapters/mongoDb-adapter.js';

const dataService = new DataService(mongoDbAdapter)


class Service {

    constructor(private collection: string) { }

    async readAll() {
        const result: BlogViewModel[] = await dataService.readAll(this.collection)
        return result
    }
    async readAllByNameWithPaginationAndSort(pageNumber: number, pageSize: number, sortBy: keyof BlogViewModel, sortDirection: 1 | -1, searchNameTerm: string) {
        let result: Paginator<BlogViewModel>
        searchNameTerm ?
            result = await dataService.readAllOrByPropPaginationSort(this.collection, pageNumber, pageSize, sortBy, sortDirection, { search: { name: searchNameTerm }, strict: false }) :
            result = await dataService.readAllOrByPropPaginationSort(this.collection, pageNumber, pageSize, sortBy, sortDirection)
        return result

    }

    async readOne(id: string) {
        const result: BlogViewModel = await dataService.readOne(this.collection, id)
        return result
    }
}
export default new Service('blogs')