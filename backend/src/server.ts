import "reflect-metadata";

import * as express from 'express';
import routes from './routes';
import './database';

const app = express();

app.use(express.json())
app.use(routes)

app.listen(5000, () => {
    console.log('Server started on port 5000 🚀')
})