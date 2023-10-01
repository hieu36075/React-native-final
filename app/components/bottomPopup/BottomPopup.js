// ModalComponent.js
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ModalComponent = ({ visible, onClose, onOk, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            {/* <TouchableOpacity onPress={onClose} style={styles.footerButton}>
              <Text style={styles.footerButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOk} style={styles.footerButton}>
              <Text style={styles.footerButtonText}>OK</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.modalInnerContent}>
            {children}
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity  style={styles.submitContainer} onPress={onOk}>
            <Text style={{color:'white'}}>Submit</Text>
            </TouchableOpacity >
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10, // Add padding at the top
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
  },
  modalHeader: {
    // alignItems: '',
    justifyContent: "space-between",
    flexDirection: 'row',

  },
  modalInnerContent: {
    marginBottom:5
  },
  modalFooter: {
    flexDirection: "row",
    // justifyContent: 'flex-end',
    padding: 10, // Add padding for the buttons
  },
  footerButton: {
    margin: 10
  },
  footerButtonText: {
    color: "blue",
  },
  submitContainer:{
    borderRadius:20,  
    backgroundColor:'#2B9FDC',
    height:45,
    width:'100%',
    marginVertical:10,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default ModalComponent;
