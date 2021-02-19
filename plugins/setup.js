import Cookies from "universal-cookie"
import jwtDecode from "jwt-decode"

export default async ({ store }) => {
  try {
    // const cookie = new Cookies()
    // const auth_token = cookie.get('smash_access_token')
    // console.log('setupjs got token', Boolean(auth_token))
    // if (!auth_token) return
    
    // const decodedToken = jwtDecode(auth_token)
    // const uid = decodedToken['user_id']
    const uid = store.state.uid
    console.log('setup got uid', Boolean(uid))
    if (!uid) return
    // console.log('uid', uid)
    store.commit('setUid', uid)
    store.commit('setChartType', '')
    store.dispatch('isUser', uid)
  } catch (error) {
    console.log('error in setup', error)
  }
}
