import { createConnection } from 'typeorm'
import ListGroupService from '../../services/ListGroupService'
import CreateGroupService from '../../services/CreateGroupService'

describe('List groups', () =>{
    beforeAll(async () => {
        await createConnection({
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

    it('it should be able to list groups in a radius of 1km', async () => {
      const listGroupService = new ListGroupService()
      const createGroupService = new CreateGroupService()
    
        const groupValid = await createGroupService.execute({
            name: 'Grupo dentro da area',
            description: 'Grupo de teste',
            latitude: -23.61599125460947,
            longitude: -46.75458229369384,
            link: 'https://whatsapplink.com',
        })

        await createGroupService.execute({
            name: 'Grupo fora da area',
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
                name: 'Grupo dentro da area',
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

    it('it not should be able to create an group with a invalid longitude value', async () => {
        const listGroupService = new ListGroupService()
        const createGroupService = new CreateGroupService()
        let error
        
        try{
            await createGroupService.execute({
                name: 'Grupo dentro da area',
                description: 'Grupo de teste',
                latitude: -23.61599125460947,
                longitude: -46.75458229369384,
                link: 'https://whatsapplink.com',
            })

            await listGroupService.execute({
                latitude: -23.61599125460947,
                longitude: NaN
            })
        }catch(err){
            error = err 
        }

        expect(error).toBeInstanceOf(Error);
    })
})
