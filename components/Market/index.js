import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SvgUri } from 'react-native-svg';
import styles from './styles'
import millify from 'millify';
import { useNavigation } from "@react-navigation/native";
import Chart from '../Graph/Chart';

import axios from "axios";

// import .env tiedostosta api-avaimet ja muut, jotka ei kuulu githubiin
import { COIN_API, SECRET_KEY } from "@env"
import coinService from '../../services/coinService';


export default function Market() {

  const navigation = useNavigation();
  const [numberOfCoins, setnumberOfCoins] = useState(100)
  const [listData, setListData] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteCoins, setFavoriteCoins] = useState(null);

  useEffect(async () => {

    getFavoriteList()


    var a = numberOfCoins
    const dollarUuid = 'yhjMzLPhuIDl'

    axios.request({
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: dollarUuid,
        timePeriod: '24h',
        tiers: '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: a,
        offset: '0'
      },
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        // Tuomon api avain.
        'x-rapidapi-key': process.env.COIN_API
      }
    }).then(function (response) {

      setListData(response.data.data.coins)
    }).catch(function (error) {
      console.error(error);
    });

  }, [])


  const getFavoriteList = async () => {
    let fcoins = []
    fcoins = await coinService.getFavoriteCoins()
    setFavoriteCoins(fcoins)
  }

  const DataItem = ({ rank }) => (
    <Text>            Rank: {rank}</Text>
  )



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

  // Ei päivitä lempikolikoiden muutettua :o
  const printFavoriteStar = (item) => {
    return favoriteCoins.includes(item.uuid) ? '*' : ''
  }

  const renderItem = ({ item }) => (


    < TouchableOpacity onPress={() => {
      getFavoriteList() // pro fix
      navigation.navigate('CoinPageScreen', {
        paramCoin: item,
        getFavoriteList: getFavoriteList
      })
    }}>


      <View style={styles.item}>

        <View style={styles.flexRow}>

          <View style={{ justifyContent: 'center' }}>
            <Text
              style={styles.name}>
              {item.name}
              {favoriteCoins != null && printFavoriteStar(item)}
            </Text>
            <Text style={styles.sub}>{item.symbol}</Text>
          </View>
          <View style={styles.left}>
          </View>
          <View style={styles.left}>
            <View style={styles.left}>
              <Text style={styles.price}> ${millify(item.price)}</Text>
            </View>
            <PercentageColor
              val={item.change}
            />
          </View>
        </View>

      </View>
    </TouchableOpacity >
  )
  return (

    <View style={styles.container}>
      <TextInput style={styles.placeholder} placeholderTextColor='white' placeholder='Search For Coins...'
        onChangeText={(input) => {
          setSearchTerm(input)
        }}
      ></TextInput>


      <FlatList
        data={listData.filter((item) => {
          if (searchTerm == "") {
            return (listData)

          } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase() || item.symbol.toLowerCase().includes(searchTerm.toLowerCase()))) {
            console.log(item.symbol)
            return item
          }
        })}
        renderItem={renderItem}
        keyExtractor={(item, i) => 'key' + i}
      />
    </View>


  );
}


