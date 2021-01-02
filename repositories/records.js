import firebase from '@/plugins/firebase'
import { date2string } from '@/utils/date.js'
const db = firebase.firestore()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export async function getRecords(userId) {
  return await db
    .collection('records')
    .where("userId", "==", userId)
    .get()
    .then(querySnapshot => {
      let recordsArray = []
      querySnapshot.forEach(doc => {
        let record = doc.data()
        record.docId = doc.id
        record.createdAt = record.createdAt.toDate()
        record.updatedAt = record.updatedAt.toDate()
        record.createdAtString = date2string(record.createdAt)
        recordsArray.push(record)
      })
      return recordsArray.sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : 1
      })
    }).catch(function(error) {
      console.log("Error getting records in usecase:", error);
    })
}
