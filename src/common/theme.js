const _palette = {
  blue: 'rgb(30, 203, 225)',
  green: 'rgb(83, 242, 185)',
  red: 'rgb(255, 149, 143)',
  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255)',
}

const color = {
  primary: _palette.blue,
  correct: _palette.green,
  incorrect: _palette.red,
  radical: 'rgb(27, 163, 247)',
  kanji: 'rgb(239, 25, 160)',
  vocab: 'rgb(160, 35, 238)',
};

const _space = {
  u1: 4,
  u2: 8,
  u3: 12,
  u4: 18,
  u5: 32,
}

const _radius = {
  u1: 2,
  u2: 4,
  u3: 8,
}

const _transition = {
  mild: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
}

const bg = {
  body: color.primary,
  card: _palette.white,
};

const space = {
  body: _space.u5,
  card: _space.u4,
};

const radius = {
  card: _radius.u3,
}

export default {
  _palette,
  _space,
  _radius,
  _transition,
  color,
  bg,
  space,
  radius,
};