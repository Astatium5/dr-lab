/**
 * @swagger
 * tags:
 *    name: User
 *    description: API to manage users.
 */

import express from 'express';
import controller from '../controllers/user';

const user = express.Router();

user.post('/register', controller.register);
user.post('/', controller.login);

/**
 * @swagger
 * path:
 * users:
 *   put:
 *      description: Updates an existing user.
 *      summary: Updates a user.
 *      tags:
 *        - User
 *
 *      requestBody:
 *        required: true
 *
 *        content:
 *          application/json:
 *           schema:
 *             $ref:
 *
 */
user.put('/', controller.update);

export default user;
