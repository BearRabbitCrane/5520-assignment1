import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, style = {}, disabled = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, disabled ? styles.buttonDisabled : {}]}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Button;
