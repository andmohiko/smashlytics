export function calcWinningPercentage(records) {
  const wins = records.filter(record => record.result).length
  const loses = records.length - wins
  const percentage = records.length ? Math.round((wins/records.length)*100 * 10) / 10 : '--'
  return wins + '勝' + loses + '敗 勝率' + percentage + '%'
}
