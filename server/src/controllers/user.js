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

    const user = await db.collection('users').doc(email).get();

    if (!user) return res.status(404).send({ message: 'User could not be found.' });
    if (!hasher.validateHash(password, user.password)) {
      return res.status(404).send({ message: 'The specified password is not correct.' });
    }

    return res.status(200).send(user);
  },

  update: async (req, res) => {
    const { email, fieldsToUpdate } = req.body;

    if (!email) return res.status(404).send({ message: 'No email given.' });

    let user = await db.collection('users').doc(email).get();
    if (!user) return res.status(404).send({ message: 'Email does not represent a valid user' });

    user = user.update(fieldsToUpdate);

    return res.status(200).send(user);
  },

  sendEmail: async (req, res) => {
    const DOMAIN = 'doctor-lab.herokuapp.com';
    const mg = mailgun({ apiKey: process.env.API_KEY, domain: DOMAIN });
    const text = `Diagnosis:\n${req.body.diagnosis}Kind regards,\n${req.body.doctorName}`;

    const data = {
      from: `${req.body.clinicName} <dima@knighthacks.org>`,
      to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
      subject: `Doctor's appointment on ${req.body.visitDate}`,
      text,
    };

    mg.messages().send(data, (error, body) => {
      logger.info(error, body);
    });

    return res.status(200).send({ status: 'successful' });
  },
};

export default User;
