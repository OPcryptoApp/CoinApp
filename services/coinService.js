
import {
  getFirestore,
  getDoc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore"
import {
  db,
  auth
} from "../firebase"
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native"


const getCoinFavoriteStatus = async coin => {
  const docRef = doc(db, auth.currentUser["uid"], "lempikolikot", coin)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const favoriteStatus = docSnap.data().favorite
    return favoriteStatus
  } else {
    console.log("No data found")
  }
}

const setCoinAsFavorite = async (coin) => {
  //check if already favorite
  //if not set as favorite
  //else remove coin from favorite
  //fetch coindata from user's firestore
  console.log('COIN DATA in coinService', coin)
  const docRef = doc(db, auth.currentUser["uid"], "lempikolikot")
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    initCoin(coin, !docSnap.data().favorite)
  } else {
    initCoin(coin, true)
  }
}

const initCoin = async ({ coin, favorite }) => {
  console.log('init coin', coin)
  console.log('init favorite', favorite)
  const docRef = setDoc(doc(db, auth.currentUser["uid"], "lempikolikot"), {
    123: {
      favorite: favorite
    }
  })
  console.log("doc ID: ", docRef)
  Alert.alert("Alert", "Coin set as favorite.")
}

/*
  const saveDoc = async () => {
    const docRef = setDoc(doc(db, auth.currentUser["uid"], "profiilidata"), {
      name: name,
      username: username,
      bio: bio,
      num: num,
      email: email,
    });
    console.log("doc ID: ", docRef.id);
    Alert.alert("Alert", "Profile has been updated");
  };
  */

const getUserCoins = async () => {
  const docRef = doc(db, auth.currentUser["uid"], "profiilidata")
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const name = docSnap.data().name
    const username = docSnap.data().username
    const bio = docSnap.data().bio
    const num = docSnap.data().num
    const email = docSnap.data().email

    const coins = { name, username, bio, num, email }
    console.log('Coins from coinService', coins)
    return coins
  } else {
    console.log("No data found")
  }
}




const coinService = { setCoinAsFavorite, getUserCoins, getCoinFavoriteStatus }

export default coinService