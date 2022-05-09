import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import styles from './styles'
import millify from 'millify';
import axios from "axios";
import { SvgUri } from 'react-native-svg';
import coinService from '../../services/coinService';

// import .env tiedostosta api-avaimet ja muut, jotka ei kuulu githubiin
import { COIN_API, SECRET_KEY } from "@env"

const storeData = async (value) => {
  console.log('value', value)
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    console.log('Saving Error')
  }
}

export default function Coin() {

  const [listData, setListData] = useState([])

  useEffect(async () => {
    const favoriteList = await coinService.getFavoriteCoins();
    console.log('favoritelist', favoriteList)

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
        limit: '4',
        offset: '0'
      },
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        // Tuomon api avain.
        'x-rapidapi-key': process.env.COIN_API
      }
    }).then(function (response) {
      //console.log("response data", response.data);s
      setListData(response.data.data.coins)
    }).catch(function (error) {
      console.error(error);
    });

  }, [])

  //console.log('listData', listData)




  const DataItem = ({ rank }) => (
    <Text> Rank: {rank}</Text>
  );

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


  const renderItem = ({ item }) => (

    <View style={styles.item}>

      <View style={styles.flexRow}>
        <SvgUri
          width="30"
          height="30"
          style={styles.image}
          uri={item.iconUrl}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={styles.name}>
            {item.name}
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
  )

  return (

    <View style={styles.container}>

      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, i) => 'key' + i}

      />

    </View>


  );
}