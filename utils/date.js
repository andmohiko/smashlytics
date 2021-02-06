export function date2string(datetime) {
  const datetimeLocalStr = datetime.toLocaleString({ timeZone: 'Asia/Tokyo'})
  const date = datetimeLocalStr.split(' ')[0]
  let time = datetimeLocalStr.split(' ')[1]
  if (datetime.getHours() < 10) time = '0' + time
  return date + ' ' + time
}

export function subtractDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
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
