import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

const Radical = props => {
  return (
    <Image
      source={{ uri: props.src }}
      style={props.style}
    />
  )
};

Radical.propTypes = {
  src: PropTypes.string,
  style: PropTypes.object,
};

export default Radical;
