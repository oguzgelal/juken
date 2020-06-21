import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import List from 'src/components/List/ListWrapper';
import ListItem from 'src/components/List/ListItem';

const ListComponent = ({ list, lists = [] }) => {
  const useList = Array.isArray(lists) && lists.length > 0 ? lists : [list];

  return (
    <>
      {useList.filter(Boolean).map((l, i) => (
        <List
          key={`list-${i}`}
          title={l.title}
        >
          {(l.items || []).map((item, index) => (
            <ListItem
              key={item.id}
              topDivider
              bottomDivider={index === l.items.length - 1}
              {...item}
            />
          ))}
        </List>
      ))}
    </>
  )
};

ListComponent.propTypes = {
  list: PropTypes.object,
  lists: PropTypes.array,
};

const styles = StyleSheet.create({
  wrapper: {}
})

export default ListComponent;
