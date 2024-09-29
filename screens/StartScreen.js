import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import GradientBackground from '../components/GradientBackground'; // Import the GradientBackground
import colors from '../components/colors';

const StartScreen = ({ onRegister }) => {
  // State hooks for form data and error handling
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });

  // Validation for name input
  const validateName = (name) => {
    if (!name || name.length <= 1 || !isNaN(name)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Please enter a valid name' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
  };

  // Validation for email input using regex
  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email address' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  // Validation for phone input
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone) || phone[9] === '0' || phone[9] === '1') {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Please enter a valid phone number' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
    }
  };

  // Handle form submission and registration
  const handleRegister = () => {
    if (!name || !email || !phone || errors.name || errors.email || errors.phone) {
      Alert.alert('Invalid input', 'Please correct the errors before registering');
    } else {
      onRegister(name, email, phone); // Pass the user info to the parent component (App.js)
    }
  };

  // Handle form reset
  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCheckboxSelected(false);
    setErrors({ name: '', email: '', phone: '' });
  };

  return (
    <GradientBackground>
      <Text style={styles.title}>Welcome</Text>

      {/* Input card for form */}
      <Card>
        <Input
          label="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            validateName(text);
          }}
          placeholder="Enter your name"
          error={errors.name}
        />

        <Input
          label="Email address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          placeholder="Enter your email"
          error={errors.email}
        />

        <Input
          label="Phone Number"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            validatePhone(text);
          }}
          placeholder="Enter your phone number"
          keyboardType="numeric"
          error={errors.phone}
        />

        {/* Checkbox for robot verification */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={checkboxSelected}
            onValueChange={setCheckboxSelected}
            color={checkboxSelected ? colors.primary : undefined}
          />
          <Text style={styles.checkboxLabel}>I am not a robot</Text>
        </View>

        {/* Buttons for reset and register */}
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={handleReset} style={styles.resetButton} />
          <Button
            title="Register"
            onPress={handleRegister}
            style={styles.registerButton}
            disabled={!checkboxSelected}
          />
        </View>
      </Card>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.textPrimary,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.textPrimary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: colors.error,
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  registerButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
});

export default StartScreen;
