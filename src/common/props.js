import PropTypes from 'prop-types';
import {
  KANJI,
  RADICAL,
  VOCAB,
} from 'src/common/constants';

export const cardProps = PropTypes.shape({
  type: PropTypes.oneOf([
    RADICAL,
    KANJI,
    VOCAB,
  ])
})