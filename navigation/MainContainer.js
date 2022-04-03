import * as React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import screens 
import HomeScreen from './screens/Home';
import PortfolioScreen from './screens/Portfolio';
import MarketScreen from './screens/Market'
import ProfileScreen from './screens/Profile';
import LoginScreen from './screens/Login';
import ProfileSettingsScreen from './screens/EditProfile';

//screen names

const homeName = 'Home';
const portfolioName = 'Portfolio';
const marketName = 'Market';
const profileName = 'Profile';
const loginName = 'Login';
const editProfileName = 'Settings';
const profileSettings = 'Settings';

const Tab = createBottomTabNavigator();



const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: (props) => null,
        }}
        name="profileSettings"
        component={ProfileSettingsScreen} />
      {/* <SettingsStack.Screen name="Details" component={DetailsScreen} /> */}
    </SettingsStack.Navigator>
  );
}

export default function MainContainer() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={loginName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {

              iconName = focused ? 'home' : 'home-outline'
            } else if (rn == portfolioName) {

              iconName = focused ? 'bar-chart' : 'bar-chart-outline'
            } else if (rn == marketName) {

              iconName = focused ? 'logo-bitcoin' : 'cash-outline'
            } else if (rn == profileName) {

              iconName = focused ? 'person-circle-outline' : 'person-circle-outline'
            } else if (rn == editProfileName) {

              iconName = focused ? 'settings-outline' : 'settings-outline'
            }

            return <Ionicons name={iconName} size={30} />
          },
        })}>
        <Tab.Screen
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: (props) => null,
          }}
          name={loginName}
          component={LoginScreen} />
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={portfolioName} component={PortfolioScreen} />
        <Tab.Screen name={marketName} component={MarketScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
        <Tab.Screen
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: (props) => null,
          }}
          name='stackSettings' component={SettingsStackScreen} />

        {/* 
        <Tab.Screen
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: (props) => null,
          }}
          name={editProfileName} component={EditProfileScreen} />
 */}

      </Tab.Navigator>
    </NavigationContainer>
  )
}
