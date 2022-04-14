import * as React from 'react';
import { View, Text, Button } from 'react-native';
import PortfolioWindow from '../../components/Portfolio/PortfolioWindow';
import Coin from '../../components/Home/coin';
import PortfolioChart from '../../components/Graph/PortfolioChart';

export default function HomeScreen({ navigation }) {



  return (
    <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#0C2432' }}>
      <View>
        <PortfolioWindow />

      </View>
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 55, marginLeft: 15 }}> Coins </Text>

      </View>
      <Coin />
    </View>
  );
}


