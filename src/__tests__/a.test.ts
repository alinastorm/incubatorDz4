// const request = require("supertest")
import request from "supertest"
import httpServerService from "../services/httpServer-service"


describe("/blogs", () => {
    it('should', async () => {
        await request(httpServerService.httpServer)
            .get("/blogs")
            .expect(200)
    })
})