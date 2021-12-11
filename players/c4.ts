import {crackCracked, crackUncracked, Player, CrackedPlayer} from './player';
import {Circle, makeCircle} from './circle';

const c4 = (playerCount: number) => {
  const players = gatherPlayers(playerCount);
  const playersAfterGame = coconut(players);
  const winner = getWinner(playersAfterGame)
  if (!winner) return;
  console.log(`${playerCount} players: Position ${winner.position + 1}`)
}

const c4ButLooped = (max: number) => {
  for (let i = 2; i < max + 1; i++) {
    c4(i)
  }
}

/** Recursive function which plays the game */
const coconut = (players: Circle<Player>, crackCounter = 0): Circle<Player> => { 
  if (getWinner(players)) return players;

  switch (players.current.status) {
    case 'uncracked': {
      switch (crackCounter) {
        case 0:
        case 1:
        case 2:
          return coconut(players.next(), crackCounter + 1)
        case 3:
          const newPlayers = update(players, crackUncracked(players.current));
          return coconut(newPlayers.next(), 0);
        default: {
          process.exit(1);
        }
      }
    }
    case 'cracked': {
      switch (crackCounter) {
        case 0:
        case 1:
          return coconut(players.next(), crackCounter + 2)
        case 2:
          if (players.current.leftStatus === 'dead' || players.current.rightStatus === 'dead') {
            return coconut(players.next(), crackCounter + 1)
          }
          const newPlayers = update(players, crackCracked(players.current, 'right'));
          return coconut(newPlayers.next(), 0);
        case 3: {
          const leftOrRight = players.current.leftStatus === 'dead' ? 'right' : 'left';
          const newPlayers = update(players, crackCracked(players.current, leftOrRight));
          return coconut(newPlayers.next(), newCrackedCounter(players.current, leftOrRight));
        }
        default: {
          process.exit(1);
        }
      }
    }
    case 'dead':
      return coconut(players.next(), crackCounter)
  }
}

/** Jank lol */
const newCrackedCounter = (player: CrackedPlayer, which: 'left' | 'right'): number => {
  switch (which) {
    case 'left': {
      if (player.rightStatus === 'dead') return 0;
      return 1;
    }
    case 'right':
      return 0;
  }
}

/** Replaces player with updated player */
const update = (players: Circle<Player>, to: Player): Circle<Player> => {
  const newPlayers = players.members.map(m => {
    if (m.position !== to.position) return m;
    return to;
  });
  const updated = makeCircle(newPlayers, players.current.position)
  return updated;
}

/** Gets the winner if any exists */
const getWinner = (players: Circle<Player>): Player | null => players.only(player => player.status !== 'dead')

/** Creates players and puts them in a circle */
const gatherPlayers = (count: number): Circle<Player> => {
  const players: Player[] = [...new Array(count)].map((_, position) => {
    return {
      position,
      status: 'uncracked',
    }
  })
  return makeCircle(players);
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