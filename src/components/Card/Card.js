import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import theme from 'src/common/theme';
import sheet from 'src/utils/sheet';
import { cardProps } from 'src/common/props';
import {
  TYPE_KANJI,
  TYPE_RADICAL,
  TYPE_VOCAB,
} from 'src/common/constants';

import CardCover from 'src/components/Card/CardCover';
import CardHeader from 'src/components/Card/CardHeader';

const Card = ({
  card,
  style = [],
  isFirstCard,
  isSecondCard,
  getClearInterpolation,
  getMovementInterpolation,
}) => {

  return (
    <View style={[ styles.wrapper, style ]}>
      
      {/* red / green cover */}
      {isFirstCard && (
        <CardCover
          getClearInterpolation={getClearInterpolation}
        />
      )}

      {/* card contents */}
      {(isFirstCard || isSecondCard) && (
        <View style={[ styles.container ]}>

          <CardHeader card={card} />

          {/**
            <View style={{ backgroundColor: 'red', width: '100%', height: 300 }} />
            <View style={{ backgroundColor: 'yellow', width: '100%', height: 300 }} />
            <View style={{ backgroundColor: 'green', width: '100%', height: 300 }} />
          */}

        </View>
      )}
      

    </View>
  );
};

Card.propTypes = {
  getClearInterpolation: PropTypes.func,
  getMovementInterpolation: PropTypes.func,
  isFirstCard: PropTypes.bool,
  isSecondCard: PropTypes.bool,
  card: cardProps,
};

const styles = StyleSheet.create({
  wrapper: sheet({
    base: {
      flex: 1,
      backgroundColor: theme.bg.card,
      position: 'relative',
    },
    web: {
      userSelect: 'none',
    }
  }),
  container: {
    flexGrow: 1,
    padding: theme.space.card,
  }
  
})

export default Card;