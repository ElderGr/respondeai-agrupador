import { getRepository } from "typeorm"
import Groups from "../entities/Groups"

interface IRequestInterface {
    name: string; 
    description: string; 
    link: string; 
    latitude: number; 
    longitude: number; 
}

class CreateGroupService {
    public async execute({
        description,
        latitude,
        link,
        longitude,
        name,
    }: IRequestInterface): Promise<Groups> {
        const groupRepository = getRepository(Groups, process.env.NODE_ENV ? process.env.NODE_ENV : 'default')

        // if(isNaN(latitude)){
        //     throw new Error('A latitude deve ser um número inteiro')
        // }

        if(isNaN(longitude)){
            throw new Error(`A longitude deve ser um número inteiro`)
        }

        const group = groupRepository.create({
            name,
            description,
            link,
            latitude,
            longitude
        })
                
        await groupRepository.save(group)
                
        return group
    }
}

export default CreateGroupService