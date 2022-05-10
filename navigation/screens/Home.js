import * as React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import PortfolioWindow from "../../components/Portfolio/PortfolioWindow";
import Coin from "../../components/Home/coin";

export default function HomeScreen({ navigation }) {

  const [focus, setFocus] = React.useState(false)
  const unsubscribe = navigation.addListener('tabPress', (e) => {
    setFocus(!focus) // focus vaihdos, että Coin-komponentti saa tiedon ladata kolikkolistan uudestaan
  })

  return (
    <View style={{ flex: 1, paddingTop: 50, backgroundColor: "#0C2432" }}>
      <View>
        <PortfolioWindow />
      </View>

      <View>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 25,
            marginLeft: 15,
          }}
        >
          {" "}
          Coins{" "}
        </Text>
      </View>

      <Coin focus={focus} />
    </View>
  );
}
