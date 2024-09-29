import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/Card';
import Button from '../components/Button';

const ConfirmScreen = ({ visible, userInfo, onEdit, onConfirm }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <LinearGradient
        colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
        style={styles.gradientBackground}
      >
        <Card>
          <Text style={styles.title}>Confirm Information</Text>
          <Text style={styles.info}>Name: {userInfo.name}</Text>
          <Text style={styles.info}>Email: {userInfo.email}</Text>
          <Text style={styles.info}>Phone: {userInfo.phone}</Text>

          <View style={styles.buttonContainer}>
            <Button title="Go Back" onPress={onEdit} style={styles.goBackButton} />
            <Button title="Continue" onPress={onConfirm} style={styles.continueButton} />
          </View>
        </Card>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  goBackButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  continueButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
});

export default ConfirmScreen;
