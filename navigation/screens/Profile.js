import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
//import styles from "../../components/Profile/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EditProfileScreen from "./EditProfile";
import {
  getFirestore,
  getDoc,
  doc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { FB_KEY } from "@env";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

export default function ProfileScreen({ navigation }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [num, setNum] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  // hakee datan kirjautuneen käyttäjätunnuksen id mukaan, reaaliaikaiset muutokset

  const getUser = () => {
    const unsub = onSnapshot(
      doc(db, auth.currentUser["uid"], "profiilidata"),
      (doc) => {
        setName(doc.data().name);
        setUsername(doc.data().username);
        setBio(doc.data().bio);
        setNum(doc.data().num);
        setEmail(doc.data().email);
        setImage(doc.data().image);
      }
    );
  };

  //GetUserData funktio käynnistyy automaattisesti sivun ladatessa
  useEffect(() => {
    getUser();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setIsSignedIn(false);
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleEdit = () => {
    navigation.navigate("EditProfileScreen");
  };

  const confirmBox = () => {
    return Alert.alert("Are you sure?", "Are you sure you want to log out?", [
      { text: "Yes", onPress: () => handleSignOut() },
      { text: "No" },
    ]);
  };

  const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.commandButton}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.userInfoSection}> */}
      <ScrollView
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <Text
          style={{
            color: "#d1e0e8",
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          Profile
        </Text>
        <View>
          <View>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 180 / 2,
                  alignSelf: "center",
                }}
              />
            ) : (
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 180 / 2,
                  alignSelf: "center",
                }}
              />
            )}
          </View>
          <View style={{ marginLeft: 5 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {name}
            </Title>
            <Caption style={styles.caption}>@{username}</Caption>
          </View>
          <View style={{ marginBottom: 10, marginTop: 10, margin: 5 }}>
            <Divider color="#3b5563" />
          </View>

          <View>
            {/* <View style={styles.userInfoSection}> */}

            <View style={styles.row}>
              <Text style={{ color: "#d1e0e8", marginTop: 20, marginLeft: 7 }}>
                {bio}
              </Text>
            </View>
          </View>
          {/* <View style={styles.logout}> */}
          <View style={styles.logout}>
            <AppButton onPress={confirmBox} title="Sign out" />

            <AppButton onPress={handleEdit} title="Edit Profile" />
            {/* <Text style={styles.buttonText}>Edit profile</Text> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C2432",
    paddingTop: 20,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d1e0e8",
  },
  text: {
    fontSize: 20,
    color: "#d1e0e8",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    color: "#d1e0e8",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#1f3947",
    marginTop: 10,
    paddingBottom: 20,
    borderRadius: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
    marginBottom: 20,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  logout: {
    //flex: 1,
    justifyContent: "center",
    //alignItems: 'center'
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#009688",
    alignItems: "center",
    marginTop: 10,
  },
});
