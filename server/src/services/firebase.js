import admin from 'firebase-admin';
import serviceAccount from '../../firebase-account.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'hoohacks-projec.appspot.com',
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

export { db, bucket };
