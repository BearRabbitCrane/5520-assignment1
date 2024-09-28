import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [chosenNumber, setChosenNumber] = useState(null); // The number to guess

  // Function to handle registration and number generation
  const handleRegister = (name, email, phone) => {
    setUserInfo({ name, email, phone });
    generateNumberToGuess(phone);  // Generate the number when the user confirms their info
    setShowConfirmModal(true);  // Show the confirm modal
  };

  const generateNumberToGuess = (phone) => {
    const lastDigit = phone[phone.length - 1]; // Get the last digit of the phone number
    const possibleNumbers = [];
    for (let i = 1; i <= 100; i++) {
      if (i % lastDigit === 0) {
        possibleNumbers.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    setChosenNumber(possibleNumbers[randomIndex]); // Pick a random number from the possibilities
  };

  const handleEdit = () => {
    setShowConfirmModal(false);  // Close the modal and go back to StartScreen
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setIsRegistered(true); // Confirm the information and proceed to the GameScreen
  };

  const handleRestart = () => {
    setIsRegistered(false); // Reset to StartScreen
    setUserInfo({ name: '', email: '', phone: '' }); // Clear user info
    setChosenNumber(null);  // Reset the chosen number
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isRegistered ? (
        <StartScreen onRegister={handleRegister} />
      ) : (
        // Pass userInfo to GameScreen to avoid 'undefined' error
        <GameScreen chosenNumber={chosenNumber} onRestart={handleRestart} userInfo={userInfo} />
      )}
      <ConfirmScreen
        visible={showConfirmModal}
        userInfo={userInfo}
        onEdit={handleEdit}
        onConfirm={handleConfirm}
      />
    </SafeAreaView>
  );
}
