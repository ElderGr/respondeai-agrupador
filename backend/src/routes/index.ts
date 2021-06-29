import { Router } from "express";

import groupsRouter from "./groups.routes";

const routes = Router();

routes.use('/groups', groupsRouter);

export default routes;