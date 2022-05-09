import * as React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import PortfolioWindow from "../../components/Portfolio/PortfolioWindow";
import Coin from "../../components/Home/coin";

export default function HomeScreen({ navigation }) {
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
      <ScrollView
        style={{
          maxHeight: 300,
          backgroundColor: "blue",
          width: "95%",
          alignSelf: "center",
          borderRadius: 10,
          flex: 1,
          backgroundColor: "#223845",
        }}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <Coin />
      </ScrollView>
    </View>
  );
}
