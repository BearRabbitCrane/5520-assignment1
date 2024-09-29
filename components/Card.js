import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../components/colors'; // Import colors

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: colors.cardBackground, 
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
});

export default Card;
