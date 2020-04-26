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

const CardHeader = ({ card = {} }) => (
  <View
    style={[
      styles.wrapper,
      card.type === TYPE_KANJI && styles.kanji,
      card.type === TYPE_RADICAL && styles.radical,
      card.type === TYPE_VOCAB && styles.vocab,
    ].filter(Boolean)}
  >
    <Text style={styles.text}>金</Text>
  </View>
);

CardHeader.propTypes = {
  card: cardProps
};

const styles = StyleSheet.create({
  wrapper: {
    flexShrink: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 6,
  },
  text: {
    padding: 8,
    // color: theme._palette.white,
    color: theme.color.kanji,
    fontWeight: 'bold',
    fontSize: 52,
  },
  kanji: { /* backgroundColor: theme.color.kanji */ },
  vocab: { /* backgroundColor: theme.color.vocab */ },
  radical: { /* backgroundColor: theme.color.radical */ },
})

export default CardHeader;
