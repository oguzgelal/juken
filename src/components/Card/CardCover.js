import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Animated } from 'react-native';
import theme from 'src/common/theme';
import sheet from 'src/utils/sheet';
import { AntDesign } from '@expo/vector-icons';

const iconSize = 38;

const CardCover = ({ getClearInterpolation }) => {

  const coverOpacity = getClearInterpolation('x', [1, 0, 1]);
  const iconSmileOpacity = getClearInterpolation('x', [0, 0, 1]);
  const iconFrownOpacity = getClearInterpolation('x', [1, 0, 0]);
  const coverBackground = getClearInterpolation('x', [
    theme.color.incorrect,
    theme.bg.card,
    theme.color.correct
  ]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.wrapper,
        {
          backgroundColor: coverBackground,
          opacity: coverOpacity,
        },
      ]}
    >
      
      {/* smile icon */}
      <Animated.View
        style={[
          styles.icon,
          styles.iconSmile,
          { opacity: iconSmileOpacity }
        ]}
      >
        <AntDesign
          name="smileo"
          size={iconSize}
          color={theme.palette.white}
        />
      </Animated.View>
      
      {/* frown icon */}
      <Animated.View
        style={[
          styles.icon,
          styles.iconFrown,
          { opacity: iconFrownOpacity }
        ]}
      >
        <AntDesign
          name="frowno"
          size={iconSize}
          color={theme.palette.white}
        />
      </Animated.View>
    </Animated.View>
  )
};

CardCover.propTypes = {
  getClearInterpolation: PropTypes.func,
};

const styles = StyleSheet.create({
  wrapper: sheet({
    base: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 9,
    },
    web: {
      pointerEvents: 'none'
    }
  }),
  icon: sheet({
    base: { position: 'absolute' },
    mobile: { top: 20 },
    web: {
      top: '50%',
      left: '50%',
      marginTop: -iconSize / 2,
      marginLeft: -iconSize / 2,
    }
  }),
  iconSmile: sheet({ mobile: { left: 20 } }),
  iconFrown: sheet({ mobile: { right: 20 } }),
})

export default CardCover;
