import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Groups from "../entities/Groups";
import { calculeHaversine } from "../utils/calculeHaversine";

export default class GroupsController{
    public async index(request: Request, response: Response): Promise<Response>{
        const { latitude, longitude } = request.headers
        try{
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
        }catch(err){
            return response.status(500).json(err)
        }
    }

    public async create(request: Request, response: Response): Promise<Response>{
        const { 
            name, 
            description, 
            link, 
            latitude, 
            longitude 
        } = request.body
        
        try{
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
        }catch(err){
            return response.status(500).json(err)
        }
    }
}