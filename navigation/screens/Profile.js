import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
//import styles from "../../components/Profile/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EditProfileScreen from "./EditProfile";
import { getFirestore, getDoc, doc, collection } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { FB_KEY } from "@env";
import { db } from '../../firebase';
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";



export default function ProfileScreen({ navigation }) {

  const [isSignedIn, setIsSignedIn] = useState(false);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('')
  const [num, setNum] = useState('');
  const [email, setEmail] = useState('');

  // hakee datan kirjautuneen käyttäjätunnuksen id mukaan
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

  //GetUserData funktio käynnistyy automaattisesti sivun ladatessa
  useEffect(() => {
    getUserData()
  }, [])


  const handleSignOut = () => {
    signOut(auth)
      .then((re) => {
        setIsSignedIn(false);
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(re);
      })
  }

  const handleEdit = () => {
    navigation.navigate("EditProfileScreen");
  }

  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.commandButton}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (

    <SafeAreaView style={styles.container}>
      {/* <View style={styles.userInfoSection}> */}
      <View>
        <View>
          <Avatar.Image
            source={{
              uri: 'https://unsplash.com/photos/HknZkracHjs'
            }}
            size={80}
          />
          <View style={{ marginLeft: 5 }}>
            <Title style={[styles.title, {
              marginTop: 15,
              marginBottom: 5,

            }]}>{name}</Title>
            <Caption style={styles.caption}>@{username}</Caption>
          </View>


          <View>
            {/* <View style={styles.userInfoSection}> */}

            <View style={styles.row}>
              <Icon name="logo-usd" color="#FFFFFF" size={20} />
              <Text style={{ color: "#FFFFFF", marginLeft: 20 }}>{bio}</Text>
            </View>

            <View style={styles.infoBoxWrapper}>
              <View style={styles.infoBox}>
                <Title style={styles.text}>$2500</Title>
                <Caption style={styles.caption}>Weekly</Caption>
              </View>
              <View style={styles.infoBox}>
                <Title style={styles.text}>8</Title>
                <Caption style={styles.caption}>Currencies</Caption>
              </View>

            </View>
          </View>
          {/* <View style={styles.logout}> */}
          <View style={styles.logout}>

            <AppButton
              onPress={handleSignOut}
              title="Sign out"
            />

            <AppButton
              onPress={handleEdit}
              title="Edit Profile"
            />
            {/* <Text style={styles.buttonText}>Edit profile</Text> */}

          </View>
        </View>
      </View>
    </SafeAreaView >


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C2432',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  logout: {
    //flex: 1,
    justifyContent: 'center',
    //alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#009688',
    alignItems: 'center',
    marginTop: 10,
  },
});
