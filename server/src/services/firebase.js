import firebase from 'firebase/app';
import 'firebase/firestore';
import logger from '../util';

const connectToDB = () => {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
    projectId: process.env.PROJECT_ID,
    storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  firebase.initializeApp(firebaseConfig);

  logger.info(`Project ID: ${process.env.PROJECT_ID}`);
  logger.info(`API Key: ${process.env.FIREBASE_API_KEY}`);
};

export default connectToDB;
