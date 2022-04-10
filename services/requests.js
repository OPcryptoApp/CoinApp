import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSingleCoinData = async (coinId) => {
  try {

    const response = await axios.get(`https://api.coinranking.com/v2/coin/${coinId}`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}




export const fetchList = async (numberOfCoins) => {
  var a = numberOfCoins
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if (value !== null) {
      console.log('value get', parseInt(value))
      // value previously stored
      setnumberOfCoins(parseInt(value))
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
      // Tuomon api avain.
      'x-rapidapi-key': process.env.COIN_API
    }
  }).then(function (response) {
    return (response.data.data.coins)


  }).catch(function (error) {
    console.error(error);
  });

}