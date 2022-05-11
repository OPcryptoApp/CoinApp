
import {
  getFirestore,
  getDoc,
  setDoc,
  deleteDoc,
  addDoc,
  getDocs,
  collection,
  updateDoc,
  doc,
  onSnapshot
} from "firebase/firestore"
import {
  db,
  auth,
} from "../firebase"

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


const getFavoriteCoins = async () => {
  const fcRef = collection(db, auth.currentUser["uid"], "coins", "lempikolikot");
  const collections = await getDocs(fcRef);
  var list = []
  collections.forEach(collection => {
    //console.log('collection name', collection.ref)
    list.push(collection.id)
  });
  return list
}

getOwnedCoins = async () => {
  const fcRef = collection(db, auth.currentUser["uid"], "ownedCoins", "coin");
  const collections = await getDocs(fcRef);
  var list = []

  collections.forEach(collection => {
    //console.log('collection name', collection.data().amount > 0)
    collection.data().amount > 0 && list.push(collection.data())

  });
  return list
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
  //Alert.alert("Alert", "Coin set as favorite.")
}

const getUserCoins = async () => {
  const docRef = doc(db, auth.currentUser["uid"], "coins", "lempikolikot")
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    var favoriteCoinList = docSnap.data()

    console.log('Coins from coinService', favoriteCoinList)
    return coins
  } else {
    console.log("No data found")
  }
}




const coinService = { setCoinAsFavorite, getUserCoins, getCoinFavoriteStatus, getFavoriteCoins, getOwnedCoins }

export default coinService