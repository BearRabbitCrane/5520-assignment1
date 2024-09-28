import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const GameScreen = ({ chosenNumber, onRestart }) => {
  const [gameStarted, setGameStarted] = useState(false);  // State to control whether the game has started
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timer, setTimer] = useState(60);

  // Handle starting the game
  const startGame = () => {
    setGameStarted(true);
    // Here you could start a timer for the 60 seconds
  };

  const handleGuess = () => {
    if (attempts > 0 && timer > 0) {
      const numGuess = parseInt(guess, 10);
      if (numGuess === chosenNumber) {
        setFeedback('You guessed correctly!');
      } else {
        setAttempts(attempts - 1);
        setFeedback('Try again.');
      }
    } else {
      setFeedback('No more attempts or time left!');
    }
  };

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        // Show the card with game instructions before starting
        <View style={styles.card}>
          <Text style={styles.title}>Game Instructions</Text>
          <Text style={styles.description}>
            You have 60 seconds and 4 attempts to guess a number that is a multiple
            of the last digit of your phone number between 1 and 100.
          </Text>
          <Button title="Start" onPress={startGame} />
        </View>
      ) : (
        // Game has started, show the guessing interface
        <View style={styles.gameContainer}>
          <Text style={styles.title}>Guess the Number</Text>
          <Text style={styles.description}>Attempts left: {attempts}, Time left: {timer} seconds</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter your guess"
            value={guess}
            onChangeText={setGuess}
            keyboardType="numeric"
          />
          <Button title="Submit Guess" onPress={handleGuess} />
          
          {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

          <Button title="Restart" onPress={onRestart} color="red" />
        </View>
      )}
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
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android shadow
    alignItems: 'center',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
