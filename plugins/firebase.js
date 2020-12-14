import firebase from 'firebase/app'
import 'firebase/firestore'
import config from '../firebaseConfig.json'

if (!firebase.apps.length) {
  firebase.initializeApp({ ...config })
}
const firestore = firebase.firestore()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export { firebase, firestore, serverTimestamp }
