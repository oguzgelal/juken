import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { StyleSheet, View, Image } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import sheet from 'src/utils/sheet';
import theme from 'src/common/theme';
import Page from 'src/components/Page/PageNew';
import Button from 'src/components/Button/Button';
import Card from 'src/components/Card/Card';
import Deck from 'src/components/Deck/Deck';
import Message from 'src/screens/Message';
import useReview from 'src/features/reviews/useReview';
import { logout } from 'src/features/wk/api';
import { useWkFn } from 'src/features/wk/hooks';
import extractSubject from 'src/utils/extractSubject';

const STAGE_SIZE = 5;
const RENDER_SIZE = 2;

const Review = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [ staged, setStaged ] = useState([]);
  const logoutFn = useWkFn(logout);

  const {
    queue,
    reviewLoading,
    subjectsDict,
  } = useReview();

  useEffect(() => {
    const queueSize = queue.length;
    const stageSize = (queueSize > STAGE_SIZE) ? STAGE_SIZE : queueSize;
    const fillSize = (stageSize - RENDER_SIZE) > 0
      ? stageSize - RENDER_SIZE
      : 0;
    
    console.log('queueSize', queueSize);
    console.log('fillSize', fillSize);

    setStaged(queue
      .slice(0, RENDER_SIZE)
      .concat(new Array(fillSize)
        .fill(null)
        .map(() => ({ id: Math.random() }))));

  }, [queue]);

  console.log('staged', staged);

  const deck = useMemo(() => (
    <Deck
      // dismiss={id => { setReviews(reviews.filter(c => c.id !== id)) }} 
      dismiss={() => {}}
      cards={staged}
      renderCard={(data, props) => {
        
        // empty cards
        if (!data) return <Card empty key={`empty-card-${props.index}`} />

        const { review, reviewType } = data;
        const subjectId = get(review, 'data.subject_id');
        const subject = get(subjectsDict, subjectId);
        const subjectType = get(subject, 'object');
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
  ), [staged]);


  if (reviewLoading) {
    return <Message loading />;
  }


  // 156348784
  return (
    <Page style={styles.page}>
      
      {/**
      <Radical
        src="https://cdn.wanikani.com/images/1191-subject-177-normal-weight-black-128px.png?1520987957"
        style={{
          width: 50,
          height: 50
        }}
      />
      */}

      <View style={styles.deckWrapper}>
        {deck}
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
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.bg.body,
  },
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