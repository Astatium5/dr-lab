import express from 'express';
import controller from '../controllers/patient';

const patient = express.Router();

patient.get('/', controller.fetch);

patient.post('/', controller.create);
patient.post('/:id/add', controller.addVisit);

export default patient;
