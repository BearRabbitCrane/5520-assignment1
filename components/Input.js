import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, value, onChangeText, keyboardType = 'default', style = {} }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      style={[styles.input, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#4a148c',
    paddingVertical: 8,
    marginVertical: 10,
    fontSize: 18,
  },
});

export default Input;
