import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const GameScreen = ({ chosenNumber, onRestart, userInfo }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timer, setTimer] = useState(60);
  const [hintUsed, setHintUsed] = useState(false);

  const lastDigit = userInfo?.phone[userInfo.phone.length - 1];

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
    }, 1000);
  };

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
      <View style={styles.restartContainer}>
        {/* Restart button at the top-right corner */}
        <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
          <Text style={styles.restartButtonText}>RESTART</Text>
        </TouchableOpacity>
      </View>

      {!gameStarted ? (
        <View style={styles.card}>
          <Text style={styles.text}>Guess a number between 1 & 100 that is a multiple of {lastDigit}</Text>
          <TouchableOpacity onPress={startGame} style={styles.buttonActive}>
            <Text style={styles.buttonText}>START</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.card}>
            <Text style={styles.text}>Guess a number between 1 & 100 that is a multiple of {lastDigit}</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your guess"
              value={guess}
              onChangeText={setGuess}
              keyboardType="numeric"
            />

            <Text style={styles.text}>Attempts left: {attempts}</Text>
            <Text style={styles.text}>Timer: {timer}s</Text>

            <TouchableOpacity onPress={useHint} style={hintUsed ? styles.buttonInactive : styles.buttonActive}>
              <Text style={styles.buttonText}>USE A HINT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGuess} style={styles.buttonActive}>
              <Text style={styles.buttonText}>SUBMIT GUESS</Text>
            </TouchableOpacity>

            {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
          </View>
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
    backgroundColor: '#a0d8f3',
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
    elevation: 5,
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4a148c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '80%',
    textAlign: 'center',
  },
  buttonActive: {
    backgroundColor: '#0000ff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonInactive: {
    backgroundColor: 'transparent',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  restartContainer: {
    alignItems: 'flex-end',
    width: '90%',
  },
  restartButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10, // Add margin so it's outside of the card
  },
  restartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 18,
    color: 'green',
    marginVertical: 20,
  },
});

export default GameScreen;
