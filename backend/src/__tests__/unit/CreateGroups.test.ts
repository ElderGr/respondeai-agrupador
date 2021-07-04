import { Connection, createConnection } from 'typeorm'
import Groups from '../../entities/Groups'
import CreateGroupService from '../../services/CreateGroupService'

let connection: Connection

describe('Create groups', () =>{
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


    it('it should be able to Create a group', async () => {
        const createGroupService = new CreateGroupService()
        const group = await createGroupService.execute({
            name: 'Banco santander',
            description: 'Grupo para reunir Taboao',
            latitude: -23.606338608847814,
            longitude: -46.75383326848495,
            link: 'https://whatsapplink.com',
        })

        expect(group).toHaveProperty('id');
    })

    it('it not should be able to create an group with a invalid latitude value', async () => {
        const createGroupService = new CreateGroupService()
        let error
        try{
            await createGroupService.execute({
                name: 'Banco santander',
                description: 'Grupo para reunir Taboao',
                latitude: NaN,
                longitude: -46.75383326848495,
                link: 'https://whatsapplink.com',
            })
        }catch(err){
            error = err
        }
        
        expect(error).toBeInstanceOf(Error);
    })

    it('it not should be able to create an group with a invalid longitude value', async () => {
        const createGroupService = new CreateGroupService()
        let error
        try{
            await createGroupService.execute({
                name: 'Banco santander',
                description: 'Grupo para reunir Taboao',
                latitude: -23.6161434,
                longitude: NaN,
                link: 'https://whatsapplink.com',
            })
        }catch(err){
            error = err
        }

        expect(error).toBeInstanceOf(Error);
    })
})
