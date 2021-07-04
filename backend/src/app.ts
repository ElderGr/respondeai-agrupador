import * as express from 'express';
import * as cors from "cors";
import { errors } from "celebrate";
import routes from './routes';

class AppController {
    public express

    constructor() {
        this.express = express();
        
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(cors())
        this.express.use(errors())
    }

    routes() {
        this.express.use(routes)
    }
}

export default new AppController().express;