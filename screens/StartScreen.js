import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';

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
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
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
      onRegister(name, email, phone); // Pass the user info to the parent component (App.js)
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

      {/* Card with rounded corners and shadow */}
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            validateName(text);
          }}
          style={styles.input}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <Text style={styles.label}>Email address</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          style={styles.input}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder="Enter your phone number"
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
          <Checkbox
            value={checkboxSelected}
            onValueChange={setCheckboxSelected}
            color={checkboxSelected ? '#4630EB' : undefined}
          />
          <Text style={styles.checkboxLabel}>I am not a robot</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRegister}
            style={[styles.registerButton, { opacity: checkboxSelected ? 1 : 0.5 }]}
            disabled={!checkboxSelected}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4a148c',
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  label: {
    fontSize: 16,
    color: '#4a148c',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#4a148c',
    paddingVertical: 8,
    marginVertical: 10,
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  registerButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '40%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default StartScreen;
