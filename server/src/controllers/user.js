import mailgun from 'mailgun-js';
import patient from '../routes/patient';
import { db } from '../services/firebase';
import hasher from '../services/PasswordHasher';
import logger from '../util';

const User = {
  //
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

  // OUTDATED
  fetch: async (req, res) => {
    const { email } = req.body;

    let info = await db.collection('users').doc(email).get();

    info = info.data();

    let patients = await db.collection('patients').where('ownerId', '==', email).get();

    const oof = [];

    for (let i = 0; i < patients.length; i++) {
      const x = await patients.get(patient.path);
      oof.push(x);
    }

    patients = oof;

    // patient = await patient.get(patient.path);
    // patient = patient.data();

    // patients.map((x) => x.ref);

    // logger.info(patients);

    info.patients = patients;

    return res.status(201).send(info);
  },
  // works
  getPatients: async (req, res) => {
    const { email } = req.body;

    const querySnapshot = await db.collection('patients').where('ownerId', '==', email).get();

    const { docs } = querySnapshot;
    const patients = [];

    for (let i = 0; i < docs.length; i++) {
      const { id } = docs[i].ref;
      let x = await docs[i].ref.get();
      x = x.data();
      x.id = id;
      patients.push(x);
    }

    res.send({ patients });
  },

  addAssignee: async (req, res) => {
    const { email, patientId } = req.body;

    const user = db.collection('users').doc(email);
    user = user.data();
    let assignees = [];

    if (user.assignees) assignees = user.assignees;
    assignees.push(patientId);

    await db.collection('users').doc(email).update({ assignees });
    let result = await db.collection('users').doc(email).get();

    result = result.data();

    return res.status(201).send(result);
  },

  // works
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(404).send({ message: 'No email and/or password given.' });

    let user = await db.collection('users').doc(email).get();

    if (!await hasher.validateHash(password, user.get('password'))) {
      return res.status(404).send({ message: 'The specified password is not correct.' });
    }

    user = user.data();

    return res.status(200).send(user);
  },
  // not gonna use but works
  update: async (req, res) => {
    const { email, fieldsToUpdate } = req.body;

    if (!email) return res.status(404).send({ message: 'No email given.' });

    let user = await db.collection('users').doc(email);

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
        res.status(500).send({ error });
      }
    });

    return res.status(200).send({ status: 'successful' });
  },
};

export default User;
