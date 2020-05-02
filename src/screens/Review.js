import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { StyleSheet, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';
import wk from 'src/models/wk';
import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import Card from 'src/components/Card/Card';
import Deck from 'src/components/Deck/Deck';
import Loading from 'src/screens/Loading';
import storage from 'src/models/storage';
import resource, { r } from 'src/models/resource';
import usePromise from 'src/hooks/usePromise';
import listToDict from 'src/utils/listToDict';

const Review = () => {

  const { showActionSheetWithOptions } = useActionSheet();
  const [ reviews, setReviews ] = useState([]);
  const [ subjectsDict, setSubjectsDict ] = useState({});

  const {
    err: reviewMaterialError,
    loading: reviewMaterialLoading,
  } = usePromise(() => wk.loadReviewMaterial(), {
    immediate: true,
    onSuccess: ({ reviews, subjects }) => {
      console.log('reviews', reviews);
      console.log('subjects', subjects);
      setReviews(reviews);
      setSubjectsDict(listToDict(subjects));
    },
  });

  if (reviewMaterialLoading) {
    return <Loading />;
  }
  
  // TODO: build an error screen
  if (reviewMaterialError) {
    return (
      <Loading
        title="Failed to Load Reviews"
        description={
          "Note for developer: Please build an error screen. " +
          "This is the loading screen"
        }
      />
    );
  }

  return (
    <Page scroll={false}>
      <View style={styles.deckWrapper}>
        <Deck
          dismiss={id => {
            setReviews(reviews.filter(c => c.id !== id))
          }} 
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
              options: ['Cancel', 'Logout', 'Clear'],
              destructiveButtonIndex: 1,
              cancelButtonIndex: 0,
            }, buttonIndex => {
              if (buttonIndex === 1) {
                wk.logout();
              }
              if (buttonIndex === 2) {
                storage.clear();
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