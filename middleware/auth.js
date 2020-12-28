import { setCookie, getCookie } from '@/plugins/cookie'
import Cookies from "universal-cookie"
import jwtDecode from "jwt-decode"

export default async function ({ redirect }) {
  const cookie = new Cookies()
  const auth_token = cookie.get('smash_access_token')
  console.log('middle got token', Boolean(auth_token))
  // if (!Boolean(auth_token)) return redirect('/new')
  // const decodedToken = jwtDecode(auth_token)
  // const uid = decodedToken['user_id']
  // console.log('middle decoded userId', uid)
}
