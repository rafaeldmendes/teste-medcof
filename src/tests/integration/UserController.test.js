
import 'dotenv/config'


import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken'

import users from '../../core/adapters/routes/users.js';
jest.mock('../../core/adapters/controllers/UsersController.js');
jest.mock('../../core/adapters/middlewares/verifyToken.js');

describe('POST /', () => {
    let app;
    let db;
    let mockUser = {
        "name": "Rafael",
        "username": "rafa12345",
        "password": "batata123"
    }

    beforeEach(() => {
        db = jest.fn().mockImplementation(() => {
            return {
                where: jest.fn().mockReturnValue([{ id: 1 }]),
                insert: jest.fn().mockImplementation(() => {
                    return { returning: jest.fn().mockReturnValue([{ id: 1 }]) }
                })
            }
        });
        app = express();
        app.use(express.json());
        app.use('/users', users(express.Router, db));
    });

    it('should create a new user', async () => {
        const token = jwt.sign({ userId: 1, root: true }, process.env.JWT_SECRET || new Date().toString(), { expiresIn: '1h' })
        
        const mockResult = {
            code: 200,
            status: 'success',
            data: { username: 'rafa12345', id: 1 }
        }


        const res = await request(app).post('/users').send(mockUser).set('Authorization', token)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(mockResult)
    });

    it('should return forbidden error', async () => {
        const token = jwt.sign({ userId: 1, root: false }, process.env.JWT_SECRET || new Date().toString(), { expiresIn: '1h' })

        const mockResult = { error: 'Access denied' }

        const res = await request(app).post('/users').send(mockUser).set('Authorization', token)

        expect(res.statusCode).toEqual(403)
        expect(res.body).toEqual(mockResult)
    });

    it('should return error - password is required', async () => {
        const token = jwt.sign({ userId: 1, root: true }, process.env.JWT_SECRET || new Date().toString(), { expiresIn: '1h' })
        delete mockUser.password
        const mockResult = { code: 400, status: 'error', message: 'password is required' }

        const res = await request(app).post('/users').send(mockUser).set('Authorization', token)

        expect(res.statusCode).toEqual(400)
        expect(res.body).toEqual(mockResult)
    });
});