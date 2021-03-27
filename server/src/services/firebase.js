import admin from 'firebase-admin';
import serviceAccount from '../../firebase-account.json';

const connectToDB = () => {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
  //   projectId: process.env.PROJECT_ID,
  //   storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
  //   messagingSenderId: process.env.SENDER_ID,
  //   appId: process.env.APP_ID,
  //   measurementId: process.env.MEASUREMENT_ID,
  // };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  // logger.info(`Project ID: ${process.env.PROJECT_ID}`);
  // logger.info(`API Key: ${process.env.FIREBASE_API_KEY}`);
};

const db = admin.firestore();

export { connectToDB, db };
