import db from '../services/firebase';

const Visit = {
  create: async (req, res, next) => {
    const { patientId, visit } = req.body;

    //const visit = await db.collection('visits').add(visit);

    //const patient = await db.collection('patients').doc(id).set({
    });
  },
};

export default Visit;
