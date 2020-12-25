export function en2jp(fighterEn, fighters) {
  return fighters[fighterEn].japanese
}

export function jp2en(fighterJp, fighters) {
  const fighter = Object.values(fighters).filter(f => f.japanese === fighterJp)[0]
  return fighter.english
}

export function calcWinnigPercentage(records) {
  const wins = records.filter(record => record.result).length
  const loses = records.length - wins
  const percentage = Math.round((wins/records.length)*100 * 10) / 10
  return wins + '勝' + loses + '敗 勝率' + percentage + '%'
}
