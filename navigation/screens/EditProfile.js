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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C2432',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#00FF00',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#FFFFFF',
  },
});