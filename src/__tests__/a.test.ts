// const request = require("supertest")
import request from "supertest"
import httpServerService from "../services/httpServer-service"
import DbMongo from "../adapters/mongoDb-adapter"
import Ajv from "ajv"
import { HTTP_STATUSES } from "../types/types"

const ajv = new Ajv({ strict: false })
function check(schema: any, body: any) {
    const validate = ajv.compile(schema)
    const validBody = validate(body)
    if (!validBody) console.log(validate.errors)
    return validBody
}
describe("/blogs", () => {
    beforeAll(() => {
        httpServerService.run()
    })
    afterAll(async () => {
        await DbMongo.disconnect()
        httpServerService.stop()
    })
    it('All delete', async () => {
        const { status } = await request(httpServerService.server).delete("/testing/all-data")
        expect(status).toBe(204)
    })
    it('GET Blogs []', async () => {

        const { status, body } = await request(httpServerService.server).get("/blogs")

        expect(status).toBe(200)
        console.log('body:', body);

        expect(body).toStrictEqual({
            "pagesCount": 0,
            "page": 1,
            "pageSize": 10,
            "totalCount": 0,
            "items": []
        })

    })
    it('GET Posts []', async () => {

        const { status, body } = await request(httpServerService.server).get("/posts")

        expect(status).toBe(200)
        expect(body).toStrictEqual({
            "pagesCount": 0,
            "page": 1,
            "pageSize": 10,
            "totalCount": 0,
            "items": []
        })

    })
    it('POST Blogs unauthorized', async () => {
        const { status, body } = await request(httpServerService.server)
            .post("/blogs")
            .send({
                "name": "string",
                "youtubeUrl": "https://someurl.com"
            })

        expect(status).toBe(401)
    })
    let post: any = null
    it('POST Blogs ', async () => {
        const { status, body } = await request(httpServerService.server)
            .post("/blogs")
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send({
                "name": "string",
                "youtubeUrl": "https://someurl.com"
            })
        const schema = {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "youtubeUrl": {
                    "type": "string"
                },
                "createdAt": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "name",
                "youtubeUrl",
                "createdAt"
            ]
        }

        expect(status).toBe(201)
        expect(check(schema, body)).toBe(true)
        post = body
    })
    it('GET Blogs', async () => {
        const schema = {
            "type": "object",
            "properties": {
                "pagesCount": {
                    "type": "integer"
                },
                "page": {
                    "type": "integer"
                },
                "pageSize": {
                    "type": "integer"
                },
                "totalCount": {
                    "type": "integer"
                },
                "items": {
                    "type": "array",
                    "items": [
                        {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string"
                                },
                                "name": {
                                    "type": "string"
                                },
                                "youtubeUrl": {
                                    "type": "string"
                                },
                                "createdAt": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "id",
                                "name",
                                "youtubeUrl",
                                "createdAt"
                            ]
                        }
                    ]
                }
            },
            "required": [
                "pagesCount",
                "page",
                "pageSize",
                "totalCount",
                "items"
            ]

        }
        const { status, body } = await request(httpServerService.server).get("/blogs")

        expect(status).toBe(200)
        expect(check(schema, body)).toBe(true)
        expect(body.items.length).toBe(1)
        expect(body.items[0]).toStrictEqual(post)
    })
    it('GET Posts', async () => {

        const { status, body } = await request(httpServerService.server).get("/posts").send({})
        const schema = {
            "type": "object",
            "properties": {
                "pagesCount": {
                    "type": "integer"
                },
                "page": {
                    "type": "integer"
                },
                "pageSize": {
                    "type": "integer"
                },
                "totalCount": {
                    "type": "integer"
                },
                "items": {
                    "type": "array",
                    "items": [
                        {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string"
                                },
                                "title": {
                                    "type": "string"
                                },
                                "shortDescription": {
                                    "type": "string"
                                },
                                "content": {
                                    "type": "string"
                                },
                                "blogId": {
                                    "type": "string"
                                },
                                "blogName": {
                                    "type": "string"
                                },
                                "createdAt": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "id",
                                "title",
                                "shortDescription",
                                "content",
                                "blogId",
                                "blogName",
                                "createdAt"
                            ]
                        }
                    ]
                }
            },
            "required": [
                "pagesCount",
                "page",
                "pageSize",
                "totalCount",
                "items"
            ]
        }
        expect(status).toBe(200)
        expect(check(schema, body)).toBe(true)
    })
    it('Wrong route', async () => {
        const { status } = await request(httpServerService.server).get("/wrong")
        expect(status).toBe(HTTP_STATUSES.NOT_FOUND_404)
    })
})