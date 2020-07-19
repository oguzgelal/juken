import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import theme from 'src/common/theme';
import {
  KANJI,
  RADICAL,
  VOCAB,
  READING,
  TERMINOLOGY,
} from 'src/common/constants';
import useColorScheme from 'src/hooks/useColorScheme';;

const Question = ({
  subjectType,
  reviewType,
  question,
  questionComponent,
  answer,
  revealed,
}) => {
  const colorScheme = useColorScheme();
  return (
    <View style={[styles.wrapper]}>

      {/* question */}
      <View style={styles.question}>
        <Text
          style={[
            styles.questionText,
            styles[subjectType]
          ]}
        >
          {question || questionComponent}
        </Text>
      </View>

      {/* separator */}
      <View style={[styles.separator, colorScheme === "light" ? null : styles.separator_dark]}/>

      {/* answer */}
      <View style={styles.answer}>
        <Text
          style={[
            styles.answerText,colorScheme === "light" ? null : styles.answerText_Dark,
            (
              revealed &&
              reviewType === READING &&
              styles.answerTextLarge
            ),
          ]}
        >
          {revealed && answer}
          {!revealed && TERMINOLOGY[reviewType]}
        </Text>
      </View>

    </View>
  );
};

Question.propTypes = {
  reviewType: PropTypes.string,
  question: PropTypes.string,
  answer: PropTypes.string,
  revealed: PropTypes.bool,
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
  separator: {
    width: '50%',
    margin: 'auto',
    height: 1,
    backgroundColor: theme.palette.lightGray,
    marginBottom: 12,
    marginTop: 0
  },
  separator_dark : {
    backgroundColor: theme.palette_dark.lightGray,
  },
  answer: {
    minHeight: 28,
    flexGrow: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerText: {
    textAlign: 'center',
    color: theme.palette.black,
    fontSize: 16,
    fontWeight: '700',
  },
  answerText_Dark: {
    color: theme.palette_dark.lightGray,
  },
  answerTextLarge: {
    fontSize: 20
  },
})

export default Question;
