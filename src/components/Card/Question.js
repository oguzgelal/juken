import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { cardProps } from 'src/common/props';
import theme from 'src/common/theme';
import {
  TYPE_KANJI,
  TYPE_RADICAL,
  TYPE_VOCAB,
} from 'src/common/constants';

const Question = ({ card = {} }) => (
  <View style={[ styles.wrapper ]}>
    <View style={[ styles.question]}>
      <Text
        style={[
          styles.questionText,
          styles[card.type]
        ]}
      >
        金
      </Text>
    </View>
  </View>
);

Question.propTypes = {
  card: cardProps,
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexGrow: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    padding: 8,
  },
  questionText: {
    color: theme.color.kanji,
    fontWeight: 'bold',
    fontSize: 52,
  },
  [TYPE_KANJI]: { color: theme.color.kanji },
  [TYPE_RADICAL]: { color: theme.color.radical },
  [TYPE_VOCAB]: { color: theme.color.vocab },
})

export default Question;
