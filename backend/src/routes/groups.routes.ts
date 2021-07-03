import { Router } from 'express';
import GroupsController from '../controllers/GroupsController';
import { celebrate, Segments, Joi } from "celebrate";

const groupsRouter = Router();
const groupsController = new GroupsController()

groupsRouter.get(
    '/',
    celebrate({
        [Segments.HEADERS]: {
            latitude: Joi.string().required(),
            longitude: Joi.string().required()
        }
    }), 
    groupsController.index)

groupsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string().required(),  
            link: Joi.string().required(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
        }
    }), 
    groupsController.create)

export default groupsRouter