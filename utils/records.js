export function calcWinningPercentage(results) {
  const wins = results.wins
  const loses = results.loses
  const matches = results.matches
  const percentage = matches ? Math.round((wins/matches)*100 * 10) / 10 : '--'
  return wins + '勝' + loses + '敗 勝率' + percentage + '%'
}
