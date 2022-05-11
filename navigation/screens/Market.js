import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Market from "../../components/Market";

export default function MarketScreen({ navigation }) {

  const [focus, setFocus] = React.useState(false)
  const unsubscribe = navigation.addListener('focus', (e) => {
    setFocus(!focus) // focus vaihdos, että Coin-komponentti saa tiedon ladata kolikkolistan uudestaan
  })

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>All coins</Text>
      </View>
      <Market focus={focus} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: "#0C2432",
    paddingTop: 40,
  },
  item: {
    backgroundColor: "gray",
    justifyContent: "space-between",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    justifyContent: "flex-start",
  },
  rank: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  change: {
    color: "#10C22C",
    textAlign: "right",
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 5,
  },
});
