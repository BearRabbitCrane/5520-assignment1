import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';

export default function App() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleRegister = (name, email, phone) => {
    setUserInfo({ name, email, phone }); // Save the user input into state
    setShowConfirmModal(true); // Show the confirm modal
  };

  const handleEdit = () => {
    setShowConfirmModal(false); // Close the modal and return to StartScreen
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setIsRegistered(true); // Confirm the information and proceed to the game screen
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isRegistered ? (
        <StartScreen onRegister={handleRegister} />
      ) : (
        <Text>Game Screen Placeholder</Text>  // Placeholder for the Game screen
      )}
      <ConfirmScreen
        visible={showConfirmModal}
        userInfo={userInfo}  // Pass user data to ConfirmScreen
        onEdit={handleEdit}
        onConfirm={handleConfirm}
      />
    </SafeAreaView>
  );
}
