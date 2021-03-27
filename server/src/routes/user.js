/**
 * @swagger
 * tags:
 *    name: User
 *       
 */
import express from 'express';
import controller from '../controllers/user';

const user = express.Router();

user.put('/', controller.update);

user.post('/', controller.login);
user.post('/register', controller.register);

export default user;
