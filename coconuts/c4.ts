import { BigCoconut, Coconut, crack } from "./coconut";
import {around} from './array';

const c4 = (playerCount: number) => {
  const coconuts = initCoconuts(playerCount);
  const remaining = coconut(coconuts);
  const winningIndex = remaining[0]?.owner;
  if (winningIndex == null) return console.log('No winner. What?');
  const playerOrPlayers = `player${playerCount === 1 ? '' : 's'}`;
  console.log(`${playerCount} ${playerOrPlayers}: Position ${winningIndex + 1}`);
}

const c4ButLooped = (max: number, playerCount: number = 1) => {
  if (playerCount > max) return;
  c4(playerCount);
  c4ButLooped(max, playerCount + 1);
}

const coconut = (coconuts: Coconut[], curr: number = 0, crackCounter: number = 0): Coconut[] => {
  if (winner(coconuts)) return coconuts;

  if (crackCounter < 3) {
    const nextIndex = around(coconuts, curr + 1);
    return coconut(coconuts, nextIndex, crackCounter + 1);
  }

  const cracked = crack(coconuts[curr]);

  const updated: Coconut[] = coconuts.flatMap((c, i) => {
    if (i !== curr) return [c];
    return cracked;
  });

  const nextIndex = around(coconuts, curr + cracked.length);
  const resetCrackCounter = 0;
  return coconut(updated, nextIndex, resetCrackCounter);
}

const winner = (coconuts: Coconut[]): boolean => {
  const owners = [...new Set(coconuts.map(c => c.owner))];
  return owners.length < 2;
}

const initCoconuts = (playerCount: number): BigCoconut[] =>
  [...new Array(playerCount)].map((_, owner) => ({
    owner,
    state: 'big',
  }))

const countPlayers = (): number | undefined => {
  const playerArg = process.argv.slice(2)[0];
  if (playerArg == null) return;
  const players = +playerArg;
  if (Number.isNaN(players) || players < 2) {
    console.log('Must have at least 2 players');
    process.exit();
  }
  
  return players;
}

const playerCount = countPlayers();
if (playerCount) {
  c4(playerCount);
} else {
  c4ButLooped(100);
}