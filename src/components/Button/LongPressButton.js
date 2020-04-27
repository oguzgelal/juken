import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import os from 'src/utils/os';
import theme from 'src/common/theme';
import * as sharedStyles from 'src/components/Button/sharedStyles';
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
  hapticFeedback = true,
  multiuse = false,
  onComplete,
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

        // finish the button
        if (!multiuse) { setDone(true); }

        // haptic feedback
        if (os('mobile') && hapticFeedback) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        }

        // on complete callback
        if (typeof onComplete === 'function') {
          onComplete()
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
        onPressIn={() => { if (!done) setPressing(true) }}
        onPressOut={() => { if (!done) setPressing(false) }}
        onPress={() => {

          if (done) return;

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

  // text to flash after touch release
  textFlash: PropTypes.string,
  
  // hold duration is ms
  duration: PropTypes.number,

  // should there be an haptic feedback
  // once finished on mobile devices ?
  hapticFeedback: PropTypes.bool,

  // after completing the touch, should
  // the bar roll back and allow another press ?
  multiuse: PropTypes.bool,

  // callback once long press finishes
  onComplete: PropTypes.func,  
};

const styles = StyleSheet.create({
  wrapper: sharedStyles.wrapper,
  container: sharedStyles.container,
  text: sharedStyles.text,
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
})

export default LongPressButton;
