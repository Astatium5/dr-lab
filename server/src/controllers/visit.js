/* eslint-disable no-underscore-dangle */
import db from '../services/firebase';
import logger from '../util';

const Visit = {
  create: async (req, res) => {
    const { patientId, visit } = req.body;

    const patient = await db.collection('patient').doc(patientId).get();
    if (!patient) return res.status(404).send({ message: `Patient with id ${patientId} could not be found.` });

    let addedVisitId = await db.collection('visits').add({ visit });
    [, addedVisitId] = addedVisitId._path.segments;

    let addedVisit = await db.collection('visits').doc(addedVisitId).get();
    addedVisit = addedVisit.data();
    addedVisit.id = addedVisitId;

    return res.status(201).send(addedVisit);
  },

  delete: async (req, res) => {
    const { id } = req.body;

    const visitToDelete = await db.collection('visits').doc(id).get();
    if (!visitToDelete) return res.status(404).send({ message: `Visit with id ${id} could not be found.` });

    visitToDelete.delete().then(() => res.send());
  },

  update: async (req, res) => {
    const { id, fieldsToUpdate } = req.body;

    const visitToUpdate = await db.collection('visits').doc(id).get();
    if (!visitToUpdate) return res.status(404).send({ message: `Visit with id ${id} could not be found.` });

    const result = visitToUpdate.update({ fieldsToUpdate });

    return res.status(201).send(result);
  },
};

export default Visit;
