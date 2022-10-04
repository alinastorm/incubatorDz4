
export interface BlogInputModel {
    name: string//    maxLength: 15
    youtubeUrl: string // maxLength: 100     pattern: ^ https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
}
export interface BlogViewModel {
    id?: string
    name: string
    youtubeUrl: string
    createdAt:string
}
export interface PostInputModel {
    title: string//    maxLength: 30
    shortDescription: string//    maxLength: 100
    content: string//    maxLength: 1000
    blogId: string
}
export interface PostViewModel {
    id?: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}
export interface APIErrorResult {
    errorsMessages: FieldError[]
}
export interface FieldError {
    message?: string | null// nullable: true,    Message with error explanation for certain field
    field?: string | null//    nullable: true,    What field / property of input model has error  
}

export interface AdapterType {
    connect():any
    readAll(collectionName: string): any
    readAllOrByNamePagination(collectionName: string, pageNumber: number, pageSize: number, searchNameTerm?: string, searchIdTerm?: string): any    
    readCount(collectionName: string):any
    readOne(collectionName: string, id: string): any
    createOne(collectionName: string, element: IObject): any
    updateOne(collectionName: string, id: string, data: IObject): any
    replaceOne(collectionName: string, id: string, data: IObject): any
    deleteOne(collectionName: string, id: string): any
    deleteAll(collectionName: string): any
}

export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,
    BAD_REQUEST_400 = 400,
    NOT_FOUND_404 = 404,
    SERVER_ERROR_500=500
}
export interface IObject { [key: string]: any }
