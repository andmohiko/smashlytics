import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../firebaseConfig.json'

if (!firebase.apps.length) {
  firebase.initializeApp({ ...config })
}
export const firestore = firebase.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
// export const auth = firebase.auth()
export default firebase
// export { firebase, firestore, serverTimestamp }
