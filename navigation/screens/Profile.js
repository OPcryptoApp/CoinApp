import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../components/Profile/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EditProfileScreen from "./EditProfile";
import { getFirestore, getDoc, doc, collection  } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { FB_KEY } from "@env";
import { db } from '../../firebase';


export default function ProfileScreen({navigation}){

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('')
    const [num, setNum] = useState('');
    const [email, setEmail] = useState('');

    // hakee datan kirjautuneen käyttäjätunnuksen id mukaan
    const getUserData = async () => {
        const docRef = doc(db, 'users', 'XKudDwdMapNFtqBtJH46') ; //myohemmin dokumentin tilalle: auth.currentUser.uid
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
        //  auth
          //  .signOut()
           // .then(() => {
              navigation.navigate("Login");
            //})
           // .catch(error => alert(error.message))
        }

        const handleEdit = () => {
            navigation.navigate("Settings");
        }


        
        //tiedot tulee propseina tänne?
    return (
    
    <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
            <View>
                <Avatar.Image
                    source={{
                        uri: 'https://unsplash.com/photos/HknZkracHjs'
                    }}
                    size={80}
                    />
                 <View style={{marginLeft: 5}}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{name}</Title>
                        <Caption style={styles.caption}>@{username}</Caption>
                 </View>
            </View>
        </View>

        <View style={styles.userInfoSection}>
            <View style={styles.row}>
                <Icon name="logo-usd" color="#FFFFFF" size={20}/>
                <Text style={{color:"#FFFFFF", marginLeft: 20}}>{bio}</Text>
            </View>
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
        <View style={styles.logout}>
      
        <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
        >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <TouchableOpacity
            onPress={handleEdit}
            style={styles.button}
        >
        <Text style={styles.buttonText}>Edit profile</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>

       
    );
}