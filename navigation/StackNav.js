import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainContainer from "./MainContainer";



import CoinPageScreen from './screens/CoinPage';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={MainContainer}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="CoinPageScreen"
        component={CoinPageScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;