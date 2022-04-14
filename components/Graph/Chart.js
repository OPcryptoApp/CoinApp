import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { VictoryLine, VictoryChart, VictoryAxis } from "victory-native"
import React, { useState, useEffect } from 'react';

//TOISTAISEKSI NÄYTTÄÄ VAIN BITCOININ ARVOKÄYRÄN

export default function Chart() {
  
  const [data, setData] = useState()
  const [selectedCoin, setSelectedCoin] = useState('')
  const [period, setPeriod] = useState(30)

  useEffect(
		() => {
			getData()
		},
		[ selectedCoin, period ]
	)

  async function getData() {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=${period}`)
      const formatData = response.data.prices.map(function(i) {
        return {
          x: i[0],
          y: i[1]
        }
      })
      setData(formatData)
    } catch (error) {
      console.log(error)
    }
  }


  return(
    <View>
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

    <View style={styles.timeWrapper}>
				<Text style={[ styles.baseText, period === 1 ? styles.underline : null ]} onPress={() => setPeriod(1)}>
					1 Day
				</Text>
				<Text style={[ styles.baseText, period === 7 ? styles.underline : null ]} onPress={() => setPeriod(7)}>
					1 Week
				</Text>
				<Text style={[ styles.baseText, period === 30 ? styles.underline : null ]} onPress={() => setPeriod(30)}>
					1 Month
				</Text>
				<Text style={[ styles.baseText, period === 365 ? styles.underline : null ]} onPress={() => setPeriod(365)}>
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