
import dbMongoService from "./adapters/mongoDb-adapter";
import httpService from "./services/httpServer-service"

const service = await import ("./services/httpServer-service");


(async function () {
    await dbMongoService.connect()
    httpService.run()
})()