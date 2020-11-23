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

const Subject = ({ style, subjectCharacters, subjectType }) => (
  <Text
    style={[
      style,
      styles.subject,
      styles[subjectType]
    ]}
  >
    {subjectCharacters}
  </Text>
);

Subject.propTypes = {
  style: PropTypes.object,
  subjectCharacters: PropTypes.any,
  subjectType: PropTypes.string,
};

const styles = StyleSheet.create({
  [KANJI]: { color: theme.color.kanji },
  [RADICAL]: { color: theme.color.radical },
  [VOCAB]: { color: theme.color.vocab },
  subject: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 52,
  },
})

export default Subject;
