import { setCookie, getCookie } from '@/plugins/cookie'
import Cookies from "universal-cookie"
import jwtDecode from "jwt-decode"

export default async function ({ redirect, store }) {
  const cookie = new Cookies()
  const auth_token = cookie.get('smash_access_token')
  console.log('middle got token', Boolean(auth_token))
  if (!auth_token) return
  // const decodedToken = jwtDecode(auth_token)
  // const uid = decodedToken['user_id']
  // console.log('middle decoded userId', uid)
  // store.dispatch('isUser', uid)
  // store.commit('setUid', uid)
}
