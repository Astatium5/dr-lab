/**
 * @swagger
 * tags:
 *    name: Patient
 *    description: API to manage patients.
 */
import express from 'express';
import controller from '../controllers/patient';

const patient = express.Router();

/**
 * @swagger
 * path:
 * /patient/:
 *    post:
 *      description: Creates a new patient
 *      summary: Creates a patient
 *      tags:
 *        - Patient
 *
 *      requestBody:
 *        description:
 *        required: true
 *
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Patient'
 *
 *      produces:
 *        - application/json
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Patient'
 */
patient.post('/', controller.create);

/**
 * @swagger
 * path:
 * /groups/{id}:
 *    get:
 *      description: Get an existing patient
 *      summary: Gets a patient
 *      tags:
 *        - Patient
 *
 *      requestBody:
 *        description:
 *        required: true
 *
 *        content:
 *          application/json:
 *            schema:
 *
 *
 *      produces:
 *        - application/json
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Patient'
 */
patient.get('/:id', controller.fetch);

// patient.post('/:id/add', controller.addVisit);

export default patient;
