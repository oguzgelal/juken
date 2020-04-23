import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const Deck = ({ style = {}, cards = [] }) => (
  <View style={[styles.wrapper, style]}>    
    {cards.map(card => (
      <View key={card.id} style={styles.card}>
        {card.component}
      </View>
    ))}
  </View>
);

Deck.propTypes = {
  style: PropTypes.object,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      component: PropTypes.any,
    })
  ),
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'yellow',
  },
  card: {
    height: '100%',
  }
})

export default Deck;
