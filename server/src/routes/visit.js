/**
 * @swagger
 * tags:
 *    name: Visit
 *    description: API to manage visits.
 */

import express from 'express';
import multer from 'multer';
import controller from '../controllers/visit';

const visit = express.Router();

visit.post('/', controller.create);
visit.delete('/', controller.delete);
visit.put('/', controller.update);
visit.put('/upload', multer.array('photos'), controller.uploadPhotos);

export default visit;
