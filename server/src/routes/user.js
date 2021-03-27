import express from 'express';
import controller from '../controllers/patient';

const user = express.Router();

user.get('/', controller.fetch);

user.post('/', controller.login);
user.post('/register', controller.create);

export default patient;
