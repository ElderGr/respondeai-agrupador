import * as request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import app from '../../app';
import Groups from '../../entities/Groups';

let connection: Connection

describe('Integration test on create groups', () => {
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


    it('should be able to create a group', async () =>{
        const response = await request(app)
            .post('/groups')
            .send({
                name: "Banco santander 5",
                description: "Grupo para reunir Taboao",
                latitude: -23.6161434,
                longitude: -46.7560502,
                link: "https://chat.whatsapp.com/KQpJ7YryDjA3biZyXLp4lR"
            })
        
        expect(response.status).toBe(200)
    })
})