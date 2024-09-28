import React, { useState } from 'react';
import { SafeAreaView, Alert, StyleSheet } from 'react-native';
import StartScreen from './screens/StartScreen';

export default function App() {
  // This state controls whether the user has successfully registered
  const [isRegistered, setIsRegistered] = useState(false);

  // Function to handle registration success from StartScreen
  const handleRegister = () => {
    setIsRegistered(true);
    Alert.alert("Success", "You have successfully registered!");
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isRegistered ? (
        <StartScreen onRegister={handleRegister} />
      ) : (
        Alert.alert('You are already registered!')
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
