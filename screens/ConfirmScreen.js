import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/Card';
import Button from '../components/Button';
import colors from '../components/colors'; // Import colors

const ConfirmScreen = ({ visible, userInfo, onEdit, onConfirm }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <LinearGradient
          colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
          style={styles.gradientBackground}
        >
          <View style={styles.modalContent}>
            <Card>
              <Text style={styles.title}>Confirm Information</Text>
              {/* Display user info */}
              <Text style={styles.info}>Name: {userInfo.name}</Text>
              <Text style={styles.info}>Email: {userInfo.email}</Text>
              <Text style={styles.info}>Phone: {userInfo.phone}</Text>

              {/* Buttons for navigation */}
              <View style={styles.buttonContainer}>
                <Button title="Go Back" onPress={onEdit} style={styles.goBackButton} />
                <Button title="Continue" onPress={onConfirm} style={styles.continueButton} />
              </View>
            </Card>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ensure the modal background covers the screen
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20, // Ensure spacing around the card
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    justifyContent: 'center',
    alignItems: 'center', // Ensure the card and content are centered
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.textPrimary,
    textAlign: 'center', // Center the title
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.textPrimary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  goBackButton: {
    backgroundColor: colors.error,
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  continueButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
});

export default ConfirmScreen;
