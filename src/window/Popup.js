// Popup.js
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import commonStyles from '../styles/Common';

const Popup = ({ visible, onClose }) => {
  const [title,setTitle] = useState('');
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => onClose(title)}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>:שם הקטגוריה</Text>
          <TextInput
              style={commonStyles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
          />          
          <TouchableOpacity style={commonStyles.button} onPress={()=>onClose(title)}>
            <Text style={commonStyles.buttonText}>הוסף</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  closeButton: {
    alignSelf: 'flex-end',
  },
  
});

export default Popup;
