import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ConfirmScreen = ({ visible, userInfo, onEdit, onConfirm }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}
        style={styles.gradientBackground}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Confirm Information</Text>
          <Text style={styles.info}>Name: {userInfo.name}</Text>
          <Text style={styles.info}>Email: {userInfo.email}</Text>
          <Text style={styles.info}>Phone: {userInfo.phone}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onEdit} style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android shadow
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
  editButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ConfirmScreen;
