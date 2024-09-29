import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Import the sad smiley face image using require
const sadSmiley = require('../assets/sad_smiley.png');  // Ensure the path is correct

const GameScreen = ({ chosenNumber, onRestart, userInfo, onNewGame }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timer, setTimer] = useState(60);
  const [hintUsed, setHintUsed] = useState(false);
  const [showFeedbackCard, setShowFeedbackCard] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const lastDigit = userInfo?.phone[userInfo.phone.length - 1];

  // Function to start the game and timer
  const startGame = () => {
    setGameStarted(true);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          setGameOver(true); // End the game when the timer reaches 0
          Alert.alert('Time’s up!', 'You have run out of time.');
          return prevTimer;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  // Handle the user's guess
  const handleGuess = () => {
    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 100.');
      return;
    }

    if (attempts > 0 && timer > 0) {
      setAttemptsUsed(4 - attempts + 1);
      if (numGuess === chosenNumber) {
        setFeedback('You guessed correct!');
        setGameOver(true); // End the game when user guesses correctly
      } else if (numGuess < chosenNumber) {
        setFeedback('Guess higher!');
        setShowFeedbackCard(true);
      } else {
        setFeedback('Guess lower!');
        setShowFeedbackCard(true);
      }
      setAttempts(attempts - 1);
    } else {
      setFeedback('No more attempts or time left!');
      setGameOver(true); // End the game when no attempts or time is left
    }
  };

  // Provide a hint for the user
  const useHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      Alert.alert('Hint', `The chosen number is a multiple of ${lastDigit}`);
    } else {
      Alert.alert('No more hints', 'You have already used your hint.');
    }
  };

  // Reset input and show the guess input again
  const tryAgain = () => {
    setShowFeedbackCard(false);
    setGuess('');
  };

  // End the game when the user chooses to do so
  const endGame = () => {
    setGameOver(true);
  };

  // Display Game Over screen
  if (gameOver) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.text}>The game is over</Text>
          <Text style={styles.text}>The number was: {chosenNumber}</Text>
          <Text style={styles.text}>Attempts used: {attemptsUsed}</Text>

          {/* Display the sad smiley face image */}
          <Image source={sadSmiley} style={styles.sadSmiley} />

          {/* Restart or New Game Button */}
          <TouchableOpacity onPress={onNewGame} style={styles.buttonActive}>
            <Text style={styles.buttonText}>NEW GAME</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Restart button in the top-right corner */}
      <View style={styles.restartContainer}>
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
      ) : showFeedbackCard ? (
        <View style={styles.card}>
          <Text style={styles.text}>{feedback}</Text>
          <TouchableOpacity onPress={tryAgain} style={styles.buttonActive}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={endGame} style={styles.buttonActive}>
            <Text style={styles.buttonText}>End Game</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.text}>Guess a number between 1 & 100 that is a multiple of {lastDigit}</Text>

          {/* Input for the user's guess */}
          <TextInput
            style={styles.inputUnderline}
            placeholder="Enter your guess"
            value={guess}
            onChangeText={setGuess}
            keyboardType="numeric"
          />

          <Text style={styles.text}>Attempts left: {attempts}</Text>
          <Text style={styles.text}>Timer: {timer}s</Text>

          {/* Use hint button */}
          <TouchableOpacity
            onPress={useHint}
            style={hintUsed ? styles.buttonDisabled : styles.buttonActive}
            disabled={hintUsed}
          >
            <Text style={styles.buttonText}>USE A HINT</Text>
          </TouchableOpacity>

          {/* Submit guess button */}
          <TouchableOpacity onPress={handleGuess} style={styles.buttonActive}>
            <Text style={styles.buttonText}>SUBMIT GUESS</Text>
          </TouchableOpacity>
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
  inputUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: '#4a148c',
    width: '80%',
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 5,
  },
  buttonActive: {
    backgroundColor: '#0000ff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3',
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
    marginBottom: 10,
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
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  sadSmiley: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default GameScreen;
