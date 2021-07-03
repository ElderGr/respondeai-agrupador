import "reflect-metadata";

import * as express from 'express';
import * as cors from "cors";
import routes from './routes';
import './database';
import { errors } from "celebrate";

const app = express();
app.use(express.json())
app.use(cors())
app.use(routes)
app.use(errors())

app.listen(5000, () => {
    console.log('Server started on port 5000 🚀')
})