import { getRepository } from "typeorm"
import Groups from "../entities/Groups"
import { calculeHaversine } from "../utils/calculeHaversine"

interface IRequestInterface {
    latitude: number; 
    longitude: number; 
}

class ListGroupService {
    public async execute({
        latitude,
        longitude,
    }: IRequestInterface): Promise<Groups[]> {
        const groupRepository = getRepository(Groups, process.env.NODE_ENV ? process.env.NODE_ENV : 'default')
        const groups = await groupRepository.find()

        if(isNaN(latitude)){
            throw new Error('A latitude deve ser um número inteiro')
        }

        if(isNaN(longitude)){
            throw new Error(`A longitude deve ser um número inteiro`)
        }

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
        return nearGroups
    }
}

export default ListGroupService