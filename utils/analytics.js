import firebase from '@/plugins/firebase'
const analitics = firebase.analytics()

// LogEvent = {
//   'addResult',
//   'editResult',
//   'deleteResult',
//   'reverseResult'

//   'viewTop'
//   'viewRecords'
//   'viewAnalytics'
//   'viewMypage'
//   'viewNew'

//   'editProfile',

//   'shareOnTwitter'

//   'signup',
//   'logoutFromSettings'
//   'logoutFromSignup'
// }

// import { logEvent } from '@/utils/analytics.js'
// logEvent('addResult', undefined)

export const logEvent = (eventName, params) => {
  analitics.logEvent(eventName, params)
}
