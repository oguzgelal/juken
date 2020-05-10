import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { StyleSheet, View, Image } from 'react-native';
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
  } = useReview();


  if (reviewLoading) {
    return <Message loading />;
  }

  return (
    <Page style={styles.page}>
      <View style={styles.deckWrapper}>
        <Deck
          style={styles.deck}
          cards={queue}
          dismissCard={direction => {
            submitAnswer(direction === 'right');
          }}
          renderCard={(item, props) => {
            
            // empty cards
            if (!item) return <Card empty />

            const { review, reviewType } = item;
            const reviewId = _.get(review, 'id');
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
        <View style={styles.bars}>
          <Bar
            style={styles.bar}
            values={[ 20, 80 ]}
            colors={[ theme.palette.red, theme.palette.green ]}
          />
          <Bar
            style={[ styles.bar, { marginTop: 4 } ]}
            values={[ 30, 70 ]}
            colors={[ theme.palette.red, theme.palette.green ]}
          />
        </View>
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
  },
  bars: {
    flexShrink: 0,
    marginTop: 18,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {

  }
})

export default Review;