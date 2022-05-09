import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,

    marginBottom: 5,
  },

  item: {
    backgroundColor: "#1f3947",
    justifyContent: "space-between",
    marginVertical: 2,
    marginHorizontal: 16,
    borderRadius: 5,
    padding: 8,
  },
  image: {
    marginRight: 10,
    alignSelf: "center",
    //justifyContent:'center',
  },
  name: {
    color: "white",
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  sub: {
    color: "gray",
    fontSize: 10,
    fontWeight: "bold",
  },
  rank: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  changeNeg: {
    color: "#c71400",
    textAlign: "right",
    fontWeight: "bold",
  },

  changePosit: {
    color: "#10C22C",
    textAlign: "right",
    fontWeight: "bold",
  },

  price: {
    fontWeight: "bold",
    color: "white",
  },

  left: {
    marginLeft: "auto",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  placeholder: {
    marginLeft: 20,
    color: "white",
  },
});
