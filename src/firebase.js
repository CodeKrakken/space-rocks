import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBhGQ3aRibICpd2-5vrdqB8rMb9qPo1jKY",
  authDomain: "space-rocks-8513a.firebaseapp.com",
  databaseURL: "https://space-rocks-8513a.firebaseio.com",
  projectId: "space-rocks-8513a",
  storageBucket: "space-rocks-8513a.appspot.com",
  messagingSenderId: "553776608755",
  appId: "1:553776608755:web:5309aab7b334e2782d4e86",
  measurementId: "G-GGQZBC87L4"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore()
const auth = firebase.auth()
const usersCollection = db.collection('users')
const asteroidsCollection = db.collection('asteroids')

// db.settings({ timestampsInSnapshots: true });

export {
  db,
  auth,
  usersCollection,
  asteroidsCollection
}