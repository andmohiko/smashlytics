import Cookies from "universal-cookie"
import jwtDecode from "jwt-decode"

export default async ({ store }) => {
  try {
    const cookie = new Cookies()
    const auth_token = cookie.get('smash_access_token')
    console.log('setupjs got token', Boolean(auth_token))
    if (!auth_token) return

    const decodedToken = jwtDecode(auth_token)
    const uid = decodedToken['user_id']
    console.log('setupjs decoded userId', uid)
    store.commit('setUid', uid)
    store.dispatch('isUser', uid)
    
    const resultFighters = await store.dispatch('getFighters')
  } catch (error) {
    console.log('error in setup', error)
  }
}
