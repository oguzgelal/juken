import theme from 'src/common/theme';
import sheet from 'src/utils/sheet';

export const wrapper = sheet({
  base: {
    width: '100%',
    height: 52,
    backgroundColor: theme._palette.lightGray,
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 99999,
  },
  web: {
    userSelect: 'none'
  }
});

export const container = {
  position: 'relative',
  width: '100%',
  height: '100%',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

export const text = {
  fontWeight: '700',
  color: theme._palette.black,
  zIndex: 1,
};