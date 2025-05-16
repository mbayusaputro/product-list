import React, { FC } from "react";
import { View, StyleSheet, Modal } from "react-native";
import Text from "../atoms/Text";
import Button from "../atoms/Button";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

const CustomModal: FC<CustomModalProps> = ({
  visible,
  onClose,
  title = "Successful!",
  message = "You have successfully updated\nyour cart list!",
  buttonText = "OK",
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      {/* Modal Content */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text variant="semiBold" style={styles.modalTitle}>
            {title}
          </Text>
          <Text style={styles.modalMessage}>{message}</Text>

          <Button title={buttonText} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  modalMessage: {
    marginBottom: 25,
    textAlign: "center",
    lineHeight: 24,
  },
});

export default CustomModal;
