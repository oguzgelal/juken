import device from 'src/utils/device';

const palette = {
  blue: 'rgb(30, 203, 225)',
  green: 'rgb(83, 242, 185)',
  red: 'rgb(255, 149, 143)',
  black: 'rgb(81, 81, 81)',
  white: 'rgb(255, 255, 255)',
  yellow: 'rgb(250, 191, 79)',
  gray: 'rgb(224, 224, 224)',
  lightGray: 'rgb(245, 245, 245)',
}

const color = {
  primary: palette.blue,
  correct: palette.green,
  incorrect: palette.red,
  radical: 'rgb(27, 163, 247)',
  kanji: 'rgb(239, 25, 160)',
  vocab: 'rgb(160, 35, 238)',
  githubBlack: '#333',
  githubWhite: '#fafafa',
};

const bg = {
  body: color.primary,
  card: palette.white,
};

const padding = device({
  base: {
    body: 24,
    card: 18,
    touchable: 12,
  },
  web: { pageTop: 14 },
  mobile: { pageTop: 4 },
});

const radius = {
  card: 10,
  touchable: 5,
};

const height = device({
  base: {
    touchable: 52,
  },
  web: { statusBar: 22 },
  mobile: { statusBar: 8 }
});

export default {
  palette,
  color,
  bg,
  padding,
  radius,
  height,
};