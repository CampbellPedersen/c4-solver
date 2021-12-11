type PlayerDetails = {
  position: number
}

type Status = Player['status']

export type UncrackedPlayer = {
  status: 'uncracked'
} & PlayerDetails

export type CrackedPlayer = {
  status: 'cracked'
  leftStatus: Status
  rightStatus: Status
} & PlayerDetails

export type DeadPlayer = {
  status: 'dead'
} & PlayerDetails

export type Player = UncrackedPlayer | CrackedPlayer | DeadPlayer

export const crackUncracked = (player: UncrackedPlayer): CrackedPlayer => {
  return {
    position: player.position,
    status: 'cracked',
    leftStatus: 'uncracked',
    rightStatus: 'uncracked',
  }
}

export const crackCracked = (player: CrackedPlayer, hand: 'left' | 'right'): CrackedPlayer | DeadPlayer => {
  switch(hand) {
    case 'left':
      return crackLeft(player);
    case 'right':
      return crackRight(player);
  }
}

const crackLeft = (player: CrackedPlayer): CrackedPlayer | DeadPlayer => {
  switch (player.leftStatus) {
    case 'uncracked':
      return {
        ...player,
        leftStatus: 'cracked',
      }
    case 'cracked':
      if (player.rightStatus === 'dead') return kill(player);
      return {
        ...player,
        leftStatus: 'dead',
      }
    case 'dead':
      return player;
  }
}

const crackRight = (player: CrackedPlayer): CrackedPlayer | DeadPlayer => {
  switch (player.rightStatus) {
    case 'uncracked':
      return {
        ...player,
        rightStatus: 'cracked',
      }
    case 'cracked':
      if (player.leftStatus === 'dead') return kill(player);
      return {
        ...player,
        rightStatus: 'dead',
      }
    case 'dead':
      return player;
  }
}

const kill = (player: CrackedPlayer): DeadPlayer => {
  return {
    position: player.position,
    status: 'dead'
  }
}