import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import device from 'src/utils/device';
import theme from 'src/common/theme';
import Page from 'src/components/Page/Page';
import Button from 'src/components/Button/Button';
import Bar from 'src/components/Bar/Bar';
import Card from 'src/components/Card/Card';
import Deck from 'src/components/Deck/Deck';
import Message from 'src/screens/Message/Message';
import useReview from 'src/features/reviews/useReview';
import { logout } from 'src/features/wk/api';
import { useWkFn } from 'src/features/wk/hooks';
import extractSubject from 'src/utils/extractSubject';

const Review = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [ staged, setStaged ] = useState([]);
  const logoutFn = useWkFn(logout);

  const {
    queue,
    submitAnswer,
    reviewLoading,
    subjectsDict,
    totalCards,
    completedCards,
    completedReviews,
    totalReviews,
    incorrectCards,
    incorrectReviews,
  } = useReview();

  // calculate stats
  const stats = useMemo(() => {
    
    const totalCompletedCards = Object.keys(completedCards).length;
    const totalCompletedReviews = Object.keys(completedReviews).length;
    let totalCorrectCards = 0;
    let totalIncorrectCards = 0;
    let totalCorrectReviews = 0;
    let totalIncorrectReviews = 0;
    let correctCardsPercent = 0;
    let incorrectCardsPercent = 0;
    let correctReviewsPercent = 0;
    let incorrectReviewsPercent = 0;

    if (totalCompletedCards !== 0) {
      const completed = Object.keys(completedCards);
      totalIncorrectCards = completed.reduce((acc, id) => acc + (incorrectCards[id] ? 1 : 0), 0);
      totalCorrectCards = totalCompletedCards - totalIncorrectCards;
      incorrectCardsPercent = Math.round((totalIncorrectCards / totalCompletedCards) * 100);
      correctCardsPercent = 100 - incorrectCardsPercent;
    }

    if (totalCompletedReviews !== 0) {
      const completed = Object.keys(completedReviews);
      totalIncorrectReviews = completed.reduce((acc, id) => acc + (incorrectReviews[id] ? 1 : 0), 0);
      totalCorrectReviews = totalCompletedReviews - totalIncorrectReviews;
      incorrectReviewsPercent = Math.round((totalIncorrectReviews / totalCompletedReviews) * 100);
      correctReviewsPercent = 100 - incorrectReviewsPercent;
    }

    return {
      cards: {
        completed: totalCompletedCards,
        correct: totalCorrectCards,
        incorrect: totalIncorrectCards,
        correctPercent: correctCardsPercent,
        incorrectPercent: incorrectCardsPercent,
      },
      reviews: {
        completed: totalCompletedReviews,
        correct: totalCorrectReviews,
        incorrect: totalIncorrectReviews,
        correctPercent: correctReviewsPercent,
        incorrectPercent: incorrectReviewsPercent,
      }
    };
  }, [
    completedCards,
    completedReviews,
    incorrectCards,
    incorrectReviews,
  ]);

  if (reviewLoading) {
    return <Message loading />;
  }

  return (
    <Page style={styles.page}>
      <View style={styles.deckWrapper}>
        <Deck
          style={styles.deck}
          cards={queue}
          dismissCard={direction => { submitAnswer(direction === 'right'); }}
          renderCard={(item, props) => {
            
            // empty cards
            if (!item) return <Card empty />

            const { id, review, reviewType } = item;
            const subjectId = _.get(review, 'data.subject_id');
            const subject = _.get(subjectsDict, subjectId);
            const subjectType = _.get(subject, 'object');
            const {
              question,
              questionComponent,
              answer,
            } = extractSubject(subject, reviewType);

            return (
              <Card
                key={id}
                deckProps={props}
                subjectType={subjectType}
                reviewType={reviewType}
                reviewQuestion={question}
                reviewQuestionComponent={questionComponent}
                reviewAnswer={answer}
              />
            )
          }}
        />
        
        <TouchableWithoutFeedback
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
        >
          <View style={styles.bars}>
            
            {/* card bar */}
            <View style={styles.barWrapper}>
              <Text style={[ styles.barText, styles.barTextOpac, { marginRight: 8 } ]}>Cards</Text>
              <Bar
                style={styles.bar}
                values={[ _.get(stats, 'cards.incorrectPercent', 0), _.get(stats, 'cards.correctPercent', 0) ]}
                colors={[ theme.palette.red, theme.palette.green ]}
              />
              <Text style={[ styles.barText, { marginLeft: 8 } ]}>{_.get(stats, 'cards.completed')}</Text>
              <Text style={[ styles.barText, styles.barTextOpac, { marginLeft: 4, marginRight: 4 } ]}>of</Text>
              <Text style={[ styles.barText ]}>{totalCards}</Text>
            </View>
            
            {/* review bar */}
            <View style={[styles.barWrapper, { marginTop: 4 }]}>
              <Text style={[ styles.barText, styles.barTextOpac, { marginRight: 8 } ]}>Reviews</Text>
              <Bar
                style={styles.bar}
                values={[ _.get(stats, 'reviews.incorrectPercent', 0), _.get(stats, 'reviews.correctPercent', 0) ]}
                colors={[ theme.palette.red, theme.palette.green ]}
              />
              <Text style={[ styles.barText, { marginLeft: 8 } ]}>{_.get(stats, 'reviews.completed')}</Text>
              <Text style={[ styles.barText, styles.barTextOpac, { marginLeft: 4, marginRight: 4 } ]}>of</Text>
              <Text style={[ styles.barText ]}>{totalReviews}</Text>
            </View>
            
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Page>
  )
};

Review.propTypes = {
};

const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.bg.body,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckWrapper: {
    flex: 8,
    flexGrow: 1,
    maxWidth: 420,
    width: '100%',
    height: '100%',
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deck: {
    width: '100%',
    height: '100%',
    maxHeight: 620,
    zIndex: 9,
  },
  bars: {
    flexShrink: 0,
    marginTop: 18,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: theme.palette.white,
    padding: theme.padding.card,
    borderRadius: theme.radius.card,
  },
  barWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  bar: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'rgba(0, 0, 0, .1)'
  },
  barText: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
    color: theme.palette.black,
  },
  barTextOpac: { opacity: 0.5 },
})

export default Review;