import firebase from '@/plugins/firebase'
const db = firebase.firestore()

export default async function({ app, store }) {
  try {
    const version = store.state.version
    const latestVersion = await db
      .collection('versions')
      .orderBy('startDate', 'desc')
      .limit(1)
      .get()
      .then(querySnapshot => {
        let versionsArray = []
        querySnapshot.forEach(doc => {
          versionsArray.push(doc.id)
        })
        return Number(versionsArray[0])
      })
    console.log('now ver', version, 'latest ver', latestVersion)
    // 期待するバージョン以上なら何もしない
    if (latestVersion <= version) return
    // 反映させるためにスーパーリロードを促す
    store.commit('setVersion', latestVersion)
    window.confirm('新しいバージョンが配信されているため最新バージョンに更新します。')
    location.reload(true)
  } catch(error) {
    console.error(error);
    // エラーのときはなにもしない
  }
}
