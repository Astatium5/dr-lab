/**
 * @swagger
 * tags:
 *    name: Visit
 *    description: API to manage visits.
 */

import express from 'express';
import controller from '../controllers/visit';

const visit = express.Router();

visit.post('/', controller.create);
visit.delete('/', controller.delete);

export default visit;
