import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import Toast, { DURATION } from 'src/components/Toast/Toast';
import checkSrsStage from 'src/utils/checkSrsStage';

import {
  APPRENTICE,
  GURU,
  MASTER,
  ENLIGHTENED,
  BURNED,
  TERMINOLOGY,
} from 'src/common/constants';

const DUR = 1500;

const SrsStages = ({ stages } = {}) => {
  const srsApprentice = useRef(null);
  const srsGuru = useRef(null);
  const srsMaster = useRef(null);
  const srsEnlightened = useRef(null);
  const srsBurned = useRef(null);

  useEffect(() => {
    const stageChangedTo = checkSrsStage(
      _.get(stages, 'current'),
      _.get(stages, 'next')
    );
    
    if (stageChangedTo === APPRENTICE) {
      srsApprentice.current.show(TERMINOLOGY[APPRENTICE], DUR);
    }
    
    else if (stageChangedTo === GURU) {
      srsGuru.current.show(TERMINOLOGY[GURU], DUR);
    }
    
    else if (stageChangedTo === MASTER) {
      srsMaster.current.show(TERMINOLOGY[MASTER], DUR);
    }
    
    else if (stageChangedTo === ENLIGHTENED) {
      srsEnlightened.current.show(TERMINOLOGY[ENLIGHTENED], DUR);
    }
    
    else if (stageChangedTo === BURNED) {
      srsBurned.current.show(TERMINOLOGY[BURNED], DUR);
    }

    else {
      /** keep going! */
    }
  }, [stages])

  return (
    <>
      <Toast position="top" ref={srsApprentice} type={APPRENTICE} />
      <Toast position="top" ref={srsGuru} type={GURU} />
      <Toast position="top" ref={srsMaster} type={MASTER} />
      <Toast position="top" ref={srsEnlightened} type={ENLIGHTENED} />
      <Toast position="top" ref={srsBurned} type={BURNED} />
    </>
  )
};

SrsStages.propTypes = {
  stages: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {}
})

export default SrsStages;
