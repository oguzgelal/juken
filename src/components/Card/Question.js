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
    
    {/* question */}
    <View style={styles.question}>
      <Text
        style={[
          styles.questionText,
          styles[card.type]
        ]}
      >
        虫
      </Text>
    </View>

    {/* separator */}
    <View style={styles.separator} />
    
    {/* statement */}
    <View style={styles.statement}>
      <Text style={styles.statementText}>
        Reading
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
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 52,
  },
  separator: {
    width: '50%',
    margin: 'auto',
    height: 1,
    backgroundColor: theme.palette.lightGray,
    marginBottom: 12,
    marginTop: 0
  },
  statement: {
  },
  statementText: {
    color: theme.palette.black,
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '700',
    
  },
  [TYPE_KANJI]: { color: theme.color.kanji },
  [TYPE_RADICAL]: { color: theme.color.radical },
  [TYPE_VOCAB]: { color: theme.color.vocab },
})

export default Question;
