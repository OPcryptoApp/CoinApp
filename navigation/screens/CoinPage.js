import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { getSingleCoinData } from '../../services/requests';
import { useRoute } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { Button } from 'react-native-paper';
import millify from 'millify';
import { TouchableOpacity } from 'react-native-gesture-handler';







export default function CoinPageScreen() {
  const route = useRoute();
  const [favorite, setFavorite] = useState(false);
  const [coin, setCoin] = useState(null);
  const [coinData, setCoinData] = useState({});
  let [fetchedCoinData, setFetchedCoinData] = useState(null);

  const [iconName, setIconName] = useState('md-star-outline');

  //coinconsts 
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [change, setChange] = useState('');

  const [coinName, setCoinName] = useState('');
  const {
    params: { coinId },
  } = route;


  const fetchCoinData = async () => {
    fetchedCoinData = await getSingleCoinData(coinId);
    setCoin(fetchedCoinData);
    setSymbol(fetchedCoinData.data.coin.symbol);
    setPrice(fetchedCoinData.data.coin.price);
    setImage(fetchedCoinData.data.coin.iconUrl);
    setChange(fetchedCoinData.data.coin.change);
    setName(fetchedCoinData.data.coin.name);
  };


  useEffect(() => {
    fetchCoinData();
  }, []);


  {/* kliinimpi ja toimii mutta varoittaa : [Unhandled promise rejection: TypeError: undefined is not an object (evaluating 'coinData.data.coin')]
  useEffect(() => {
    getSingleCoinData(coinId).then(data => {
      setCoinData(data);
      console.log('coin toimiiko ' + coinData.data.coin.name);
      setName(coinData.data.coin.name);
    });
  }, [coinId]);
  */}

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

  const handleFavorite = () => {
    if (favorite === false) {
      setIconName('md-star-outline');
    } else {
      setIconName('md-star');

    }
    setFavorite(!favorite);
    console.log(favorite)
  };






  return (

    <View style={styles.container}>



      <Ionicons style={styles.favorite} onPress={handleFavorite} name={iconName} size={30} />




      <Text style={styles.itemTitle}>{symbol} </Text>

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
      <View style={styles.textField}>
        <Text style={styles.normalText}> tähän hintakäyrä </Text>


      </View>



      <View style={styles.buttonContainer}>

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            console.log('buy button pressed');
          }}
        >
          Buy
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            console.log('sell button pressed');
          }}
        >
          Sell
        </Button>
      </View>


    </View>

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



});