/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { v4 as uuidv4 } from 'uuid';
import { db, bucket, ref } from '../services/firebase';
import logger from '../util';

const Visit = {
  create: async (req, res) => {
    const { patientId } = req.body;

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
    if (!visitToDelete.exist) return res.status(404).send({ message: `Visit with id ${id} could not be found.` });

    visitToDelete.delete().then(() => res.send());
  },

  update: async (req, res) => {
    const { id, fieldsToUpdate } = req.body;

    const visitToUpdate = await db.collection('visits').doc(id);
    if (!visitToUpdate.exists) return res.status(404).send({ message: `Visit with id ${id} could not be found.` });

    await visitToUpdate.update({ fieldsToUpdate });

    const result = await db.collection('visits').doc(id).get().data();

    return res.status(201).send(result);
  },

  uploadPhotos: async (req, res) => {
    const photo = req.file.buffer;
    const { visitId } = req.params;

    const rand = uuidv4();

    const config = {
      action: 'read',
      expires: '03-17-2025',
    };

    const file = bucket.file(`visits/${visitId}/${rand}.png`);

    await file.save(photo);

    const url = await file.getSignedUrl(config);

    return res.send(url);
  },

  getPhotos: async (req, res) => {
    const { visitId } = req.params;

    const config = {
      action: 'read',
      expires: '03-17-2025',
    };

    let files = await bucket.getFiles({ prefix: `visits/${visitId}/` });
    [files] = files;

    const urls = [];

    for (let i = 0; i < files.length; i++) {
      const x = await files[i].getSignedUrl(config);
      urls.push(x[0]);
    }

    res.send(urls);
  },
};

export default Visit;
