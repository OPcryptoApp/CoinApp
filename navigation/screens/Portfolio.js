import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import PortfolioWindow from '../../components/PortfolioWindow';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storePfData = async (value) => {
  console.log('value', value)
  try {
    await AsyncStorage.setItem('@pf_coins', JSON.stringify(value))
  } catch (e) {
    console.log('Saving Error')
  }
}

const retrievePfData = async () => {
  console.log('retrieving data from async storage')
  try {
    const value = await AsyncStorage.getItem('@pf_coins')
    console.log('values in retreivedata', value)
    console.log('values in retreivedata', JSON.parse(value))
    return value != null ? JSON.parse(value) : null
  } catch (e) {
    console.log('error', e)
  }
}

const BuyCoins = (props) => {
  const { portfolioCoins, setPortfolioCoins } = props

  const buyBitcoin = coin_id => {

    var coin
    var index
    var pf = portfolioCoins
    portfolioCoins.coins.map((c, i) => {
      if (c.uuid == coin_id) {
        coin = c
        index = i
      }
    })

    coin.volume = coin.volume + 100.0
    pf.dollars = pf.dollars - 100.0
    pf.coins[index] = coin

    setPortfolioCoins(pf)
    storePfData(pf)
    //setPortfolioCoins({ ...portfolioCoins, "coins": volume + 100 })
    console.log('portfoliocoins after buying', portfolioCoins)
  }

  return (
    <View>
      <Button
        onPress={() => buyBitcoin("Qwsogvtv82FCd")}
        title="buy 100 Bitcoin"
        color="#841584"
        accessibilityLabel="Buy bitcoin with 100 dollah"
      />
      <Button
        onPress={() => buyBitcoin("razxDUgYGNAdQ")}
        title="buy 100 ETH"
        color="#841584"
        accessibilityLabel="Buy 100 eth with 100 dollah"
      />
    </View>
  )
}


export default function PortfolioScreen({ navigation }) {

  const [portfolioCoins, setPortfolioCoins] = useState(
    {
      dollars: 1000,
      coins: [
        {
          uuid: "Qwsogvtv82FCd",
          name: "Bitcoin",
          volume: 0.4,
        },
        {
          uuid: "razxDUgYGNAdQ",
          name: "Ethereum",
          volume: 0.0
        },
        {
          uuid: "HIVsRcGKkPFtW",
          name: "Tether USD",
          volume: 0.1
        },
        {
          uuid: "WcwrkfNI4FUAe",
          name: "Binance Coin",
          volume: 0.43
        },
        {
          uuid: "aKzUVe4Hh_CON",
          name: "USDC",
          volume: 0.72
        },
      ]
    }
  )

  useEffect(async () => {

    try {
      const asyncData = await retrievePfData()
      setPortfolioCoins(asyncData)
    } catch (e) {
      console.log('erroe', e)
    }
    //setPortfolioCoins(retrievePfData())
    /* 
        var a = asyncNumber
        console.log(process.env)
        console.log("response data", COIN_API);
        try {
          const value = await AsyncStorage.getItem('@pf_coins')
          if (value !== null) {
            console.log('value get', parseInt(value))
            setAsyncNumber(parseInt(value))
            a = parseInt(value)
          }
        } catch (e) {
          // error reading value
        } */

  }, [])

  const handleSetPortfolioData = () => {

    storePfData(portfolioCoins)
  }

  const handleGetPortfolioData = async () => {
    const valueData = await retrievePfData()
    console.log('valueData', valueData)
    // hmmhmm mhmmhmm
    // setPortfolioCoins(valueData.data)
  }



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0C2432' }}>
      <Text
        onPress={() => alert('This is the "Portfolio" screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}>Portfolio</Text>
      <PortfolioWindow pfCoins={portfolioCoins} />

      <Button
        onPress={handleSetPortfolioData}
        title="set pf data"
        color="#841584"
        accessibilityLabel="portfoliodatasetter"
      />

      <Button
        onPress={handleGetPortfolioData}
        title="Get pf data"
        color="#841584"
        accessibilityLabel="portfoliodatagetter"
      />
      <BuyCoins portfolioCoins={portfolioCoins} setPortfolioCoins={setPortfolioCoins} />
    </View>
  );


}