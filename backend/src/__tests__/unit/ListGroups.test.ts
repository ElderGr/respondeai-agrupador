import { createConnection, Connection } from 'typeorm'
import ListGroupService from '../../services/ListGroupService'
import CreateGroupService from '../../services/CreateGroupService'
import Groups from '../../entities/Groups'

let connection: Connection

describe('List groups', () =>{
    beforeAll(async () => {
        connection = await createConnection({
            name: 'test',
            type: 'sqlite',
            database: './src/__tests__/database.sqlite',
            entities:[
                "./src/entities/*.ts"
            ],
            migrations:[
                "./src/database/migrations/*.ts"
            ],
            cli: {
                "migrationsDir": "./src/database/migrations"
            }
        })
    })

    beforeEach(async () => {
        await connection.createQueryBuilder().delete().from(Groups).execute()
    })

    it('it should be able to list groups in a radius of 1km', async () => {
      const listGroupService = new ListGroupService()
      const createGroupService = new CreateGroupService()
    
        const groupValid = await createGroupService.execute({
            name: 'Grupo dentro da area 1',
            description: 'Grupo de teste',
            latitude: -23.61599125460947,
            longitude: -46.75458229369384,
            link: 'https://whatsapplink.com',
        })

        await createGroupService.execute({
            name: 'Grupo fora da area 2',
            description: 'Grupo de teste',
            latitude: -23.604051804020823,
            longitude: -46.763256557433955, 
            link: 'https://whatsapplink.com',
        })
         
        const groups = await listGroupService.execute({
            latitude: -23.616178030292478,
            longitude: -46.75604141534262
        })

        expect(groups).toEqual([groupValid])
    })

    it('it not should be able to list groups with a invalid latitude value', async () => {
        const listGroupService = new ListGroupService()
        const createGroupService = new CreateGroupService()
        let error

        try{
            await createGroupService.execute({
                name: 'Grupo dentro da area 3',
                description: 'Grupo de teste',
                latitude: -23.61599125460947,
                longitude: -46.75458229369384,
                link: 'https://whatsapplink.com',
            })

            await listGroupService.execute({
                latitude: NaN,
                longitude: -46.75604141534262
            })
        }catch(err){
            error = err 
        }
        expect(error).toBeInstanceOf(Error);
    })
})
