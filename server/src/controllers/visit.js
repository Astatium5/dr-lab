import db from '../services/firebase';

const Visit = {
  create: async (req, res, next) => {
    const { patientId, visit } = req.body;

    const patient = await db.collection('patient').doc(patientId).get();
    if (!patient) return res.status(404).send({ message: `Patient with id ${patientId} could not be found.` });

    const addedVisit = await db.collection('visits').add({ visit }); 

    return res.status(201).send(addedVisit);
  },

  delete: async (req, res, next) => {
    const { id } = req.body;

    const visitToDelete = await db.collection('visits').doc(id).get();
    if (!visitToDelete) return res.status(404).send({ message: `Visit with id ${id} could not be found.` });

    visitToDelete.delete().then(() => res.send());
  },

  update: async (req, res, next) => {
    const { id, fieldsToUpdate } = req.body;

    const visitToUpdate = await db.collection('visits').doc(id).get();
    if (!visitToDelete) return res.status(404).send({ message: `Visit with id ${id} could not be found.` });

    const result = visitToUpdate.update({ fieldsToUpdate });

    return res.status(201).send(result);
  },
};

export default Visit;
