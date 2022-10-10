import { Express } from 'express';
import testingController from "../controllers/testing-controller"

export default function setRoutes(app: Express) {
    //Testing

    app.delete('/testing/all-data',
        testingController.deleteAll,
    )

    app.all("*", (req, res, next) => {
     
            console.log('req.method:', req.method);
            console.log('req.url:', req.url);
            console.log('req.params:', req.params);
            console.log('req.query:', req.query);
            console.log('req.body:', req.body);
            next();      
    })
}


