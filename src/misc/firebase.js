import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

const config = {
  apiKey: "AIzaSyDKRo3jE_qh_r-4D6pjJI570bgvhk2XmOA",
  authDomain: "chat-web-app77.firebaseapp.com",
  databaseURL: "https://chat-web-app77-default-rtdb.firebaseio.com",
  projectId: "chat-web-app77",
  storageBucket: "chat-web-app77.appspot.com",
  messagingSenderId: "771846954988",
  appId: "1:771846954988:web:b5b06c290dd4cb9bf0eac9"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();

export const messaging = firebase.messaging.isSupported() ? app.messaging() : null;

if (messaging) {
  messaging.usePublicVapidKey('BC7fr8myEKX2iAPdEuPyISkKEKr3HUQE0m4_Xg3M3gm2YIZqWOXIHVIqR70h4MywhWMxKzpqBaDz1UPy3KmIbMI');

  messaging.onMessage(data => {
    console.log(data);
  });
}