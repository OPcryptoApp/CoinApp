import * as React from 'react';
import { View, Text } from 'react-native';

export default function PortfolioWindow(props) {
  const { pfCoins } = props
  console.log('pfCoins', pfCoins)

  return (
    <View style={{ alignItems: 'center', paddingBottom: 50 }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>PORTFOLIO</Text>
      {props.pfCoins !== undefined &&
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40, padding: 10 }}>${props.pfCoins.dollars}</Text>
      }
      <Text style={{ color: 'red' }}>17.63%</Text>
    </View>
  )
}