import React, { useState } from "react";
import { View, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../components/Profile/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EditProfileScreen from "./EditProfile";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

export default function ProfileScreen({ navigation }) {

    const [isSignedIn, setIsSignedIn] = useState(false);

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
        navigation.navigate("Settings");
    }

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
                    <View style={{ marginLeft: 5 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>Matti Meikäläinen</Title>
                        <Caption style={styles.caption}>@M_Meikalainen</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="logo-usd" color="#FFFFFF" size={20} />
                    <Text style={{ color: "#FFFFFF", marginLeft: 20 }}>Bitcoin, Ethereum,</Text>
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