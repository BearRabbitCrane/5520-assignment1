import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import colors from './colors'; // Import your colors file

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]} // Define gradient colors in your color helper
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GradientBackground;
