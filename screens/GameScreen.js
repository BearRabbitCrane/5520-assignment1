import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const GameScreen = ({ chosenNumber, onRestart, userInfo }) => {
  const [gameStarted, setGameStarted] = useState(false);  // Control whether the game has started
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(4);  // User has 4 attempts
  const [timer, setTimer] = useState(60);  // 60-second timer
  const [hintUsed, setHintUsed] = useState(false);  // Control if user has used the hint

  // Ensure userInfo is defined before accessing its properties
  const lastDigit = userInfo?.phone[userInfo.phone.length - 1];  // Safely get the last digit of the phone number

  // Start the game and initiate the timer
  const startGame = () => {
    setGameStarted(true);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          Alert.alert('Time’s up!', 'You have run out of time.');
          return prevTimer;
        }
        return prevTimer - 1;
      });
    }, 1000);  // Update every second
  };

  // Validate the guess and provide feedback
  const handleGuess = () => {
    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 100.');
      return;
    }
    if (attempts > 0 && timer > 0) {
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

  // Provide a hint about the chosen number
  const useHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      Alert.alert('Hint', `The chosen number is a multiple of ${lastDigit}`);
    } else {
      Alert.alert('No more hints', 'You have already used your hint.');
    }
  };

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        // Show the instructions card with Start button
        <View style={styles.card}>
          <Text style={styles.title}>Guess a number between 1 & 100</Text>
          <Text style={styles.description}>
            that is a multiple of {lastDigit}
          </Text>
          <Button title="Start" onPress={startGame} />
        </View>
      ) : (
        // After the game starts, show the guessing interface inside the card
        <View style={styles.card}>
          <Text style={styles.title}>Guess a number between 1 & 100 that is a multiple of {lastDigit}</Text>

          {/* Show the TextInput for user guesses */}
          <TextInput
            style={styles.input}
            placeholder="Enter your guess"
            value={guess}
            onChangeText={setGuess}
            keyboardType="numeric"
          />
          
          {/* Show attempts left and timer */}
          <Text style={styles.description}>Attempts left: {attempts}</Text>
          <Text style={styles.description}>Timer: {timer}s</Text>
          
          {/* Submit guess button */}
          <Button title="Submit guess" onPress={handleGuess} />
          
          {/* Use hint button */}
          <Button title="Use a Hint" onPress={useHint} disabled={hintUsed} />
          
          {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

          {/* Restart button */}
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
    backgroundColor: '#a0d8f3', // Background color for the entire screen
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
    alignItems: 'center', // Center elements horizontally
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4a148c', // Title color
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4a148c', // Text color
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
