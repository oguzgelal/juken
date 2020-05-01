import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';
import wk from 'src/models/wk';

import {
  TYPE_KANJI,
  TYPE_RADICAL,
  TYPE_VOCAB,
} from 'src/common/constants';

import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import Card from 'src/components/Card/Card';
import Deck from 'src/components/Deck/Deck';
import LongPressButton from 'src/components/Button/LongPressButton';

const Review = () => {

  useEffect(() => { wk.loadReviews() }, [])
  const isLoadingReviews = wk.req.isLoading('reviews');

  const { showActionSheetWithOptions } = useActionSheet();
  const [ decks, setDecks ] = useState([
    { id: 'card1', type: TYPE_KANJI },
    { id: 'card2', type: TYPE_VOCAB },
    { id: 'card3', type: TYPE_VOCAB },
    { id: 'card4', type: TYPE_RADICAL },
    { id: 'card5', type: TYPE_VOCAB },
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
              <Card {...props} card={card} />
            )
          }))}
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <Button
          text="Options"
          onPress={() => {
            showActionSheetWithOptions({
              options: ['Cancel', 'Logout'],
              destructiveButtonIndex: 1,
              cancelButtonIndex: 0,
            }, buttonIndex => {
              if (buttonIndex === 1) {
                wk.logout();
              }
            })
          }}
        />
      </View>
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
    padding: theme.padding.body,
    paddingBottom: 0,
  },
  buttonsWrapper: sheet({
    base: {
      flexShrink: 0,
      width: '100%',
      padding: theme.padding.body,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  })
})

export default Review;