import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import device from 'src/utils/device';
import theme from 'src/common/theme';
import Page from 'src/components/Page/Page';
import Bar from 'src/components/Bar/Bar';
import Card from 'src/components/Card/Card';
import Deck from 'src/components/Deck/Deck';
import Overlay from 'src/components/Overlay/Overlay';
import Toast, { TYPES } from 'src/components/Toast/Toast';
import SrsStages from 'src/components/Toast/SrsStages';
import Message from 'src/screens/Message/Message';
import useReview from 'src/features/reviews/useReview';
import useScrollLock from 'src/hooks/useScrollLock';
import useLeaveWarning from 'src/hooks/useLeaveWarning';
import useNetworkListener from 'src/hooks/useNetworkListener';
import { useWkFn, useWk } from 'src/features/wk/hooks';
import { getReviewMaterial, getReviewMaterialDemo, submitReview, logout } from 'src/features/wk/api';
import Button from 'src/components/Button/Button';
import extractSubject from 'src/utils/extractSubject';

const Review = ({ demo = false, appleDemo = false, stopDemo } = {}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [ reviews, setReviews ] = useState(null);
  const [ subjects, setSubjects ] = useState(null);
  const [ displayResults, setDisplayResults ] = useState(false);
  const [ submitError, setSubmitError ] = useState(null);
  const [ srsStages, setSrsStages ] = useState({});
  const isInternetReachable = useNetworkListener();
  const resubmitSuccess = useRef(null);

  useScrollLock();
  useLeaveWarning();

  const [ submitReviewFn, submittingReview ] = useWk(submitReview, {
    onSuccess: ({ isResubmitting }) => {
      setSubmitError(null);
      if (isResubmitting) {
        resubmitSuccess.current.show('Success!')
      }
    },
    onError: ({ objectToResubmitOnError } = {}) => {
      const subjectId = _.get(objectToResubmitOnError, 'subjectId');
      const subject = _.get(subjectsDict, subjectId);
      const subjectType = _.get(subject, 'object');
      const { characters, type } = extractSubject(subject, subjectType);
      setSubmitError({
        objectToResubmitOnError,
        errSubjectCharacters: characters,
        errSubjectType: type,
      });
    },
  })
  const logoutFn = useWkFn(logout);

  // load reviews
  const getReviewMaterialFn = demo ? getReviewMaterialDemo : getReviewMaterial;
  const [ loadReviewsFn, reviewsLoading ] = useWk(getReviewMaterialFn, {
    onSuccess: ({ reviews: _reviews, subjects: _subjects }) => {
      setReviews(_reviews.slice());
      setSubjects(_subjects.slice());
    }
  }, { immediate: true });

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
  
  // once results are loaded and reviews are queued
  // set display to true
  useEffect(() => {
    if (!reviewsLoading) {
      setDisplayResults(true);
    }
  }, [queue]);

  const isQueueClear = queue.length === 0 && displayResults;
  const refreshFn = () => {
    setDisplayResults(false);
    loadReviewsFn();
  };

  if (reviewsLoading) {
    return <Message loading />;
  }

  return (
    <>

    {/** resubmission success */}
    <Toast
      ref={resubmitSuccess}
      type={TYPES.SUCCESS}
      position="top"
    />

    {/** cannot connect to the internet view */}
    {!isInternetReachable && (
      <Overlay>
        <Message
          error
          title="No Internet Connection"
          style={styles.pageCover}
          description={
            "You can continue your reviews from where you're left off once your " +
            "connection is back! Please do not close the app " +
            (device('web') ? "or refresh the page " : "") + "to prevent from losing half finished " +
            "reviews. Note that this does not effect the reviews you have submitted " +
            "in this session so far."
          }
        />
      </Overlay>
    )}

    {
      isInternetReachable &&
      submitError &&
      (
        <Overlay>
          <Message
            icon={_.get(submitError, 'errSubjectCharacters')}
            error={!!!_.get(submitError, 'errSubjectCharacters')}
            title="Failed to Submit"
            style={styles.pageCover}
            description={
              `We failed to submit ${_.get(submitError, 'errSubjectCharacters') || 'your last'} ${_.get(submitError, 'errSubjectType') || ''} review to WaniKani. ` +
              (_.get(stats, 'reviews.completed') - 1 > 0 ? `${_.get(stats, 'reviews.completed')  - 1} reviews you completed were submitted successfully. ` : '') +
              (_.get(stats, 'reviews.unfinished') > 0
                ? (`${_.get(stats, 'reviews.unfinished')} half finished reviews will be lost if you close the app` + (device('web') ? " or refresh the page" : "") + '.')
                : 'You have no half finished reviews so you will not lose any data. You can try again or safely close the app and continue later.'
              )
            }
            ctas={[
              {
                id: 'err-btn-retry',
                text: submittingReview ? 'Retrying...' : 'Retry',
                style: { marginTop: 32 },
                onPress: () => {
                  submitReviewFn({
                    resubmit: _.get(submitError, 'objectToResubmitOnError')
                  })
                },
                iconRight: submittingReview
                  ? <ActivityIndicator size={24} color={theme.palette.black} />
                  : null
              },
              {
                id: 'err-btn-ignore',
                text: 'Ignore',
                style: {
                  marginTop: 4,
                  backgroundColor: 'transparent',
                },
                textStyle: {
                  color: theme.palette.white,
                },
                onPress: () => {
                  setSubmitError(null);
                }
              }
            ]}
          />
        </Overlay>
      )
    }
    
    {/** display srs stages toasts */}
    <SrsStages stages={srsStages} />

    <Page
      style={[
        styles.page,
        isQueueClear && styles.pageNoReviews
      ]}
    >
      <View style={styles.deckWrapper}>

        {/* render deck */}
        {queue.length > 0 && (
          <Deck
            style={styles.deck}
            cards={queue}
            dismissCard={direction => {
              submitAnswer(
                // right direction means correct answer
                direction === 'right',
                // callback for when the submit answer causes
                // the review to be completed
                res => {

                const {
                  review,
                  incorrectMeanings,
                  incorrectReadings,
                } = res;

                // review was correct when there are
                // no incorrect readings or meanings
                const isCorrect = (
                  !incorrectMeanings &&
                  !incorrectReadings
                );
                
                // increase srs stage if the answer was correct
                if (isCorrect) {
                  const currentStage = _.get(review, 'data.srs_stage');
                  setSrsStages({ current: currentStage, next: currentStage + 1 })
                }

                // do not submit to wanikani on demo mode
                if (demo) return;

                // submit review
                submitReviewFn({
                  subjectId: _.get(review, 'data.subject_id'),
                  reviewId: review.id,
                  incorrectMeanings,
                  incorrectReadings,
                });
              });
            }}
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
        )}

        {/* no reviews notice */}
        {isQueueClear && (
          <View style={styles.noReviewsContainer}>
            <AntDesign name="smileo" size={32} color={theme.palette.white} />
            <Text style={styles.noReviewsText}>Review queue clear!</Text>
          </View>
        )}
          
        {/* stats */}
        {totalReviews > 0 && (
          <TouchableWithoutFeedback
            onPress={() => {
              showActionSheetWithOptions({
                options: [
                  'Cancel',
                  'Refresh',
                  demo ? (appleDemo ? 'Logout' : 'Back to Main Menu') : 'Logout'
                ],
                destructiveButtonIndex: 2,
              }, buttonIndex => {
                if (buttonIndex === 1) {
                  if (device('web')) {
                    if (confirm('Half completed reviews will be lost. Are you sure ?')) {
                      refreshFn()
                    }
                  }
                  else {
                    Alert.alert('Are you sure ?', 'Half completed reviews will be lost', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'OK', onPress: () => refreshFn() },
                  ])
                  }
                }
                if (buttonIndex === 2) {
                  if (demo) stopDemo();
                  else logoutFn();
                }
              })
            }}
          >
            <View style={[ styles.box, styles.bars ]}>
              
              {/* review bar */}
              <View style={styles.barWrapper}>
                <Text style={[ styles.barText, styles.barTextLabel, styles.barTextOpac, { marginRight: 8 } ]}>Reviews</Text>
                <Bar
                  style={styles.bar}
                  values={[ _.get(stats, 'reviews.incorrectPercent', 0), _.get(stats, 'reviews.correctPercent', 0) ]}
                  colors={[ theme.palette.red, theme.palette.green ]}
                />
                <Text style={[ styles.barText, { marginLeft: 8 } ]}>{_.get(stats, 'reviews.completed')}</Text>
                {_.get(stats, 'reviews.unfinished') > 0 && (
                  <Text style={[ styles.barText, styles.barTextOpac, { fontSize: 8, marginTop: -12 } ]}>{_.get(stats, 'reviews.unfinished')}</Text>
                )}
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
        )}

        {/* controls */}
        {isQueueClear && (
          <>
            <Button
              text="Refresh"
              style={{ marginTop: 12 }}
              iconLeft={<Ionicons name="md-refresh" size={24} color={theme.color.black} />}
              onPress={() => refreshFn()}
            />
            {(!demo || (demo && appleDemo)) && (
              <Button
                text="Logout"
                style={{ marginTop: 8, backgroundColor: 'transparent' }}
                textStyle={{ color: theme.palette.white }}
                onPress={() => stopDemo()}
              />
            )}
            {(demo && !appleDemo) && (
              <Button
                text="Back to Main Menu"
                style={{ marginTop: 8, backgroundColor: 'transparent' }}
                textStyle={{ color: theme.palette.white }}
                iconLeft={<AntDesign name="arrowleft" size={24} color={theme.palette.white} />}
                onPress={() => stopDemo()}
              />
            )}
          </>
        )}
      </View>
    </Page>
    </>
  )
};

Review.propTypes = {
  demo: PropTypes.bool,
  stopDemo: PropTypes.func,
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
  pageNoReviews: {
    backgroundColor: theme.palette.green,
  },
  pageCover: device({
    web: { backgroundColor: 'rgba(0, 0, 0, .9)' },
    mobile: { backgroundColor: 'rgba(0, 0, 0, .8)' },
  }),
  noReviewsContainer: {
    textAlign: 'center',
    marginBottom: 12,
    alignItems: 'center',
  },
  noReviewsText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 12,
    color: theme.palette.white,
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
  box: {
    width: '100%',
    backgroundColor: theme.palette.white,
    padding: theme.padding.card,
    borderRadius: theme.radius.card,
  },
  bars: device({
    base: {
      flexShrink: 0,
      marginTop: 12,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    web: {
      userSelect: 'none',
    }
  }),
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