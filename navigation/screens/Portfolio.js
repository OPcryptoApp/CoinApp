import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ScrollView, StyleSheet } from 'react-native';
import millify from 'millify';
import axios from "axios";
import { SvgUri } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';
import coinService from '../../services/coinService';
import { map } from '@firebase/util';


export default function PortfolioScreen({ navigation }) {

  const [focus, setFocus] = React.useState(false)
  const unsubscribe = navigation.addListener('focus', (e) => {
    setFocus(!focus) // focus vaihdos, että Coin-komponentti saa tiedon ladata kolikkolistan uudestaan
  })

  const [listData, setListData] = useState([])
  const [favCoinsList, setFavCoinsList] = useState('')
  const [loading, setLoading] = useState(true)
  const [sum, setSum] = useState(0)

  const [ownCoins, setOwnCoins] = useState([])

  const formatFavorites = (favoriteList) => {
    var list = ""
    favoriteList.map((f, i) => {
      list = (`${list}&uuids[${i}]=${f.coinId}`)
    })
    return list
  }

  useEffect(async () => {
    const favoriteList = await coinService.getOwnedCoins();
    setOwnCoins(favoriteList)
    favoriteList.map(f => {
    })
    const favlist = formatFavorites(favoriteList)

    var s = 0.0
    if (favlist.length > 0) {
      setFavCoinsList(favlist)
      getCoinList(favlist)
      listData.map(a => {
        //console.log('a', a.price)
        favoriteList.forEach(f => {
          if (a.uuid == f.coinId) {
            s = s + (parseFloat(f.amount) * parseFloat(a.price))
          }

        })

      })
    } else {
      setLoading(true)
    }
    setSum(s)
  }, [focus])

  //console.log('listData', listData)

  const getCoinList = (favlist) => {
    const dollarUuid = 'yhjMzLPhuIDl'
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
    setLoading(false)
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


  const AmountOwned = ({ item }) => {
    var s = 0
    ownCoins.forEach(f => {
      if (item.uuid == f.coinId) {
        s = (parseFloat(f.amount) * parseFloat(item.price))
      }
    })
    return <Text style={styles.name}>$ {millify(s)}</Text>
  }

  const renderItem = ({ item }) => (

    < TouchableOpacity onPress={() => { navigation.navigate('CoinPageScreen', { paramCoin: item }) }}>
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
            <AmountOwned item={item} />
          </View>
          <View style={styles.left}>

            <View style={styles.left}>
              <Text style={styles.price}>{millify(item.price)} $</Text>
            </View>
            <PercentageColor
              val={item.change}
            />
          </View>
        </View>

      </View>
    </TouchableOpacity>
  )

  return (

    <View style={styles.container}>
      {/* FIX HERE SOME STYLING / ORIENTATION ERROR POPS UP HERE */}
      {/* 
      <ScrollView> 
         */}
      <Text style={{
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 25,
        marginLeft: 15,
      }}>Your Portfolio</Text>
      <Text style={{
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 25,
        marginLeft: 15,
      }}>{sum.toFixed(2)} $</Text>

      <Text style={{
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 25,
        marginLeft: 15,
      }}>Your coins</Text>

      {!loading ?
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item, i) => 'key' + i}
        />
        : <Text style={styles.name}>
          See your owned coins here
        </Text>
      }
      {/* 
      </ScrollView>
       */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '15%',
    flex: 1,
    //flexDirection:'row',
    marginBottom: 5,
    backgroundColor: '#0C2432',
  },
  item: {
    backgroundColor: "#1f3947",
    justifyContent: "space-between",
    marginVertical: 2,
    marginHorizontal: 16,
    borderRadius: 5,
    padding: 10,
  },
  image: {
    marginRight: 10,
    alignSelf: "center",
    //justifyContent:'center',
  },
  name: {
    color: "white",
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    justifyContent: "flex-start",
    /* fontWeight:'bold',
        justifyContent: 'flex-start',
        flexDirection: 'row',*/
  },
  sub: {
    color: "gray",
    fontSize: 10,
    fontWeight: "bold",
  },
  rank: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  changeNeg: {
    color: "#c71400",
    textAlign: "right",
    fontWeight: "bold",
  },

  changePosit: {
    color: "#10C22C",
    textAlign: "right",
    fontWeight: "bold",
  },

  price: {
    fontWeight: "bold",
    color: "white",
  },

  left: {
    marginLeft: "auto",
  },
  center: {
    marginLeft: "auto",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
