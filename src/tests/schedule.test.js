// 
const request = require('supertest');
const app = require('../src/app');

describe('Schedule API', () => {
    it('should create a new schedule', async () => {
        const res = await request(app)
            .post('/api/schedules')
            .send({
                title: 'Test Schedule',
                date: new Date(),
                description: 'This is a test schedule',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('title', 'Test Schedule');
    });

    it('should get all schedules', async () => {
        const res = await request(app).get('/api/schedules');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
