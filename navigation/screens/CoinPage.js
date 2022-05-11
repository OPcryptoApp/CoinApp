import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { getSingleCoinData } from '../../services/requests';
import { useRoute } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { Button } from 'react-native-paper';
import millify from 'millify';


import coinService from '../../services/coinService';

import {
  getFirestore,
  getDoc,
  setDoc,
  deleteDoc,
  addDoc,
  collection,
  updateDoc,
  doc,
  onSnapshot,
  getDocs
} from "firebase/firestore"
import {
  db,
  auth
} from '../../firebase'


export default function CoinPageScreen() {
  const route = useRoute();
  const [favorite, setFavorite] = useState(false);
  const [coin, setCoin] = useState(null);
  const [coins, setCoins] = useState(null);
  let [fetchedCoinData, setFetchedCoinData] = useState(null);

  const [iconName, setIconName] = useState('md-star-outline');

  //coinconsts 
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [change, setChange] = useState('');
  const [amount, setAmount] = useState('');
  const [amountInUsd, setAmountInUsd] = useState(price * amount);

  //owned coin consts from firebase
  const [Oname, setOName] = useState('');
  const [Oamount, setOAmount] = useState('');

 
  
  const [coinName, setCoinName] = useState('');
  const {
    params: {
      paramCoin
    },
  } = route;

  const fetchCoinData = async () => {
    console.log('paramcoin', paramCoin.name)
    fetchedCoinData = await getSingleCoinData(paramCoin.uuid);
    setCoin(fetchedCoinData);
    setSymbol(fetchedCoinData.data.coin.symbol);
    setPrice(fetchedCoinData.data.coin.price);
    setImage(fetchedCoinData.data.coin.iconUrl);
    setChange(fetchedCoinData.data.coin.change);
    setName(fetchedCoinData.data.coin.name);
  };
 
    // create a snapdoc to get the coin data from the database

    const getOwnedCoinData = async () => {
      const docRef = doc(db, auth.currentUser["uid"], 'ownedCoins', 'coin', name);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setOName(docSnap.data().name);
        setOAmount(docSnap.data().amount);
        console.log(docSnap.data().name + docSnap.data().amount + 'owned');
      } else {
        console.log("No data found");
      }
    };

  const coinCall = async () => {
    console.log('COINCALL')
    const coins = await coinService.getUserCoins()

    console.log('usercoins:', coins)
    setCoins(coins)
    return coins
  }

  const getCoinFavorite = () => {
    const unsub = onSnapshot(
      doc(db, auth.currentUser["uid"], "coins", 'lempikolikot', paramCoin.uuid),
      (doc) => {
        if (doc.data() != undefined) {
          setFavorite(true)
        } else {
          setFavorite(false)
        }
      }
    )
  }
  useEffect(() => {
    fetchCoinData();
    getOwnedCoinData();

  }, []);

  useEffect(() => { setOAmount(Oamount) }, [Oamount])
  useEffect(() => { console.log('OAMOUNT' + Oamount) }, [Oamount])




  useEffect(() => {
    fetchCoinData();
    try {
      getCoinFavorite()
    } catch (e) {
      console.log('error', e)
    }
  }, []);

  const PercentageColor = ({ val }) => {
    if (val < 0) {
      return (
        <Text
          style={styles.changeNeg}>
          {val}%
        </Text>
      )
    } else {
      return (
        <Text
          style={styles.changePosit}>
          {val}%
        </Text>
      )
    }
  };
  /* 
    const unsub = onSnapshot(
      doc(db, auth.currentUser["uid"], "coins"),
      (doc) => {
        console.log('doc', doc)
      }
    )
   */
  const handleFavorite = async () => {
    coinService.setCoinAsFavorite(paramCoin)
    //const favoriteStatus = await coinService.getCoinFavoriteStatus(paramCoin) // COIN TÄHTEÄ EI VIELÄ MUUTETA OIKEIN
    //console.log('favoriteStautus', favoriteStatus)
    //setFavorite(favoriteStatus)
  };

  const buy = () => {
    //add coin to firebase with addDoc function
    const docRef = setDoc(doc(db, auth.currentUser["uid"], 'ownedCoins', 'coin', name), {
      name: name,
      symbol: symbol,
      price: price,
      coinId: paramCoin.uuid,
      amount: parseInt(Oamount) + parseInt(amount),
      amountInUsd: amountInUsd,
    });
  }


  const sell = () => {
    //update the amount of coin in firebase
    if (amount >= Oamount) {
      //delete the coin from firebase
      const docRef = doc(db, auth.currentUser["uid"], 'ownedCoins', 'coin', name);
      setDoc(docRef, {
        //määrä nollaan tai sitten kokko coinin poisto
        name: name,
        symbol: symbol,
        price: price,
        coinId: paramCoin.uuid,
        favorite: favorite,
        amount: 0,
        amountInUsd: amountInUsd,

      });

    } else {
      //amountin päivitys, Oamount = firebasecoinin määrä - valittu amount
      const docRef = doc(db, auth.currentUser["uid"], 'ownedCoins', 'coin', name);
      setDoc(docRef, {
        name: name,
        symbol: symbol,
        price: price,
        coinId: paramCoin.uuid,
        favorite: favorite,
        amount: Oamount - amount,
        amountInUsd: amountInUsd,
      });

    }
  }
  


  return (

    <View style={styles.container}>
      {favorite ?
        <Ionicons style={styles.favorite} onPress={handleFavorite} name={'md-star'} size={30} />
        : <Ionicons style={styles.favorite} onPress={handleFavorite} name={'md-star-outline'} size={30} />
      }


      <SvgUri
        width="100"
        height="100"
        style={styles.image}
        uri={image}
      />

      <Text style={styles.itemTitle}>{name} </Text>
      <View style={{ flexDirection: 'row' }}>

        <Text style={styles.price}>{millify(price)}$ </Text>
        <PercentageColor
          val={change}
        />
      </View>

      <Text style={styles.itemTitle}>{name} owned  {Oamount} </Text>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={buy}
        >
          Buy
        </Button>

        <TextInput
          placeholder="amount"
          keyboardType='numeric'
          style={[
            styles.textInput,
          ]}
          onChangeText={(amount) => setAmount(amount)}
          value={amount}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={sell}
        >
          Sell
        </Button>
      </View>


    </View >

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#0C2432',

  },
  itemTitle: {
    fontSize: 24,
    paddingBottom: 30,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 20
  },
  textField: {
    borderRadius: 30,
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    fontSize: 40,
    width: 300,
    // shadowColor: Colors.black,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  normalText: {
    fontSize: 15,
    width: 250,
    paddingBottom: 20

  },
  favorite: {
    position: 'absolute',
    top: 45,
    right: 10,
    color: 'white',
  },

  image: {
    marginTop: 30,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: '#0C2432',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonTextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: 100,
    height: 50,
    margin: 10,
    borderRadius: 30,

  },
  changeNeg: {
    color: '#c71400',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 30,
    paddingLeft: 20,
  },

  changePosit: {
    color: '#10C22C',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 30,
    paddingLeft: 20,
  },
  price: {
    fontWeight: 'bold',
    color: 'white',
    paddingRight: 20,
    fontSize: 30,
  },
  textInput: {
    flex: 1,

    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    width: 100,
    height: 50,
    margin: 5,
    borderRadius: 20,
  },
});