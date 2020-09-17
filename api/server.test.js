const supertest = require('supertest')
const server = require('./server')

const db = require('../data/connection')
const Food = require('../food/food-model')


describe('server', () => {
    describe('GET /', () => {
        it('should return HTTP status code 200', async () => {
            await supertest(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return JSON', async () => {
            await supertest(server).get('/')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
        })
        
    })
    describe('POST /food', () => {
        beforeEach(async () => {
            await db('food').truncate()
        })

        it('should return 201 when passed good data', async () => {
            await supertest(server)
            .post('/food')
            .send({name: "chicken"})
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should return 400 when passed bad data', async () => {
            await supertest(server)
            .post('/food')
            .send({name: ""})
            .then(res => {
                expect(res.status).toBe(400)
            })
        })
        it('should insert a food into the database', async () => {
            await supertest(server)
            .post('/food')
            .send({name: "hotdog"})
            .then(res => {
                expect(res.body.data.name).toBe('hotdog')      
        })
    })

    })
    describe('DELETE /food', () => {
        it('should return a status 200 when passed good data', async () => {
            const badFood = await db('food').first()

            return supertest(server)
            .delete(`/${badFood.id}/food`)
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should not find the item just deleted', async () => {
            const badFood = await db('food')
            expect(badFood).toHaveLength(0)
            })
        })
    
})