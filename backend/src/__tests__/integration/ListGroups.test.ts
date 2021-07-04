import * as request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import app from '../../app';
import Groups from '../../entities/Groups';

let connection: Connection

describe('Integration test on list groups', () => {
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


    it('should be able to list groups', async () =>{
        const response = await request(app)
            .get('/groups?lat=-23.6161434&lng=-46.7560502')
        
        expect(response.status).toBe(200)
    })
})