
import {
  getFirestore,
  getDoc,
  setDoc,
  deleteDoc,
  addDoc,
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


// TÄÄÄ EI TOIMI. Miten saa LISTATTUA documentit COLLECTIONISTA COLLECTIONIN SISÄLTÄ. Argh
const getFavoriteCoins = async () => {
  const favoriteList = []
  //const docRef = doc(db, auth.currentUser["uid"], 'coins', 'lempikolikot')
  console.log('ASDASDDAS 2')
  //const colSnap = await db.collection(auth.currentUser["uid"]).get()
  const colSnap = collection(db, auth.currentUser["uid"], 'coins', 'lempikolikot')


  const ss = await colRef.get();
  console.log('ss', ss)
  colSnap.forEach(doc => {
    console.log('docdocs')
  })
  //const docSnap = await getDoc(docRef)


  if (docSnap.exists()) {
    docSnap.data();

  } else {
    console.log("No data found");
  }

  console.log('docSnap.data in favcoins: _ _ ', docSnap.data())
  return favoriteList
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




const coinService = { setCoinAsFavorite, getUserCoins, getCoinFavoriteStatus, getFavoriteCoins }

export default coinService