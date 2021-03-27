import express from 'express';
import controller from '../controllers/patient';

const user = express.Router();

user.put('/', controller.update);

user.post('/', controller.login);
user.post('/register', controller.create);

export default user;
