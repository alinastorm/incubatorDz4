import { Request, Response, NextFunction } from 'express';
export interface BlogInputModel {
    name: string//    maxLength: 15
    youtubeUrl: string // maxLength: 100     pattern: ^ https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
}
export interface BlogPostInputModel {
    title: string//    maxLength: 30
    shortDescription: string//    maxLength: 100
    content: string//    maxLength: 1000
}
export interface PostInputModel {
    title: string//    maxLength: 30
    shortDescription: string//    maxLength: 100
    content: string//maxLength: 1000
    blogId: string
}
export interface BlogViewModel {
    id?: string
    name: string// max 15
    youtubeUrl: string
    createdAt: string
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
export interface Paginator<T> {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: T[]
}

// export interface GetBlogsQuery {
//     searchNameTerm: string
//     pageNumber: number
//     pageSize: number
//     sortBy: keyof BlogViewModel
//     sortDirection: 1 | -1
// }
// export interface PostBlogBody extends BlogInputModel {
// }
// export interface GetBlogsBlogIdParam {
//     blogId: string
// }
// export interface GetBlogsBlogIdQuery {
//     pageNumber: number
//     pageSize: number
//     sortBy: keyof PostViewModel
//     sortDirection: 1 | -1

// }


export interface AdapterType {
    connect(): any
    readAll(collectionName: string): any
    readAllOrByPropPaginationSort(collectionName: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: 1 | -1, searchNameTerm?: IObject): any
    readCount(collectionName: string): any
    readOne(collectionName: string, id: string): any
    createOne(collectionName: string, element: IObject): any
    updateOne(collectionName: string, id: string, data: IObject): any
    replaceOne(collectionName: string, id: string, data: IObject): any
    deleteOne(collectionName: string, id: string): any
    deleteAll(collectionName: string): any
}

export interface searchNameTerm {
    search: IObject
    strict: boolean
}
export enum HTTP_STATUSES {
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,
    BAD_REQUEST_400 = 400,
    NOT_FOUND_404 = 404,
    SERVER_ERROR_500 = 500
}
export type RequestWithParams<P> = Request<P>
export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>
export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithQueryBody<Q, B> = Request<{}, {}, B, Q>
export type RequestWithParamsQuery<P, Q> = Request<P, {}, {}, Q>
export type RequestWithParamsBody<P, B> = Request<P, {}, B>
export type RequestWithParamsQueryBody<P, Q, B> = Request<P, {}, B, Q>



export enum SortDirectionType {
    asc = 1,
    desc = -1,
}
export interface IObject { [key: string]: any }

export interface Dictionary {
    [key: string]: string
}