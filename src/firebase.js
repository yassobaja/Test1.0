import Firebase from 'firebase';

const firebaseApp = Firebase.initializeApp({
  apiKey: 'xxx',
  authDomain: 'xxx',
  databaseURL: 'xxx',
  projectId: 'xxx',
  storageBucket: 'xxx',
  messagingSenderId: 'xxx'
});

const firebase = {
  db: firebaseApp.database(),
  auth: firebaseApp.auth(),
  storage: firebaseApp.storage(),
};

export default firebase;
