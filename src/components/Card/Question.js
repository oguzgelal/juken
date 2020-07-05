import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import theme from 'src/common/theme';
import Subject from 'src/components/Subject/Subject';
import { READING, TERMINOLOGY } from 'src/common/constants';

const Question = ({
  subjectType,
  reviewType,
  question,
  questionComponent,
  answer,
  revealed,
}) => (
  <View style={[ styles.wrapper ]}>
    
    {/* question */}
    <View style={styles.question}>
      <Subject
        subjectCharacters={question || questionComponent}
        subjectType={subjectType}
      />
    </View>

    {/* separator */}
    <View style={styles.separator} />
    
    {/* answer */}
    <View style={styles.answer}>
      <Text
        style={[
          styles.answerText,
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
  answerTextLarge: {
    fontSize: 20
  },
})

export default Question;
