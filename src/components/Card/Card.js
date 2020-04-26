import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import theme from 'src/common/theme';
import os from 'src/utils/os';
import sheet from 'src/utils/sheet';
import { cardProps } from 'src/common/props';
import { TERMINOLOGY } from 'src/common/constants';

import CardCover from 'src/components/Card/CardCover';
import CardHeader from 'src/components/Card/CardHeader';
import Question from 'src/components/Card/Question';
import LongPressButton from 'src/components/Button/LongPressButton';

const DirectionLeftIcon = () => (
  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
    <AntDesign name="caretleft" size={12} color={theme.color.incorrect} />
    <AntDesign name="frowno" size={20} color={theme.color.incorrect} />
  </View>
);

const DirectionRightIcon = () => (
  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
    <AntDesign name="smileo" size={20} color={theme.color.correct} />
    <AntDesign name="caretright" size={12} color={theme.color.correct} />
  </View>
);

const Card = ({
  card,
  panHandlers,
  style = [],
  isFirstCard,
  isSecondCard,
  getClearInterpolation,
  getMovementInterpolation,
}) => {

  const [ revealed, setRevealed ] = useState(false);

  return (
    <View style={[ styles.wrapper, style ]} {...panHandlers}>
      
      {/* red / green cover */}
      {isFirstCard && (
        <CardCover
          getClearInterpolation={getClearInterpolation}
        />
      )}

      {/* card contents */}
      {(isFirstCard || isSecondCard) && (
        <View style={[ styles.container ]}>

          {/* top header */}
          <CardHeader
            card={card}
            leftIcon={revealed ? <DirectionLeftIcon /> : null}
            rightIcon={revealed ? <DirectionRightIcon /> : null}
            centerText={revealed
              ? (os('desktop') ? 'Arrow Keys' : 'Swipe')
              : (TERMINOLOGY[card.type] || '')
            }
          />

          {/* question and question statement */}
          <Question card={card} />

          {/* reveal button */}
          <LongPressButton
            text="Reveal"
          />
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
      position: 'relative',
      backgroundColor: theme.bg.card,
      borderRadius: theme.radius.card,
    },
    web: {
      userSelect: 'none',
    },
  }),
  container: {
    flexGrow: 1,
    padding: theme.space.card,
  }
  
})

export default Card;