import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = ({ children, style = {} }) => {
  return <Text style={[styles.body, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  body: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default BodyText;
