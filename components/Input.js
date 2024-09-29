import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../components/colors'; // Import colors

// Input component that is reusable and displays validation errors
const Input = ({ label, value, onChangeText, placeholder, keyboardType, error }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder} // Placeholder text
        value={value} // Current value of the input
        onChangeText={onChangeText} // Update the value as the user types
        keyboardType={keyboardType} // Set the keyboard type (e.g., numeric, default)
      />
      
      {/* Display error message if validation fails */}
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
