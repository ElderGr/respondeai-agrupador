import { getRepository } from "typeorm"
import Groups from "../entities/Groups"
import { calculeHaversine } from "../utils/calculeHaversine"

interface IRequestInterface {
    latitude: string; 
    longitude: string; 
}

class ListGroupService {
    public async execute({
        latitude,
        longitude,
    }: IRequestInterface): Promise<Groups[]> {
        const groupRepository = getRepository(Groups, process.env.NODE_ENV ? process.env.NODE_ENV : 'default')
        const groups = await groupRepository.find()

        const formatedLatitude = Number(latitude)
        const formatedLongitude = Number(longitude)

        if(typeof formatedLatitude !== 'number'){
            throw new Error('A latitude deve ser um número inteiro')
        }

        if(typeof formatedLongitude !== 'number'){
            throw new Error(`A longitude deve ser um número inteiro`)
        }

        const nearGroups = groups.filter(group => {
            if(calculeHaversine(
                Number(formatedLatitude), 
                Number(group.latitude), 
                Number(formatedLongitude), 
                Number(group.longitude)
            ) <= 1){
                return group
            }
        })
        return nearGroups
    }
}

export default ListGroupService