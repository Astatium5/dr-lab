import mailgun from 'mailgun-js';
import { db } from '../services/firebase';
import hasher from '../services/PasswordHasher';
import logger from '../util';

const User = {
  register: async (req, res) => {
    const {
      email, firstName, lastName, clinic,
    } = req.body;

    const password = await hasher.hash(req.body.password);

    await db.collection('users').doc(email).set({
      password, firstName, lastName, clinic,
    });

    let addedUser = await db.collection('users').doc(email).get();
    addedUser = addedUser.data();

    return res.status(201).send(addedUser);
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(404).send({ message: 'No email and/or password given.' });

    let user = await db.collection('users').doc(email).get();

    if (!user.exists) return res.status(404).send({ message: 'User could not be found.' });
    if (!await hasher.validateHash(password, user.get('password'))) {
      return res.status(404).send({ message: 'The specified password is not correct.' });
    }

    user = user.data();

    return res.status(200).send(user);
  },

  update: async (req, res) => {
    const { email, fieldsToUpdate } = req.body;

    if (!email) return res.status(404).send({ message: 'No email given.' });

    let user = await db.collection('users').doc(email).get();

    if (!user.exists) return res.status(404).send({ message: 'Email does not represent a valid user' });

    user = await user.update(fieldsToUpdate);

    user = await db.collection('users').doc(email).get();
    user = user.data();

    return res.status(200).send(user);
  },

  sendEmail: async (req, res) => {
    const DOMAIN = process.env.API_BASE_URL;
    const mg = mailgun({ apiKey: process.env.API_KEY, domain: DOMAIN });
    const text = `Diagnosis:\n${req.body.diagnosis}Kind regards,\n${req.body.doctorName}`;

    const data = {
      from: `${req.body.clinicName} <user@${DOMAIN}>`,
      to: `${req.body.patientEmail}, user@${DOMAIN}`,
      subject: `Doctor's appointment on ${req.body.visitDate}`,
      text,
    };

    mg.messages().send(data, (error, body) => {
      logger.info(body);

      if (error) {
        res.status(500).send({error});
      }
    });

    return res.status(200).send({ status: 'successful' });
  },
};

export default User;
