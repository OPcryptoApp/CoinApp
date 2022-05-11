import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';



export default function PortfolioScreen({ navigation }) {

  useEffect(async () => {

  }, [])



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