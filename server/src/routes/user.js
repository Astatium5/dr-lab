/**
 * @swagger
 * tags:
 *    name: User
 *    description: API to manage users.
 */

import express from 'express';
import controller from '../controllers/user';

const user = express.Router();

/**
 * @swagger
 * path:
 * /users/register:
 *   post:
 *      description: Registers a new user.
 *      summary: Registers a user.
 *      tags:
 *        - User
 *
 *      requestBody:
 *        description:
 *        required: true
 *
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *
 *      produces:
 *        - application/json
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *
 */
user.post('/register', controller.register);

/**
 * @swagger
 * path:
 * /users/:
 *   post:
 *      description: Logs in an existing user.
 *      summary: Logs in a user.
 *      tags:
 *        - User
 *
 *      requestBody:
 *        description: Only email and password
 *        required: true
 *
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      format: email
 *                      required: true
 *                      example: new@example.com
 *                  password:
 *                      type: string
 *                      required: true
 *                      example: new_crazy_password
 *
 *      produces:
 *        - application/json
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *
 */
user.post('/login', controller.login);

/**
 * @swagger
 * path:
 * /users/:
 *    put:
 *      description: Updates an existing user.
 *      summary: Updates a user.
 *      tags:
 *        - User
 *
 *      requestBody:
 *        required: true
 *
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '/#/components/schemas/User'
 *       
 *
 */
user.put('/', controller.update);

/**
 * @swagger
 * path:
 * /users/email:
 *    post:
 *      description: Sends an email with the diagnosis.
 *      summary: Sends an email.
 *      tags:
 *        - User
 *
 *      requestBody:
 *        required: true
 *
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Email'
 * 
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status: 
 *                    type: string
 */
user.post('/email', controller.sendEmail);

user.post('/', controller.fetch);

export default user;
