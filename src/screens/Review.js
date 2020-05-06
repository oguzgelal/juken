import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { StyleSheet, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import useReview from 'src/hooks/useReview';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';
import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import Card from 'src/components/Card/Card';
import Deck from 'src/components/Deck/Deck';
import Loading from 'src/screens/Loading';

import { logout } from 'src/features/wk/api';
import { useWkFn } from 'src/features/wk/hooks';

const Review = () => {

  const { showActionSheetWithOptions } = useActionSheet();
  const logoutFn = useWkFn(logout);

  /*
  const {
    reviews,
    reviewLoading,
    subjects,
    submit,
  } = useReview();
  */

  const reviews = [];

  if (materialLoading) {
    return <Loading />;
  }

  return (
    <Page scroll={false}>
      <View style={styles.deckWrapper}>
        <Deck
          // dismiss={id => { setReviews(reviews.filter(c => c.id !== id)) }} 
          dismiss={() => {}}
          cards={reviews.map(review => ({
            id: review.id,
            renderCard: props => {
              const subjectId = get(review, 'data.subject_id');
              const subject = get(subjectsDict, subjectId);
              const card = {
                type: get(review, 'data.subject_type'),
                questionText: get(subject, 'data.characters'),
              };
              return (
                <Card {...props} card={card} />
              )
            }
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
            }, buttonIndex => {
              if (buttonIndex === 1) {
                logoutFn();
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