import firebase from '@/plugins/firebase'
const db = firebase.firestore()

export default async function({ app, store }) {
  // 未ログインは何もしない
  if (!store.state.isLogin) return
  // 最新バージョン取得から3分以内なら更新しない
  const now = (new Date()).getTime()
  const version = store.state.version
  if ((now - version.refreshedAt) / 1000 < 180) return

  try {
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
    console.log('now ver', version.versionNumber, 'latest ver', latestVersion)
    // 期待するバージョン以上なら何もしない
    if (latestVersion <= version.versionNumber) return
    // 反映させるためにスーパーリロードを促す
    store.commit('setVersion', {
      versionNumber: latestVersion,
      refreshedAt: now
    })
    window.confirm('新しいバージョンが配信されているため最新バージョンに更新します。')
    location.reload(true)
  } catch(error) {
    console.error(error);
    // エラーのときはなにもしない
  }
}
