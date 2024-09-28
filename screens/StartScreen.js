import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const StartScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });

  const validateName = (name) => {
    if (!name || name.length <= 1 || !isNaN(name)) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Invalid name' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone) || phone[9] === '0' || phone[9] === '1') {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Invalid phone number' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
    }
  };

  const handleRegister = () => {
    if (!name || !email || !phone || errors.name || errors.email || errors.phone) {
      Alert.alert('Invalid input', 'Please correct the errors before registering');
    } else {
      Alert.alert('Success', 'Registration successful');
      // Navigate to Confirm screen (to be implemented)
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
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          validateName(text);
        }}
        style={styles.input}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
        style={styles.input}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        placeholder="Phone"
        keyboardType="numeric"
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          validatePhone(text);
        }}
        style={styles.input}
      />
      {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

      <View style={styles.checkboxContainer}>
        <Text>Accept terms</Text>
        <Button title={checkboxSelected ? "Uncheck" : "Check"} onPress={() => setCheckboxSelected(!checkboxSelected)} />
      </View>

      <Button title="Reset" onPress={handleReset} />
      <Button title="Register" onPress={handleRegister} disabled={!checkboxSelected} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default StartScreen;
