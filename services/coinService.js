
import {
  getFirestore,
  getDoc,
  setDoc,
  deleteDoc,
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
  console.log('COIN COIN FAVORITE:', coin.name)
  //console.log('auth.currentUser["uid"]: ', auth.currentUser["uid"])
  const docRef = doc(db, auth.currentUser["uid"], "coins", "lempikolikot", coin.uuid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return true
  } else {
    return false
  }
}

const setCoinAsFavorite = async (coin) => {

  console.log('COIN DATA in coinService', coin.name)
  const docRef = doc(db, auth.currentUser["uid"], "coins", "lempikolikot", coin.uuid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {

    console.log('docSnap.data()', docSnap.data())
    await deleteDoc(docRef)
    return false
  } else {
    addCoinToFavorites(coin)
    return true
  }
}

const addCoinToFavorites = async (coin) => {
  console.log('ADD COIN to favorites, coin: ', coin.name)
  setDoc(doc(db, auth.currentUser["uid"], "coins", "lempikolikot", coin.uuid), {
    name: coin.name
  })
  Alert.alert("Alert", "Coin set as favorite.")
}

const getUserCoins = async () => {
  const docRef = doc(db, auth.currentUser["uid"], "coins")
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