import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, db } from '../../firebase';
import {
  setDoc,
  doc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from 'react-native-web';

export default function RegisterScreen() {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [num, setNum] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        setIsSignedIn(true);
        navigation.navigate("Home");
        const docRef = setDoc(doc(db, auth.currentUser["uid"], "profiilidata"), {
          name: name,
          username: username,
          bio: bio,
          num: num,
          email: email,
        });
        console.log("ID=" + docRef.id);
      })
      .catch((error) => {
        if (password.length < 6) {
          alert("Password must be atleast 6 characters");
        } else {
          alert("Something went wrong");
        }
      });

  }

  const goBack = () => {
    navigation.navigate("Login");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <View>
        <Text style={styles.header}>CryptoApp</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Bio"
          value={bio}
          onChangeText={text => setBio(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Num"
          value={num}
          onChangeText={text => setNum(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goBack}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 45,
    backgroundColor: '#0C2432',
  },
  header: {
    color: 'white',
    fontSize: 50,
    paddingBottom: 20,
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#009688',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#009688',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#009688',
    fontWeight: '700',
    fontSize: 16,
  },
})