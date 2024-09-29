import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../components/colors'; // Import colors

const Button = ({ title, onPress, style, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, { opacity: disabled ? 0.5 : 1 }]} // Apply different opacity when button is disabled
      disabled={disabled} // Disable button if the prop is passed
    >
      {/* Button text */}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: colors.buttonText, // Set text color from the color helper
    textAlign: 'center', // Center the button text
    fontSize: 18,
    fontWeight: "bold"
  },
});

export default Button;
