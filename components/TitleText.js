import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = ({ children, style = {} }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4a148c',
  },
});

export default TitleText;
