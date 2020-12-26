import jwtDecode from "jwt-decode"
import Cookies from "universal-cookie"

const KEY_TOKEN = "smash_access_token"

export async function setCookie(currentUser) {
  const token = await currentUser.getIdToken(true)
  const cookies = new Cookies()
  cookies.set(KEY_TOKEN, token)
}

export function getCookie(req) {
  if (process.server && process.static) return
  if (!req.headers.cookie) return
  const cookie = new Cookies(req.headers.cookie)
  const token = cookie.get(KEY_TOKEN)
  if (!token) return
  const decodedToken = jwtDecode(token)
  if (!decodedToken) return
  return decodedToken.user_id
}
