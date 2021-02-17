import firebase from '@/plugins/firebase'
const analitics = firebase.analytics()

// LogEvent = {
  // 'getUser'
  // 'getRecords'
  // 'getRecordsInTop'
  // 'getRecordsInArena'
  // 'getRecordsInAnalytics'
  
  // 'addResult',
  // 'editResult',
  // 'deleteResult',
  // 'reverseResult'
  // 'addArenaResult'
  // 'editArenaResult'
  // 'deleteArenaResult'
  // 'reverseArenaResult'

  // 'viewTop'
  // 'viewArena'
  // 'viewAnalytics'
  // 'viewArenaAnalytics'
  // 'viewChart'
  // 'viewMypage'
  // 'viewNew'

  // 'editProfile',

  // 'shareOnTwitter'

  // 'signup',
  // 'logoutFromSettings'
  // 'logoutFromSignup'
// }

// import { logEvent } from '@/utils/analytics.js'
// logEvent('addResult', undefined)

export const logEvent = (eventName, params) => {
  analitics.logEvent(eventName, params)
}
