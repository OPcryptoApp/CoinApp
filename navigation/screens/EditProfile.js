import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { initializeApp } from "firebase/app";
import { FB_KEY } from "@env"
//import Profile from './Profile';
import { getFirestore, getDoc, setDoc, addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { name, username, bio, email, num } from './Profile';


import EditScreen from '../../components/Profile/EditScreen';

export default function EditProfileScreen() {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('')
  const [num, setNum] = useState('');
  const [email, setEmail] = useState('');


  // hakee datan kirjautuneen käyttäjätunnuksen id mukaan, sama kuin profile.js:ssä
  const getUserData = async () => {
    const docRef = doc(db, 'users', 'XKudDwdMapNFtqBtJH46'); //myohemmin dokumentin tilalle: auth.currentUser.uid
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setName(docSnap.data().name);
      setUsername(docSnap.data().username);
      setBio(docSnap.data().bio);
      setNum(docSnap.data().num);
      setEmail(docSnap.data().email);
    } else {
      console.log('No data found');
    }
  }

  useEffect(() => {
    getUserData()
  }, [])


  //lisää uuden datan (dokumentin) firestoreen jos ei ole olemassa
  //muuten päivittää / overwrite kaikki {} sisällä olevat parametrit

  const saveDoc = () => {
    const docRef = setDoc(doc(db, 'users', 'XKudDwdMapNFtqBtJH46'), {
      name: name,
      username: username,
      bio: bio,
      num: num,
      email: email
    });
    console.log("doc ID: ", docRef.id);
    Alert.alert("Alert", "Profile has been updated");
  }

  return (

    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { }}>
            <View style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ImageBackground
                source={{
                  uri: 'https://www.flickr.com/photos/gsfc/6760135001'
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="name"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
            onChangeText={(name) => setName(name)}
            value={name}
          />
        </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="@"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
            onChangeText={(username) => setUsername(username)}
            value={username}
          />
        </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="Bio"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
            onChangeText={(bio) => setBio(bio)}
            value={bio}
          />
        </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
            keyboardType="numeric"
            onChangeText={(num) => setNum(num)}
            value={num}
          />
        </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
        </View>
        {/*<View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
          />
          </View>*/}
        <TouchableOpacity style={styles.commandButton} onPress={saveDoc}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
