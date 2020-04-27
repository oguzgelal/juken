import theme from 'src/common/theme';
import sheet from 'src/utils/sheet';

export const wrapper = sheet({
  base: {
    position: 'relative',
    width: '100%',
    height: theme.height.touchable,
    backgroundColor: theme._palette.lightGray,
    borderRadius: theme.radius.touchable,
    overflow: 'hidden',
    zIndex: 99999,
  },
  web: {
    userSelect: 'none'
  }
});

export const container = {
  width: '100%',
  height: '100%',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.padding.touchable,
};

export const text = {
  fontWeight: '700',
  color: theme._palette.black,
  zIndex: 1,
};