import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import theme from 'src/common/theme';
import CardCover from 'src/components/Card/CardCover';

const Card = ({
  children,
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
      <View style={styles.container}>
        {children}
      </View>

    </View>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  getClearInterpolation: PropTypes.func,
  getMovementInterpolation: PropTypes.func,
  isFirstCard: PropTypes.bool,
  isSecondCard: PropTypes.bool,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.bg.card,
    position: 'relative',
  },
  container: {
    padding: theme.space.card,
  },
  
})

export default Card;