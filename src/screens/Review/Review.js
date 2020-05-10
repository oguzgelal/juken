import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useWkLoading } from 'src/features/wk/hooks';
import { getReviewMaterial } from 'src/features/wk/api';
import theme from 'src/common/theme';
import Page from 'src/components/Page/Page';
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
  const [ reviews, setReviews ] = useState(null);
  const [ subjects, setSubjects ] = useState(null);

  const logoutFn = useWkFn(logout);

  // load reviews
  const reviewsLoading = useWkLoading(getReviewMaterial, {
    onSuccess: ({ reviews: _reviews, subjects: _subjects }) => {
      setReviews(_reviews);
      setSubjects(_subjects);
    }
  });

  const {
    queue,
    submitAnswer,
    subjectsDict,
    totalCards,
    totalReviews,
    stats,
  } = useReview(
    reviews,
    subjects,
  );


  if (reviewsLoading) {
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
            
            {/* review bar */}
            <View style={styles.barWrapper}>
              <Text style={[ styles.barText, styles.barTextLabel, styles.barTextOpac, { marginRight: 8 } ]}>Reviews</Text>
              <Bar
                style={styles.bar}
                values={[ _.get(stats, 'reviews.incorrectPercent', 0), _.get(stats, 'reviews.correctPercent', 0) ]}
                colors={[ theme.palette.red, theme.palette.green ]}
              />
              <Text style={[ styles.barText, { marginLeft: 8 } ]}>{_.get(stats, 'reviews.completed')}</Text>
              <Text style={[ styles.barText, styles.barTextOpac, { marginLeft: 4, marginRight: 4 } ]}>of</Text>
              <Text style={[ styles.barText ]}>{totalReviews}</Text>
            </View>

            {/* card bar */}
            <View style={[ styles.barWrapper, { marginTop: 4 } ]}>
              <Text style={[ styles.barText, styles.barTextLabel, styles.barTextOpac, { marginRight: 8 } ]}>Cards</Text>
              <Bar
                style={styles.bar}
                values={[ _.get(stats, 'cards.incorrectPercent', 0), _.get(stats, 'cards.correctPercent', 0) ]}
                colors={[ theme.palette.red, theme.palette.green ]}
              />
              <Text style={[ styles.barText, { marginLeft: 8 } ]}>{_.get(stats, 'cards.completed')}</Text>
              <Text style={[ styles.barText, styles.barTextOpac, { marginLeft: 4, marginRight: 4 } ]}>of</Text>
              <Text style={[ styles.barText ]}>{totalCards}</Text>
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
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: theme.palette.white,
    padding: theme.padding.card,
    borderRadius: theme.radius.card,
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  bar: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
  barText: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
    color: theme.palette.black,
  },
  barTextLabel: {
    width: 45,
  },
  barTextOpac: {
    opacity: 0.3,
  },
})

export default Review;