import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const GameScreen = ({ chosenNumber, onRestart }) => {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleGuess = () => {
    const numGuess = parseInt(guess, 10);
    if (numGuess === chosenNumber) {
      setFeedback('You guessed correctly!');
    } else {
      setFeedback('Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Number</Text>
      <Text style={styles.description}>Guess the number between 1 and 100.</Text>

      <Button title="Restart" onPress={onRestart} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '80%',
    textAlign: 'center',
  },
  feedback: {
    fontSize: 18,
    color: 'green',
    marginVertical: 20,
  },
});

export default GameScreen;
