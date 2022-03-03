import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import styles from './styles'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const storeData = async (value) => {
  console.log('value', value)
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    console.log('Saving Error')
  }
}

export default function Coin() {

  const [asyncNumber, setAsyncNumber] = useState(5)
  const [listData, setListData] = useState([])
  //const [coinListData, setCoinListData] = useState([])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        console.log('value get', parseInt(value))
        // value previously stored
        setAsyncNumber(parseInt(value))
      }
    } catch (e) {
      // error reading value
    }
  }



  useEffect(async () => {
    var a = asyncNumber

    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        console.log('value get', parseInt(value))
        // value previously stored
        setAsyncNumber(parseInt(value))
        a = parseInt(value)
      }
    } catch (e) {
      // error reading value
    }

    axios.request({
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      params: {
        referenceCurrencyUuid: '5k-_VTxqtCEI',
        timePeriod: '24h',
        tiers: '1',
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: a,
        offset: '0'
      },
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        //  api avain.
        'x-rapidapi-key': ''
      }
    }).then(function (response) {
      console.log("response data", response.data);
      setListData(response.data.data.coins)
    }).catch(function (error) {
      console.error(error);
    });

  }, [])

  console.log('listData', listData)

  const DataItem = ({ rank }) => (
    <Text>            Rank: {rank}</Text>
  )

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.iconUrl }}
        style={styles.image}
      />
      <Text
        style={styles.name}>
        {item.name}
      </Text>
      <View style={styles.rank}>
        <DataItem
          rank={item.rank} />
      </View>
      <Text
        style={styles.change}>
        {item.change}%
      </Text>
    </View>
  )

  return (

    <View style={styles.container}>

      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, i) => 'key' + i}
      />

      {/*  <Image 
                    source={{
                        uri: "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615",
                    }}
                    style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                        alignSelf: 'center',
                        
                    }}
                />
                <View>
                <Text style={{fontWeight:'bold', color:'white'}}>Coin</Text>
                <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight:5, color:'white'}}>BNB</Text>
              
                </View>
                </View>
                <View style={{marginLeft:'auto'}}>
                    <Text style={{fontWeight:'bold', color:'white'}}>$439.55</Text>
                    <Text style={{color:'#10C22C', textAlign:'right', fontWeight:'bold'}}>2.8%</Text>
                </View> */}



    </View>


  );
}
