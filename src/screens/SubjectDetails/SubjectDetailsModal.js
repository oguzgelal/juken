import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Modal, { DURATION_SAFE } from 'src/components/Modal/Modal';
import SubjectDetails from 'src/screens/SubjectDetails/SubjectDetails';

const SubjectDetailsModal = ({ visible, ...props }) => (
  <Modal visible={visible} close={props.close}>
    <SubjectDetails {...props} />
  </Modal>
);

SubjectDetailsModal.propTypes = {
};

const styles = StyleSheet.create({
  wrapper: {}
})

export default SubjectDetailsModal;
