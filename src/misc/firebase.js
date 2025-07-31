import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();

export const messaging = firebase.messaging.isSupported() ? app.messaging() : null;

if (messaging) {
  try {
    messaging.usePublicVapidKey(process.env.REACT_APP_FIREBASE_VAPID_KEY);

    messaging.onMessage(data => {
      if (process.env.NODE_ENV === 'development') {
        console.log('FCM message received:', data);
      }
    });
  } catch (error) {
    console.error('Error setting up Firebase messaging:', error);
  }
}