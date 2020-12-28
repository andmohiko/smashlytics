export function timestamp2dateString(timestamp) {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate()
  return date.getDate() < 10 ?
    date.getFullYear() + '/' + (date.getMonth()+1) + '/0' + date.getDate() :
    date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate()
}

export function timestamp2date(timestamp) {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate()
  return new Date(date.getFullYear(), (date.getMonth()), date.getDate())
}

export const now = () => {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
  )
}

export const today = () => {
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
  )
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}
