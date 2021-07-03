import { Request, Response } from "express";

import ListGroupService from "../services/ListGroupService";
import CreateGroupService from "../services/CreateGroupService";

export default class GroupsController{
    public async index(request: Request, response: Response): Promise<Response>{
        const { lat, lng } = request.query
        try{
            const listGroupService = new ListGroupService()
            const groups = await listGroupService.execute({
                latitude: lat as string,
                longitude: lng as string,
            })
    
            return response.json(groups)
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
            const createGroupService = new CreateGroupService()

            const group = await createGroupService.execute({ 
                name,
                description,
                link,
                latitude,
                longitude
            })
                
            return response.json(group)
        }catch(err){
            return response.status(500).json(err)
        }
    }
}