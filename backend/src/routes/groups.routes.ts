import { Router } from 'express';
import { getRepository } from 'typeorm';
import Groups from '../entities/Groups';

const groupsRouter = Router();

groupsRouter.get('/', (request, response) => {
    return response.json({
        message: 'group endpoint'
    })
})

groupsRouter.post('/', async (request, response) => {
    const { 
        name, 
        description, 
        link, 
        latitude, 
        longitude 
    } = request.body
    
    const groupRepository = getRepository(Groups)

    const group = groupRepository.create({
        description,
        name,
        latitude,
        longitude,
        link
    })

    await groupRepository.save(group)

    return response.json(group)
})

export default groupsRouter