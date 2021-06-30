import { Router } from 'express';
import { getRepository } from 'typeorm';
import Groups from '../entities/Groups';
import { calculeHaversine } from '../utils/calculeHaversine';

const groupsRouter = Router();

groupsRouter.get('/', async (request, response) => {   
    const { latitude, longitude } = request.headers

    const groupRepository = getRepository(Groups)
    const groups = await groupRepository.find()
    
    const nearGroups = groups.filter(group => {
        if(calculeHaversine(
            Number(latitude), 
            Number(group.latitude), 
            Number(longitude), 
            Number(group.longitude)
        ) <= 1){
            return group
        }
    })

    return response.json(nearGroups)
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