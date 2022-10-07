import express from 'express';
import bodyParser from 'body-parser';
import blogsRouting from '../routes/blogs-router';
import postsRouting from '../routes/posts-router';
import testingRouting from '../routes/testing-router';
import * as core from 'express-serve-static-core';
import * as http from 'http';



class HttpService {
    app: core.Express = express()
    server!: http.Server
    port: number | string = process.env.PORT || 9000
    run() {
        this.app.use(bodyParser.json())
        testingRouting(this.app)
        blogsRouting(this.app)
        postsRouting(this.app)
        //starting server
        this.server = this.app.listen(this.port, () => console.log(`http://localhost:${this.port}`))
    }
    stop() {
        this.server.close()
    }
}

export default new HttpService()