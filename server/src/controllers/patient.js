import { db } from '../services/firebase';

const Patient = {
  create: async (req, res) => {
    const {
      firstName, lastName, age, email, ownerId,
    } = req.body;

    const patient = await db.collection('patients').add({
      firstName,
      lastName,
      age,
      email,
      ownerId,
      visits: [],
    });

    return res.status(201).send(patient);
  },

  fetch: async (req, res) => {
    const { id } = req.params;

    const patient = await db.collection('patients').doc(id).get();
    if (!patient) {
      return res.status(404);
    }

    return res.status(201).send(patient);
  },
};

export default Patient;
