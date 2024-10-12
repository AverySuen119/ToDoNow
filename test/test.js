const request = require('supertest');
const express = require('express');
const app = require('../src/app'); // 你可以根据实际情况调整路径

describe('Personal Schedule Planner API', () => {
    it('should return a list of schedules', async () => {
        const res = await request(app).get('/api/schedules');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new schedule', async () => {
        const newSchedule = {
            title: 'Test Schedule',
            tasks: [
                { time: '2024-10-14T10:00:00Z', task: 'Test Task 1', completed: false },
                { time: '2024-10-15T10:00:00Z', task: 'Test Task 2', completed: false }
            ],
            backgroundImage: 'url/to/image.jpg',
        };

        const res = await request(app).post('/api/schedules').send(newSchedule);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toEqual('Test Schedule');
    });
});
