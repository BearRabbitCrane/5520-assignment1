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
    setUserInfo({ name, email, phone });
    setShowConfirmModal(true);
  };

  const handleEdit = () => {
    setShowConfirmModal(false);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setIsRegistered(true);
    // Continue to the next screen (e.g., the game screen)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isRegistered ? (
        <StartScreen onRegister={handleRegister} />
      ) : (
        // Here you could show the Game screen or another screen
        <Text>Game Screen Placeholder</Text>
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
