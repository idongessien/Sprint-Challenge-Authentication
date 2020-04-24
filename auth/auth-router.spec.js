const Auth = require('./auth-model.js');
const db = require('../database/dbConfig.js');
const server = require('../api/server');
const request = require('supertest');

describe('Auth', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    it('should set the environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    });

    describe('add()', () => {
        it('should add user to db', async () => {
            await Auth.add({ username: "Idong", password: 'password' });
            let user = await db('users');
            expect(user).toHaveLength(1);
        })
    })
})

describe('POST login /', () => {
    it('returns 401 OK with invalid credentials', () => {
        return (
            request(server)
                .post('/api/auth/login')
                .send({username: "user", password: 'password'})
                .expect(401)
        )
    })
})