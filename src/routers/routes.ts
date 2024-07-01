import express = require('express');
import { listController } from '../controllers/listController';
const listControllerObj:listController = new listController();
const router = express.Router();
export class Router {
    public handle: any = () => {
        router.get('/status', (req, resp) => {
            resp.status(200)
                .json({
                    success: true,
                })
                .end();
            return;
        });

        router.post('/addItems',listControllerObj.addItem);
        router.post('/removeItems',listControllerObj.removeItem); 
        router.get('/getItems',listControllerObj.getItems);

        return router;
    };
}