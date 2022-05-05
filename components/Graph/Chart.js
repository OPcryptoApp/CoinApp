import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from "victory-native"
import React, { useState, useEffect } from 'react';

export default function Chart(props) {

  const [data, setData] = useState()
  const [coin, setCoin] = useState(props.uuid) // Toimii tällä, mutta pitää saada toimaan propseista saadulla nimelle
  const [period, setPeriod] = useState('24h') // Ongelmana on hakujen järjestys. Tässä haetaan ennenkuin on saatu propseilta tiedot.

  useEffect(() => {
    console.log('props:', props)
    getData()
    console.log('after data data')
  }, [coin, period])

  const getData = async () => {
    try {
      //console.log('coin:', coin)
      const coinID = 'Qwsogvtv82FCd' // Tähän propseista saatu coin ID

      const options = {
        method: 'GET',
        url: `https://coinranking1.p.rapidapi.com/coin/${coinID}/history`,
        params: { referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: period },
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
            x: Math.round(d.timestamp),
            y: Math.round(d.price)
          }
        })
        console.log('list', list.length)
        setData(list)
      }).catch(function (error) {
        console.error(error);
      });


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
          tickFormat={(y) => `${y}`}
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
          height={180}
          data={data}
        />
      </VictoryChart>

      <View style={styles.timeWrapper}>
        <Text style={[styles.baseText, period === 1 ? styles.underline : null]} onPress={() => setPeriod('24h')}>
          1 Day
        </Text>
        <Text style={[styles.baseText, period === 7 ? styles.underline : null]} onPress={() => setPeriod('7d')}>
          1 Week
        </Text>
        <Text style={[styles.baseText, period === 30 ? styles.underline : null]} onPress={() => setPeriod('30d')}>
          1 Month
        </Text>
        <Text style={[styles.baseText, period === 365 ? styles.underline : null]} onPress={() => setPeriod('1y')}>
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
