import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../components/colors'; // Import colors

const Button = ({ title, onPress, style, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style, { opacity: disabled ? 0.5 : 1 }]}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: colors.buttonText,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "bold"
  },
});

export default Button;
