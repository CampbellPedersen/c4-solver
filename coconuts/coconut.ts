type CoconutState = Coconut['state'];

type BigCoconut = {
  owner: number;
  state: 'big';
}

type SmallCoconut = {
  owner: number;
  state: 'small';
}

type CrackedCoconut = {
  owner: number;
  state: 'cracked';
}

export type Coconut = BigCoconut | SmallCoconut | CrackedCoconut;

export const crack = (coconut: Coconut): [] | [Coconut] | [Coconut, Coconut] => {
  const {owner, state} = coconut;
  switch (state) {
    // big -> 2 small
    case 'big':
      return [{
        owner,
        state: 'small'
      }, {
        owner,
        state: 'small'
      }];
    // small -> cracked
    case 'small':
      return [{
        owner,
        state: 'cracked'
      }]
    // cracked -> remove
    case 'cracked':
      return []
  }
}