export function timestamp2dateString(timestamp) {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate()
  return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
}
