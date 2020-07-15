import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import theme from 'src/common/theme';
import {
  KANJI,
  RADICAL,
  VOCAB,
  READING,
  MEANING,
} from 'src/common/constants';

const TextWithMarkups = ({ text = "", style = [] }) => {

  // "lorem <radical>ipsum</radical> dolor sit amet!"
  // ["lorem", "<radical>", "ipsum", "dolor", "sit", "amet!"]
  const parts = useMemo(() => {
    const r = new RegExp(/(<.*?>)(.*?)<\/.*?>/gi);
    return text.split(r);
  }, [text, styles]);
  
  return (
    <Text>
      {parts.map((part, i) => {
        // there are other tag syntaxes that aren't
        // mentioned the docs (ie. <ja>..</ja>) so
        // make sure to take out all tags
        if (part.match(/<.*?>/gi)) return null;
        
        return (
          <Text
            style={[
              ...style,
              parts[i - 1] === '<radical>' ? styles[RADICAL] : null,
              parts[i - 1] === '<kanji>' ? styles[KANJI] : null,
              parts[i - 1] === '<vocabulary>' ? styles[VOCAB] : null,
              parts[i - 1] === '<meaning>' ? styles[MEANING] : null,
              parts[i - 1] === '<reading>' ? styles[READING] : null,
            ].filter(Boolean)}
          >
            {part}
          </Text>
        )
      }).filter(Boolean)}
    </Text>
  );
};

TextWithMarkups.propTypes = {
  text: PropTypes.string,
  style: PropTypes.array,
};

const styles = StyleSheet.create({
  [KANJI]: {
    backgroundColor: theme.color.kanji,
    color: theme.palette.white,
  },
  [VOCAB]: {
    backgroundColor: theme.color.vocab,
    color: theme.palette.white,
  },
  [RADICAL]: {
    backgroundColor: theme.color.radical,
    color: theme.palette.white,
  },
  [READING]: {
    backgroundColor: theme.color.githubBlack,
    color: theme.palette.white,
  },
  [MEANING]: {
    backgroundColor: theme.color.githubBlack,
    color: theme.palette.white,
  },
})

export default TextWithMarkups;
