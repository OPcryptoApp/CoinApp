import * as React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import Coin from "../../components/Home/coin";


export default function HomeScreen({ navigation }) {

  const [focus, setFocus] = React.useState(false)
  const unsubscribe = navigation.addListener('focus', (e) => {
    setFocus(!focus) // focus vaihdos, että Coin-komponentti saa tiedon ladata kolikkolistan uudestaan
  })

  return (
    <View style={{ flex: 1, paddingTop: 50, backgroundColor: "#0C2432" }}>
      <View>
        <Text style={{
          alignSelf: "center",
          fontSize: 24,
          paddingBottom: 30,
          fontWeight: 'bold',
          color: 'white',
          paddingTop: 20
        }}>KryptoApp</Text>
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
          Favorite coins{" "}
        </Text>
      </View>

      <Coin focus={focus} />
    </View>
  );
}
