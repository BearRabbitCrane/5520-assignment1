import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const sadSmiley = require('../assets/sad_smiley.png'); // Ensure the path is correct

const GameScreen = ({ chosenNumber, onRestart, userInfo, onNewGame }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timer, setTimer] = useState(60);
  const [hintUsed, setHintUsed] = useState(false);
  const [showFeedbackCard, setShowFeedbackCard] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [attemptsUsed, setAttemptsUsed] = useState(0);
  const [gameOverReason, setGameOverReason] = useState('');
  const lastDigit = userInfo?.phone[userInfo.phone.length - 1];

  // Timer effect to automatically trigger Game Over when the timer reaches 0
  useEffect(() => {
    if (timer === 0 && !victory) {
      setGameOverReason('Timer ran out.');
      setGameOver(true);
    }
  }, [timer]);

  // Function to start the game and timer
  const startGame = () => {
    setGameStarted(true);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
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

    setAttemptsUsed(4 - attempts + 1);

    if (numGuess === chosenNumber) {
      setFeedback('You guessed correct!');
      setVictory(true); 
      return;
    }

    if (attempts - 1 > 0) {
      if (numGuess < chosenNumber) {
        setFeedback('You did not guess correct! You should guess higher.');
      } else {
        setFeedback('You did not guess correct! You should guess lower.');
      }
      setShowFeedbackCard(true);
    } else {
      setGameOverReason('You ran out of attempts.');
      setGameOver(true);
    }

    setAttempts(attempts - 1);
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

  // Reset all game states and start a new game
  const resetGame = () => {
    setGameStarted(false);
    setGuess('');
    setFeedback('');
    setAttempts(4);
    setTimer(60);
    setHintUsed(false);
    setShowFeedbackCard(false);
    setGameOver(false);
    setVictory(false);
    setAttemptsUsed(0);
    setGameOverReason('');
    onNewGame(); // Call the parent to generate a new number
  };

  if (victory) {
    const imageUrl = `https://picsum.photos/id/${chosenNumber}/100/100`;

    return (
      <View style={styles.container}>
        <Card>
          <Text style={styles.text}>Congratulations! You guessed the correct number!</Text>
          <Text style={styles.text}>Attempts used: {attemptsUsed}</Text>

          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            onError={() => Alert.alert('Image load error', 'Unable to load image.')}
          />

          <Button title="NEW GAME" onPress={resetGame} style={styles.buttonActive} />
        </Card>
      </View>
    );
  }

  if (gameOver) {
    return (
      <View style={styles.container}>
        <Card>
          <Text style={styles.text}>The game is over</Text>
          <Text style={styles.text}>{gameOverReason}</Text>
          <Text style={styles.text}>The number was: {chosenNumber}</Text>
          <Text style={styles.text}>Attempts used: {attemptsUsed}</Text>

          <Button title="NEW GAME" onPress={resetGame} style={styles.buttonActive} />
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.restartContainer}>
        <Button title="RESTART" onPress={onRestart} style={styles.restartButton} />
      </View>

      {!gameStarted ? (
        <Card>
          <Text style={styles.text}>
            Guess a number between 1 & 100 that is a multiple of {lastDigit}
          </Text>
          <Button title="START" onPress={startGame} style={styles.buttonActive} />
        </Card>
      ) : showFeedbackCard ? (
        <Card>
          <Text style={styles.text}>{feedback}</Text>
          {attempts > 0 && timer > 0 && (
            <Button title="Try Again" onPress={tryAgain} style={styles.buttonActive} />
          )}
          <Button title="End Game" onPress={() => setGameOver(true)} style={styles.buttonActive} />
        </Card>
      ) : (
        <Card>
          <Text style={styles.text}>
            Guess a number between 1 & 100 that is a multiple of {lastDigit}
          </Text>

          <Input
            label=""
            value={guess}
            placeholder="Enter your guess"
            onChangeText={setGuess}
            keyboardType="numeric"
          />

          <Text style={styles.text}>Attempts left: {attempts}</Text>
          <Text style={styles.text}>Timer: {timer}s</Text>

          <Button
            title="USE A HINT"
            onPress={useHint}
            style={hintUsed ? styles.buttonDisabled : styles.buttonActive}
            disabled={hintUsed}
          />

          <Button title="SUBMIT GUESS" onPress={handleGuess} style={styles.buttonActive} />
        </Card>
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
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4a148c',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonActive: {
    backgroundColor: '#0000ff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
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
});

export default GameScreen;
