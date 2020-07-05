import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import theme from 'src/common/theme';

const Collapsible = ({
  initialCollapsedValue,
  title,
  contents,
}) => {

  const [ collapsed, setCollapsed ] = useState(initialCollapsedValue);

  return (
  <TouchableOpacity onClick={() => setCollapsed(!collapsed)}>
    <View style={styles.wrapper}>
      
      {/* header row */}
      <View
        style={[
          styles.header,
          collapsed
            ? styles.headerCollapsed
            : styles.headerExpanded,
        ]}
      >
        <Text style={styles.headerText}>
          {title}
        </Text>
      </View>
      
      {/* contents */}
      {!collapsed && (
        <View style={styles.contents}>
          {contents}
        </View>
      )}

    </View>
  </TouchableOpacity>
)
};

Collapsible.propTypes = {
  onClick: PropTypes.func,
  initialCollapsedValue: PropTypes.bool,
  
  wrapperStyle: PropTypes.object,
  wrapperStyleCollapsed: PropTypes.object,
  wrapperStyleExpanded: PropTypes.object,

  title: PropTypes.string,
  contents: PropTypes.any,
};

Collapsible.defaultProps = {
  initialCollapsedValue: false,
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.palette.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.palette.gray,
  },
  header: {
    padding: 22,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 4,
  },
  headerCollapsed: {},
  headerExpanded: {
    paddingBottom: 0
  },
  headerText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.palette.black,
  },

  contents: {
    padding: 22,
    paddingTop: 12,
  },
})

export default Collapsible;
