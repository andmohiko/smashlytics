export default async ({ store }) => {
  try {
    const resultRecords = await store.dispatch('getRecords', 'andmohiko')
    // console.log('resultRecords', resultRecords)
    const resultFighters = await store.dispatch('getFighters')
    // console.log('resultFighters', resultFighters)
  } catch (error) {
    console.log('error in setup', error)
  }
}
