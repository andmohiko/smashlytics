export function en2jp(fighterEn, fighters) {
  return fighters[fighterEn].japanese
}

export function jp2en(fighterJp, fighters) {
  const fighter = Object.values(fighters).filter(f => f.japanese === fighterJp)[0]
  return fighter.english
}
