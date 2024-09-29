import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import colors from '../components/colors'; // Import colors

const StartScreen = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });

  const validateName = (name) => {
    if (!name || name.length <= 1 || !isNaN(name)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Please enter a valid name' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email address' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone) || phone[9] === '0' || phone[9] === '1') {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Please enter a valid phone number' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
    }
  };

  const handleRegister = () => {
    if (!name || !email || !phone || errors.name || errors.email || errors.phone) {
      Alert.alert('Invalid input', 'Please correct the errors before registering');
    } else {
      onRegister(name, email, phone);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCheckboxSelected(false);
    setErrors({ name: '', email: '', phone: '' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
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

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={checkboxSelected}
            onValueChange={setCheckboxSelected}
            color={checkboxSelected ? colors.primary : undefined}
          />
          <Text style={styles.checkboxLabel}>I am not a robot</Text>
        </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
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
