import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Button,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { initializeApp } from "firebase/app";
import { FB_KEY } from "@env";
//import Profile from './Profile';

// TIMER ERROR
//
// voidaan jättää huomioimatta.
// https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
// https://github.com/firebase/firebase-js-sdk/issues/97#issuecomment-485410026
//
// Ongelma node_modulessa, joka asentuu aina uudestaan, ku tekee uuden 'npm install'

import {
  getFirestore,
  getDoc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { name, username, bio, email, num } from "./Profile";
import { StackActions } from "@react-navigation/native";

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [num, setNum] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const popAction = StackActions.pop(1);

  const handlePop = () => {
    navigation.dispatch(popAction);
  };

  // hakee datan kirjautuneen käyttäjätunnuksen id mukaan
  const getUserData = async () => {
    const docRef = doc(db, auth.currentUser["uid"], "profiilidata");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setName(docSnap.data().name);
      setUsername(docSnap.data().username);
      setBio(docSnap.data().bio);
      setNum(docSnap.data().num);
      setEmail(docSnap.data().email);
      setImage(docSnap.data().image);
    } else {
      console.log("No data found");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  //lisää uuden datan (dokumentin) firestoreen jos ei ole olemassa
  //muuten päivittää / overwrite kaikki {} sisällä olevat parametrit

  //kollektionit on kirjautuneen käyttäjän uid, dokumentin nimi on profiilidata.
  const saveDoc = async () => {
    const docRef = setDoc(doc(db, auth.currentUser["uid"], "profiilidata"), {
      name: name,
      username: username,
      bio: bio,
      num: num,
      email: email,
      image: image,
    });
    console.log("doc ID: ", docRef.id);
    Alert.alert("Alert", "Profile has been updated");
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 20, marginTop: 100 }}>
        <View style={{ marginBottom: 50 }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 180 / 2,
                alignSelf: "center",
                marginBottom: 10,
              }}
            />
          )}
          <Button
            title="Upload image"
            onPress={pickImage}
            style={styles.commandButton}
          />
        </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="name"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[styles.textInput]}
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
            style={[styles.textInput]}
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
            style={[styles.textInput]}
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
            style={[styles.textInput]}
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
            style={[styles.textInput]}
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

        <TouchableOpacity style={styles.commandButton} onPress={handlePop}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C2432",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#009688",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#FFFFFF",
  },
});
