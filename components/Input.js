import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../components/colors'; // Import colors

const Input = ({ label, value, onChangeText, placeholder, keyboardType, error }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: colors.textPrimary, // Use color from helper
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.textPrimary, // Use color from helper
    paddingVertical: 8,
    marginVertical: 10,
    fontSize: 18,
  },
  errorText: {
    color: colors.error, // Use color from helper
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Input;
