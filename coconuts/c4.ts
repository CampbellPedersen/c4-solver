const c4 = (playerCount: number) => {
  // const players = gatherPlayers(playerCount);
  // const playersAfterGame = coconut(players);
  // const winner = getWinner(playersAfterGame)
  // if (!winner) return;
  // console.log(`${playerCount} players: Position ${winner.position + 1}`)
}

const c4ButLooped = (max: number) => {
  for (let i = 2; i < max + 1; i++) {
    c4(i)
  }
}

/** Reads number of players from command line */
const countPlayers = (): number | undefined => {
  const playerArg = process.argv.slice(2)[0];
  if (playerArg == null) return;
  const players = +playerArg
  if (Number.isNaN(players) || players < 2) {
    console.log('Must have at least 2 players');
    process.exit();
  }
  
  return players;
}

/* Execute */
const playerCount = countPlayers()
if (playerCount) {
  c4(playerCount)
} else {
  c4ButLooped(100)
}