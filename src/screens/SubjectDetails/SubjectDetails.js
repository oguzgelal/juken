import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Radical from 'src/components/Radical/Radical';
import Subject from 'src/components/Subject/Subject';
import Collapsible from 'src/components/Collapsible/Collapsible';
import theme from 'src/common/theme';
import freeSubjects from 'src/mock/freeSubjects';

import {
  KANJI,
  RADICAL,
  VOCAB,
  READING,
  TERMINOLOGY,
} from 'src/common/constants';

const SubjectSectionAnswers = ({ style, answers = [], renderMain }) => {
  return (
    <View style={[ style, styles.sectionAnswers ]}>
      {answers.map((item, ind) => {
        const last = ind === answers.length - 1;
        const primary = item.primary;
        return (
          <Text
            key={ind}
            style={[
              styles.sectionAnswer,
              last ? styles.sectionAnswerLast : {},
              primary ? styles.sectionAnswerPrimary : {},
            ]}
          >
            {renderMain(item)}{last ? '' : ','}
          </Text>
        )
      })}             
    </View>
  )
};

const SubjectDetails = (/**{ subject }**/) => {

  const [ readingOpen, setReadingOpen ] = useState(false);
  const subject = freeSubjects[1];

  const id = _.get(subject, 'id');
  const subjectCharacters = _.get(subject, 'data.characters');
  const subjectType = _.get(subject, 'object');
  
  const subjectMeanings = _.get(subject, 'data.meanings') || [];
  const subjectMeaningMnemonic = _.get(subject, 'data.meaning_mnemonic');
  const subjectMeaningHint = _.get(subject, 'data.meaning_hint');
  
  const subjectReadings = _.get(subject, 'data.readings') || [];
  const subjectReadingMnemonic = _.get(subject, 'data.reading_mnemonic');
  const subjectReadingHint = _.get(subject, 'data.reading_hint');
  
  return (
    <View style={styles.wrapper}>

      {/** subject type */}
      <View style={styles.subjectTypeWrapper}>
        <Text style={styles.subjectType}>{KANJI}</Text>
      </View>

      {/** subject */}
      <View style={styles.subjectWrapper}>
        <Subject
          subjectCharacters={subjectCharacters || <Radical subject={subject} />}
          subjectType={KANJI}
        />
      </View>

      {/** meaning */}
      <View style={styles.section}>
        <Collapsible
          title="Meaning"
          contents={(
            <View>
              <SubjectSectionAnswers
                answers={subjectMeanings}
                renderMain={item => item.meaning}
              />
              {subjectMeaningMnemonic && (
                <>
                <Text style={[styles.sectionRow, styles.sectionSubTitle]}>Mnemonic</Text>
                <Text style={[styles.sectionRow, styles.sectionText]}>{subjectMeaningMnemonic}</Text>
                </>
              )}
              {subjectMeaningHint && (
                <>
                <Text style={[styles.sectionRow, styles.sectionSubTitle]}>Hint</Text>
                <Text style={[styles.sectionRow, styles.sectionText]}>{subjectMeaningHint}</Text>
                </>
              )}
            </View>
          )}
        />
      </View>

      {/** reading */}
      <View style={styles.section}>
        <Collapsible
          title="Reading"
          contents={(
            <View>
              <SubjectSectionAnswers
                answers={subjectReadings}
                renderMain={item => item.reading}
              />
              {subjectReadingMnemonic && (
                <>
                <Text style={[styles.sectionRow, styles.sectionSubTitle]}>Mnemonic</Text>
                <Text style={[styles.sectionRow, styles.sectionText]}>{subjectReadingMnemonic}</Text>
                </>
              )}
              {subjectReadingHint && (
                <>
                <Text style={[styles.sectionRow, styles.sectionSubTitle]}>Hint</Text>
                <Text style={[styles.sectionRow, styles.sectionText]}>{subjectReadingHint}</Text>
                </>
              )}
            </View>
          )}
        />
      </View>

    </View>
  )
};

SubjectDetails.propTypes = {
  // full subject data
  subject: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 22,
  },
  
  // subject type
  subjectTypeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  subjectType: {
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: '700',
    color: theme.palette.gray,
  },

  // subject
  subjectWrapper: {
    marginBottom: 12,
  },

  // sections
  section: {
    marginTop: 12,
  },
  // section answers
  sectionAnswers: {
    flex: 1,
    flexDirection: 'row',
  },
  sectionAnswer: {
    fontSize: 18,
    marginRight: 8,
    marginBottom: 4,
    color: theme.palette.darkGray,
  },
  sectionAnswerLast: { marginRight: 0 },
  sectionAnswerPrimary: { color: theme.palette.black },
  sectionRow: { marginTop: 4 },
  sectionText: { fontSize: 12, },
  sectionSubTitle: {
    marginTop: 8,
    fontSize: 12,
    color: theme.palette.gray,
  },
})

export default SubjectDetails;
