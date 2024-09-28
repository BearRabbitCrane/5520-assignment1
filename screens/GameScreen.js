import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const GameScreen = ({ chosenNumber, onRestart, userInfo }) => {
  const [gameStarted, setGameStarted] = useState(false);  // Control whether the game has started
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timer, setTimer] = useState(60);

  // Ensure userInfo is defined before accessing its properties
  const lastDigit = userInfo?.phone[userInfo.phone.length - 1];  // Safely get the last digit of the phone number

  // Function to handle game start
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
        // Show the instructions card before the game starts
        <View style={styles.card}>
          <Text style={styles.title}>Guess a number between 1 & 100</Text>
          <Text style={styles.description}>
            that is a multiple of {lastDigit}
          </Text>
          <Button title="Start" onPress={startGame} />
        </View>
      ) : (
        // The game has started, show the guessing interface
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
    backgroundColor: '#a0d8f3', // Added background color
    padding: 20,
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#b0b0b0',
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4a148c', // Color adjustment
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#4a148c', // Color adjustment
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
