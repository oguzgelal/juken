import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';

import Page from 'src/components/Page/Page';
import Card from 'src/components/Card/Card';
import Deck from 'src/components/Deck/Deck';

const Review = props => {
  const [ decks, setDecks ] = useState([
    { id: 'card1', text: 'card 1' },
    { id: 'card2', text: 'card 2' },
    { id: 'card3', text: 'card 3' },
    { id: 'card4', text: 'card 4' },
    { id: 'card5', text: 'card 5' },
  ])

  return (
    <Page scroll={false}>
      <View style={styles.deckWrapper}>
        <Deck
          dismiss={id => {
            setDecks(decks.filter(c => c.id !== id))
          }} 
          cards={decks.map(card => ({
            id: card.id,
            renderCard: props => (
              <Card {...props}>
                <Text>{card.text}</Text>
              </Card>
            )
          }))}
        />
      </View>
      <View style={styles.buttonsWrapper} />
    </Page>
  )
};

Review.propTypes = {
};

const styles = StyleSheet.create({
  deckWrapper: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    padding: theme.space.body,
    paddingBottom: 0,
  },
  buttonsWrapper: sheet({
    base: {
      flexShrink: 0,
      width: '100%',
    },
    web: {
      height: '10%',
      minHeight: 100,
    },
    mobile: {
      height: '22%',
      minHeight: 180,
    } 
  })
})

export default Review;