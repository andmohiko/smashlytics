export function en2jp(fighterEn, fighters) {
  return fighters[fighterEn].name
}

export function jp2id(fighterJp, fighters) {
  const fighter = Object.values(fighters).filter(f => f.name === fighterJp)[0]
  return fighter.fighterId
}

export function calcWinningPercentage(records) {
  const wins = records.filter(record => record.result).length
  const loses = records.length - wins
  const percentage = records.length ? Math.round((wins/records.length)*100 * 10) / 10 : '--'
  return wins + '勝' + loses + '敗 勝率' + percentage + '%'
}
