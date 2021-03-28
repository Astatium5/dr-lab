/* eslint-disable no-underscore-dangle */
import { db, bucket } from '../services/firebase';
import logger from '../util';

const Visit = {
  create: async (req, res) => {
    const { patientId } = req.body;

    // const patient = await db.collection('patients').where('id', '==', patientId).get();
    // if (typeof patient === 'undefined') return res.status(404).send({ message: `Patient with id ${patientId} could not be found.` });

    let addedVisitId = await db.collection('visits').add({ patientId });
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

    const visitToUpdate = await db.collection('visits').doc(id);
    if (!visitToUpdate) return res.status(404).send({ message: `Visit with id ${id} could not be found.` });

    await visitToUpdate.update({ visit: fieldsToUpdate });

    let result = await db.collection('visits').doc(id).get();
    result = result.data();

    return res.status(201).send(result);
  },

  uploadPhotos: async (req, res) => {
    const { visitId } = req.body;
    const { photos } = req.files;
    if (!photos) return res.send({ message: 'Nothing to upload' });
    if (!visitId) return res.send({ message: 'No visit id given' });
  },
};

export default Visit;
