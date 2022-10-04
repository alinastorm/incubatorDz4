
import dbMongoService from "./adapters/mongoDb-adapter.js";
import httpService from "./services/httpServer-service.js"

const service = await import ("./services/httpServer-service.js");


(async function () {
    await dbMongoService.connect()
    httpService.run()
})()