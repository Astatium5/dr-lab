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

    const { id } = patient;

    return res.status(201).send({ id });
  },

  fetch: async (req, res) => {
    const { id } = req.params;

    let patient = await db.collection('patients').doc(id).get();
    patient = patient.data();

    const querySnapshot = await db.collection('visits').where('patientId', '==', id).get();

    const { docs } = querySnapshot;
    const visits = [];

    for (let i = 0; i < docs.length; i++) {
      let x = await docs[i].ref.get();
      x = x.data();
      visits.push(x);
    }

    delete patient.visits;

    patient.visits = visits;

    return res.status(201).send({ patient });
  },
};

export default Patient;
