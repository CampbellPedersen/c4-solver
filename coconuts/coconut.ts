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

type Coconut = BigCoconut | SmallCoconut | CrackedCoconut;