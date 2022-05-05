import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from "victory-native"
import React, { useState, useEffect } from 'react';

export default function Chart(props) {





  const [data, setData] = useState()
  const [coin, setCoin] = useState(props) // Toimii tällä, mutta pitää saada toimaan propseista saadulla nimelle
  const [period, setPeriod] = useState(30) // Ongelmana on hakujen järjestys. Tässä haetaan ennenkuin on saatu propseilta tiedot.

  useEffect(
    () => {
      console.log('props:', props)
      getData()
      console.log('after data data')
    },
    [coin, period]
  )

  const getData = async () => {
    try {


      console.log('coin:', coin)

      const coinID = 'Qwsogvtv82FCd' // Tähän propseista saatu coin ID

      const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${coinID}/history`,
        params: { referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h' },
        headers: {
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.COIN_API
        }
      };

      axios.request(options).then(function (response) {
        //console.log("response.data.data: ", response.data.data.history);
        const rdata = response.data.data.history

        const list = rdata.map(d => {
          return {
            x: d.timestamp,
            y: d.price
          }
        })
        //  console.log('list', list)
        setData(list)
      }).catch(function (error) {
        console.error(error);
      });



      /* 
            const rurl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1`
            console.log('rurl:', rurl)
            const response = await axios.get(rurl)
            const formatData = response.data.prices.map(function (i) {
              return {
                x: i[0],
                y: i[1]
              }
      
            })
            console.log('formatdata', formatData)
             */
      /*
      { COINGECKO
        ehkä
      response: 
      
        "prices": [
          [
            1651658372443,
            38900.800987870425
          ],
          [
            1651658652808,
            38908.257318286865
          ],
          [
            1651658942199,
            38932.836185607564
          ],
          [
            1651659219592,
            38938.924680971766
          ]
      }
             */


      /* meiän apista, RAPIDAPI

      koita käyttää
  response.data.data

      response :
        "data": Object {
          "data": Object {
            "change": "1.57",
              "history": Array[
                Object {
              "price": "39484.78404765924",
                "timestamp": 1651744500,
              },
              Object {
                "price": "39493.27353932872",
                "timestamp": 1651744200,
              },
              Object {
                "price": "39498.1765098178",
                "timestamp": 1651743900,
              },
              Object {
                "price": "39486.17601429039",
                "timestamp": 1651743600,
              },
              ...
      
      */


      //setData(formatData)
      console.log('got data')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View>
      <VictoryChart>

        <VictoryAxis
          dependentAxis
          tickFormat={(y) => y}
          style={{
            axis: {
              stroke: '#0C2432'
            },
            tickLabels: {
              fill: 'white'
            },

          }}
        />

        <VictoryLine
          style={{
            data: {
              stroke: "#FFFFFF",
              strokeWidth: 1

            }
          }}
          width={450}
          height={200}
          data={data}
        />
      </VictoryChart>

      <View style={styles.timeWrapper}>
        <Text style={[styles.baseText, period === 1 ? styles.underline : null]} onPress={() => setPeriod(1)}>
          1 Day
        </Text>
        <Text style={[styles.baseText, period === 7 ? styles.underline : null]} onPress={() => setPeriod(7)}>
          1 Week
        </Text>
        <Text style={[styles.baseText, period === 30 ? styles.underline : null]} onPress={() => setPeriod(30)}>
          1 Month
        </Text>
        <Text style={[styles.baseText, period === 365 ? styles.underline : null]} onPress={() => setPeriod(365)}>
          1 Year
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  timeWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",

  },
  baseText: {
    color: "#FFFFFF"
  },

  time: {
    margin: 2
  },
  header: {
    position: "absolute",
    top: 50,
    fontSize: 30,
    fontWeight: "bold"
  },
  underline: { textDecorationLine: "underline" }
})
