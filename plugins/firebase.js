import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
// import config from '../credentials/firebaseConfig.json'

const fbConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(fbConfig)
  // firebase.initializeApp({ ...config })
}
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
// export const auth = firebase.auth()
export default firebase
// export { firebase, firestore, serverTimestamp }
