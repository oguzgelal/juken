const _color = {
  primary: '#20BCD7',
  secondary: '#D73B20',
  black: 'black',
  white: 'white',
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
  body: _color.primary,
  card: _color.white,
};

const space = {
  body: _space.u5,
  card: _space.u4,
};

const radius = {
  card: _radius.u3,
}

export default {
  _color,
  _space,
  _radius,
  _transition,
  bg,
  space,
  radius,
};