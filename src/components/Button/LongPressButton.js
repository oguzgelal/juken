import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import os from 'src/utils/os';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';
import * as Haptics from 'expo-haptics';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

const longPressDefaultDuration = 200;
const textFlashDuration = 100;
const textFlashDisplayDuration = 1000;

const LongPressButton = ({
  text,
  flashText = 'Press and Hold',
  duration = longPressDefaultDuration,
}) => {

  // create ref to hold touch value
  const touchPercent = useRef(new Animated.Value(0)).current;
  const textFlash = useRef(new Animated.Value(0)).current;

  // control pressing state of the button
  const [ done, setDone ] = useState(false);
  const [ pressing, setPressing ] = useState(false);

  // listener to finish pressing
  useEffect(() => {
    touchPercent.addListener(e => {
      if (e.value >= 100) {
        setDone(true);
        if (os('mobile')) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        }
      }
    });
    return () => {
      touchPercent.removeAllListeners();
    }
  }, []);

  // control increase / decrease
  useEffect(() => {
    Animated.timing(touchPercent, {
      duration,
      toValue: pressing ? 100 : 0,
    }).start();
  }, [pressing]);

  // interpolate fill bar width
  const barWidth = touchPercent.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const textOpacity = textFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  
  const textFlashOpacity = textFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback
        onPressIn={() => setPressing(true)}
        onPressOut={() => setPressing(false)}
        onPress={() => {

          // switch to flashing text
          Animated.timing(textFlash, {
            duration: textFlashDuration,
            toValue: 1,
          }).start();

          // display flashing text for a while
          setTimeout(() => {
            // switch back to normal text
            Animated.timing(textFlash, {
              duration: textFlashDuration,
              toValue: 0,
            }).start();

          }, textFlashDisplayDuration)

        }}
      >
        <View style={styles.container}>
          <Animated.View style={[ styles.bar, { width: barWidth }]} />
          <Animated.View style={[styles.textWrapper, { opacity: textOpacity }]}>
            <Text style={styles.text}>{text}</Text>
          </Animated.View>
          <Animated.View style={[styles.textWrapper, { opacity: textFlashOpacity }]}>
            <Text style={styles.text}>{flashText}</Text>
          </Animated.View>
          
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
};

LongPressButton.propTypes = {
  
  text: PropTypes.string,
  textFlash: PropTypes.string,
  
  // hold duration is ms
  duration: PropTypes.number,

  onComplete: PropTypes.number,  
};

const styles = StyleSheet.create({
  wrapper: sheet({
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
  }),
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme._palette.yellow,
    height: '100%',
    zIndex: 0,
  },
  textWrapper: {
    position: 'absolute',
  },
  text: {
    fontWeight: '700',
    color: theme._palette.black,
    zIndex: 1,
  },
})

export default LongPressButton;
