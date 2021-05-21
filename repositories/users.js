import firebase from '@/plugins/firebase'
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export async function getUser(userId) {
  const user = await db
    .collection('users')
    .doc(userId)
    .get()
    .then(doc => {
      return doc.data()
    }).catch(function(error) {
      console.log("Error getting user in usecase:", error);
    })
  if (!user) return
  const storageRef = storage.ref()
  const profileImgRef = storageRef.child(user.profileImgPath)
  if (!profileImgRef) return user
  const profileImg = await profileImgRef.getDownloadURL()
  return {
    profileImg,
    userId,
    ...user
  }
}

export async function createUser() {
}

export async function updateUser(user, dto) {
  await db.collection('users')
    .doc(user.userId)
    .update({
      ...dto,
      updatedAt: serverTimestamp
    }).catch(function(error) {
      console.log("Error updating user in usecase:", error);
    })
}

export async function getUserByUserOriginalId(userOriginalId) {
  const user = await db
    .collection('users')
    .where("userOriginalId", "==", userOriginalId)
    .limit(1)
    .get()
    .then(querySnapshot => querySnapshot.docs[0].data())
    .catch(function(error) {
      console.log("Error getting records in usecase:", error);
    })
  if (!user) return
  const storageRef = storage.ref()
  const profileImgRef = storageRef.child(user.profileImgPath)
  if (!profileImgRef) return user
  const profileImg = await profileImgRef.getDownloadURL()
  return {
    profileImg,
    userId: user.authId,
    ...user
  }
}
