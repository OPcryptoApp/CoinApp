import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import styles from './styles'
import millify from 'millify';
import axios from "axios";
import { SvgUri } from 'react-native-svg';
import coinService from '../../services/coinService';

// import .env tiedostosta api-avaimet ja muut, jotka ei kuulu githubiin
import { COIN_API, SECRET_KEY } from "@env"

export default function Coin(focus) {

  const [listData, setListData] = useState([])
  const [favCoinsList, setFavCoinsList] = useState('')

  const formatFavorites = (favoriteList) => {
    var list = ""
    favoriteList.map((f, i) => {
      list = (`${list}&uuids[${i}]=${f}`)
    })
    return list
  }

  useEffect(async () => {
    const favoriteList = await coinService.getFavoriteCoins();
    console.log('favoritelist', favoriteList)
    const favlist = formatFavorites(favoriteList)
    const dollarUuid = 'yhjMzLPhuIDl'

    if (favlist.length > 0) {
      setFavCoinsList(favlist)
      getCoinList(favlist)
    }

  }, [focus])

  //console.log('listData', listData)

  const getCoinList = (favlist) => {
    axios.request({
      method: 'GET',
      //url: 'https://coinranking1.p.rapidapi.com/coins',
      //url: `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&uuids[0]=9K7m6ufraZ6gh&uuids[1]=HIVsRcGKkPFtW&uuids[2]=Qwsogvtv82FCd&uuids[3]=WcwrkfNI4FUAe&uuids[4]=razxDUgYGNAdQ`,
      url: `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl${favlist}`,
      params: {
        //referenceCurrencyUuid: dollarUuid,
        //timePeriod: '24h',
        //'uuids[]': 'Qwsogvtv82FCd',
        //'uuids[]': 'razxDUgYGNAdQ', 
        orderBy: 'marketCap',
        orderDirection: 'desc',
        limit: '50',
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
  }



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
      {/* FIX HERE SOME STYLING / ORIENTATION ERROR POPS UP HERE */}
      {/* 
      <ScrollView> 
         */}
      {favCoinsList.length > 0 ?
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item, i) => 'key' + i}
        />
        : <Text>
          See your favorite coins here
        </Text>
      }
      {/* 
      </ScrollView>
       */}
    </View>


  );
}