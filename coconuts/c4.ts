import { Coconut, crack } from "./coconut";
import {around} from './array';

const c4 = (playerCount: number) => {
  const coconuts = initCoconuts(playerCount);
  const remaining = coconut(coconuts);
  const winningIndex = remaining[0]?.owner;
  if (winningIndex == null) return console.log('No winner. What?')
  console.log(`${playerCount} players: Position ${winningIndex + 1}`)
}

const c4ButLooped = (max: number) => {
  for (let i = 2; i < max + 1; i++) {
    c4(i)
  }
}

const coconut = (coconuts: Coconut[], curr: number = 0, crackCounter: number = 0): Coconut[] => {
  // Base case
  if (winner(coconuts)) return coconuts;

  // If not needing to crack yet
  if (crackCounter < 3) {
    const nextIndex = around(coconuts, curr + 1);
    const nextCrackCounter = crackCounter + 1;
    return coconut(coconuts, nextIndex, nextCrackCounter)
  }

  const cracked = crack(coconuts[curr]);
  switch (cracked.length) {
    case 0: {
      const updated: Coconut[] = coconuts.filter((_, i) => i !== curr);
      const nextIndex = around(coconuts, curr);
      const nextCrackCounter = 0;
      return coconut(updated, nextIndex, nextCrackCounter);
    }
    case 1:
    case 2: {
      const updated: Coconut[] = coconuts.flatMap((c, i) => {
        if (i !== curr) return [c];
        return cracked;
      })
      const nextIndex = around(coconuts, curr + 1);
      const nextCrackCounter = 0;
      return coconut(updated, nextIndex, nextCrackCounter)
    }
  }
}

/** Checks if the same owner owns all the coconuts remaining */
const winner = (coconuts: Coconut[]): boolean => {
  const owners = [... new Set(coconuts.map(c => c.owner))];
  return owners.length < 2;
}

const initCoconuts = (playerCount: number): Coconut[] =>
  [...new Array(playerCount)].map((_, owner) => ({
    owner,
    state: 'big'
  }))

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