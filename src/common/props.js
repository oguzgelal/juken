import PropTypes from 'prop-types';
import {
  TYPE_KANJI,
  TYPE_RADICAL,
  TYPE_VOCAB,
} from 'src/common/constants';

export const cardProps = PropTypes.shape({
  type: PropTypes.oneOf([
    TYPE_RADICAL,
    TYPE_KANJI,
    TYPE_VOCAB,
  ])
})